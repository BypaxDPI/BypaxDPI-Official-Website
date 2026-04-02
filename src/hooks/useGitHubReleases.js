import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const useGitHubReleases = () => {
    const { setVersion, setOS } = useLanguage();
    const [downloadLinks, setDownloadLinks] = useState({
        winExe: 'https://github.com/BypaxDPI/BypaxDPI-Windows/releases/latest',
        winMsi: 'https://github.com/BypaxDPI/BypaxDPI-Windows/releases/latest',
        hero: 'https://github.com/BypaxDPI/BypaxDPI-Windows/releases/latest'
    });
    const [verInfo, setVerInfo] = useState({
        winExe: 'Windows 10/11 • EXE • 4.02 MB',
        winMsi: 'Windows 10/11 • MSI • 5.30 MB'
    });

    useEffect(() => {
        const fetchReleases = async () => {
             // Repositories
            const repoWin = 'BypaxDPI/BypaxDPI-Windows';
            
            // API URLs
            const apiWin = `https://api.github.com/repos/${repoWin}/releases/latest`;

            try {
                const resWin = await fetch(apiWin).catch(e => null);

                let winData = null;
                if (resWin && resWin.ok) winData = await resWin.json();

                let newLinks = { ...downloadLinks };
                let newVerInfo = { ...verInfo };

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
                if (winData) setVersion(winData.tag_name);
                
                if (winAssetExe) newLinks.hero = winAssetExe.browser_download_url;
                else if (winAssetMsi) newLinks.hero = winAssetMsi.browser_download_url;
                else newLinks.hero = `https://github.com/${repoWin}/releases/latest`;

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
