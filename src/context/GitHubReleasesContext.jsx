import React, { createContext, useState, useEffect, useContext } from 'react';

const GitHubReleasesContext = createContext();

// Trusted domain validation for download URLs
const TRUSTED_DOWNLOAD_DOMAIN = 'github.com/BypaxDPI/';

const isValidDownloadUrl = (url) => {
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'https:' && parsed.href.includes(TRUSTED_DOWNLOAD_DOMAIN);
    } catch {
        return false;
    }
};

const REPO_WIN = 'BypaxDPI/BypaxDPI-Windows';
const FALLBACK_URL = `https://github.com/${REPO_WIN}/releases/latest`;

// Cache key & duration (5 minutes)
const CACHE_KEY = 'bypaxdpi-releases-cache';
const CACHE_DURATION = 5 * 60 * 1000;

const getCachedData = () => {
    try {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (!cached) return null;
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp > CACHE_DURATION) {
            sessionStorage.removeItem(CACHE_KEY);
            return null;
        }
        return data;
    } catch {
        return null;
    }
};

const setCachedData = (data) => {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    } catch {
        // sessionStorage full or unavailable, silently fail
    }
};

export const GitHubReleasesProvider = ({ children }) => {
    const [downloadLinks, setDownloadLinks] = useState({
        winExe: FALLBACK_URL,
        winMsi: FALLBACK_URL,
        hero: FALLBACK_URL
    });
    const [verInfo, setVerInfo] = useState({
        winExe: 'Windows 10/11 • EXE • 4.02 MB',
        winMsi: 'Windows 10/11 • MSI • 5.30 MB'
    });
    const [version, setVersion] = useState('v1.0.0');
    const [totalDownloads, setTotalDownloads] = useState(0);
    const [stars, setStars] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReleases = async () => {
            // Check cache first
            const cached = getCachedData();
            if (cached) {
                setDownloadLinks(cached.downloadLinks);
                setVerInfo(cached.verInfo);
                setVersion(cached.version);
                setTotalDownloads(cached.totalDownloads);
                setStars(cached.stars);
                setLoading(false);
                return;
            }

            try {
                // Fetch latest release AND all releases for total download count
                const [latestRes, allReleasesRes, repoRes] = await Promise.all([
                    fetch(`https://api.github.com/repos/${REPO_WIN}/releases/latest`).catch(() => null),
                    fetch(`https://api.github.com/repos/${REPO_WIN}/releases?per_page=100`).catch(() => null),
                    fetch(`https://api.github.com/repos/${REPO_WIN}`).catch(() => null)
                ]);

                let newLinks = { ...downloadLinks };
                let newVerInfo = { ...verInfo };
                let newVersion = version;
                let newTotalDownloads = 0;
                let newStars = 0;

                // Process latest release
                if (latestRes && latestRes.ok) {
                    const winData = await latestRes.json();

                    const winAssetExe = winData.assets?.find(a => a.name.endsWith('.exe'));
                    const winAssetMsi = winData.assets?.find(a => a.name.endsWith('.msi'));

                    if (winAssetExe && isValidDownloadUrl(winAssetExe.browser_download_url)) {
                        newLinks.winExe = winAssetExe.browser_download_url;
                        newVerInfo.winExe = `Windows 10/11 • EXE • ${(winAssetExe.size / 1048576).toFixed(2)} MB`;
                    }
                    if (winAssetMsi && isValidDownloadUrl(winAssetMsi.browser_download_url)) {
                        newLinks.winMsi = winAssetMsi.browser_download_url;
                        newVerInfo.winMsi = `Windows 10/11 • MSI • ${(winAssetMsi.size / 1048576).toFixed(2)} MB`;
                    }

                    // Hero button
                    if (winAssetExe && isValidDownloadUrl(winAssetExe.browser_download_url)) {
                        newLinks.hero = winAssetExe.browser_download_url;
                    } else if (winAssetMsi && isValidDownloadUrl(winAssetMsi.browser_download_url)) {
                        newLinks.hero = winAssetMsi.browser_download_url;
                    } else {
                        newLinks.hero = FALLBACK_URL;
                    }

                    if (winData.tag_name) {
                        newVersion = winData.tag_name;
                    }
                }

                // Calculate total downloads across ALL releases
                if (allReleasesRes && allReleasesRes.ok) {
                    const allReleases = await allReleasesRes.json();
                    newTotalDownloads = allReleases.reduce((total, release) => {
                        return total + (release.assets || []).reduce((sum, asset) => sum + (asset.download_count || 0), 0);
                    }, 0);
                }

                // Get stars count
                if (repoRes && repoRes.ok) {
                    const repoData = await repoRes.json();
                    newStars = repoData.stargazers_count || 0;
                }

                setDownloadLinks(newLinks);
                setVerInfo(newVerInfo);
                setVersion(newVersion);
                setTotalDownloads(newTotalDownloads);
                setStars(newStars);

                // Cache the results
                setCachedData({
                    downloadLinks: newLinks,
                    verInfo: newVerInfo,
                    version: newVersion,
                    totalDownloads: newTotalDownloads,
                    stars: newStars
                });

            } catch (err) {
                if (import.meta.env.DEV) {
                    console.warn('[BypaxDPI] GitHub API fetch failed:', err.message);
                }
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReleases();
    }, []);

    return (
        <GitHubReleasesContext.Provider value={{
            downloadLinks,
            verInfo,
            version,
            totalDownloads,
            stars,
            loading,
            error
        }}>
            {children}
        </GitHubReleasesContext.Provider>
    );
};

export const useGitHubData = () => {
    const context = useContext(GitHubReleasesContext);
    if (!context) {
        throw new Error('useGitHubData must be used within a GitHubReleasesProvider');
    }
    return context;
};
