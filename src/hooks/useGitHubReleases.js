import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const useGitHubReleases = () => {
    const { setVersion, setOS } = useLanguage();
    const [downloadLinks, setDownloadLinks] = useState({
        mac: 'https://github.com/BypaxDPI/BypaxDPI-MacOS/releases/latest',
        winExe: 'https://github.com/BypaxDPI/BypaxDPI-Windows/releases/latest',
        winMsi: 'https://github.com/BypaxDPI/BypaxDPI-Windows/releases/latest',
        hero: 'https://github.com/BypaxDPI/BypaxDPI-Windows/releases/latest' // Default to windows repo
    });
    const [verInfo, setVerInfo] = useState({
        mac: 'macOS 13.0+ • DMG',
        winExe: 'Windows 10/11 • EXE • 4.02 MB',
        winMsi: 'Windows 10/11 • MSI • 5.30 MB'
    });

    useEffect(() => {
        const fetchReleases = async () => {
             // Repositories
            const repoMac = 'BypaxDPI/BypaxDPI-MacOS';
            const repoWin = 'BypaxDPI/BypaxDPI-Windows';
            
            // API URLs
            const apiMac = `https://api.github.com/repos/${repoMac}/releases/latest`;
            const apiWin = `https://api.github.com/repos/${repoWin}/releases/latest`;

            try {
                // Fetch both releases in parallel
                const [resMac, resWin] = await Promise.all([
                    fetch(apiMac).catch(e => null),
                    fetch(apiWin).catch(e => null)
                ]);

                let macData = null;
                let winData = null;

                if (resMac && resMac.ok) macData = await resMac.json();
                if (resWin && resWin.ok) winData = await resWin.json();

                let newLinks = { ...downloadLinks };
                let newVerInfo = { ...verInfo };

                // 1. Process macOS Assets
                let macAsset = null;
                if (macData) {
                    setVersion(macData.tag_name);
                    macAsset = macData.assets.find(a => a.name.endsWith('.dmg')) ||
                               macData.assets.find(a => a.name.endsWith('.zip'));
                    
                    if (macAsset) {
                        newLinks.mac = macAsset.browser_download_url;
                        const ext = macAsset.name.split('.').pop().toUpperCase();
                        newVerInfo.mac = `macOS 13.0+ • ${ext} • ${(macAsset.size / 1048576).toFixed(2)} MB`;
                    }
                }

                // 2. Process Windows Assets
                let winAssetExe = null;
                let winAssetMsi = null;
                
                if (winData) {
                    winAssetExe = winData.assets.find(a => a.name.endsWith('.exe'));
                    winAssetMsi = winData.assets.find(a => a.name.endsWith('.msi'));

                    if (winAssetExe) {
                        newLinks.winExe = winAssetExe.browser_download_url;
                        newVerInfo.winExe = `Windows 10/11 • EXE • ${(winAssetExe.size / 1048576).toFixed(2)} MB`;
                    }
                    if (winAssetMsi) {
                        newLinks.winMsi = winAssetMsi.browser_download_url;
                        newVerInfo.winMsi = `Windows 10/11 • MSI • ${(winAssetMsi.size / 1048576).toFixed(2)} MB`;
                    }
                }

                // 3. Update Hero Button (Smart Button)
                const platform = navigator.platform.toLowerCase();
                const userAgent = navigator.userAgent.toLowerCase();
                const isMac = platform.includes('mac') || userAgent.includes('macintosh');
                
                const targetOS = isMac ? 'macOS' : 'Windows';
                // setOS is handled in LanguageContext but we can ensure consistency here if needed
                // actually setOS in context relies on detection there. 

                if (targetOS === 'Windows') {
                    if (winAssetExe) newLinks.hero = winAssetExe.browser_download_url;
                    else if (winAssetMsi) newLinks.hero = winAssetMsi.browser_download_url;
                    else newLinks.hero = `https://github.com/${repoWin}/releases/latest`;
                } else {
                     if (macAsset) newLinks.hero = macAsset.browser_download_url;
                     else newLinks.hero = `https://github.com/${repoMac}/releases/latest`;
                }

                setDownloadLinks(newLinks);
                setVerInfo(newVerInfo);

            } catch (error) {
                console.error('Error fetching latest releases:', error);
            }
        };

        fetchReleases();
    }, []);

    return { downloadLinks, verInfo };
};

export default useGitHubReleases;
