import { useGitHubData } from '../context/GitHubReleasesContext';

/**
 * Legacy compatibility hook — delegates to the centralized GitHubReleasesContext.
 * All components using this hook now share a single API call instead of each
 * making their own.
 */
const useGitHubReleases = () => {
    const { downloadLinks, verInfo } = useGitHubData();
    return { downloadLinks, verInfo };
};

export default useGitHubReleases;
