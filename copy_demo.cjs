const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(file => {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        if (fs.lstatSync(srcPath).isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            if (['.js', '.jsx', '.css'].includes(path.extname(srcPath))) {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    });
}

const mockStubs = `
const invoke = async (cmd, args) => {
    if (cmd === 'get_local_ip') return '192.168.1.11';
    if (cmd === 'get_pac_port') return 8787;
    if (cmd === 'get_driver_status') return true;
    if (cmd === 'check_npcap_driver') return true;
    if (cmd === 'get_autostart_status') return false;
    return null;
};
const listen = async () => { return () => {}; };
const getVersion = async () => 'v1.0.0';
const open = async (url) => window.open(url, '_blank');
const emit = async () => {};
`;

function processFiles(dir) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            processFiles(filePath);
        } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx')) {
            let code = fs.readFileSync(filePath, 'utf8');
            let modified = false;

            if (code.includes('@tauri-apps/')) {
                modified = true;
                code = code.replace(/import\s*\{[^}]*\}\s*from\s*['"]@tauri-apps\/[^'"]+['"];?/g, '');
                
                // insert mock block at top
                code = mockStubs + '\n' + code;
            }

            if (code.includes('lucide-react')) {
                modified = true;
                code = code.replace(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"];?/g, (match, p1) => {
                    const icons = p1.split(',').map(i => i.trim());
                    const fiMap = {
                        'Shield': 'FiShield', 'Power': 'FiPower', 'Settings': 'FiSettings', 'FileText': 'FiFileText',
                        'X': 'FiX', 'AlertTriangle': 'FiAlertTriangle', 'Smartphone': 'FiSmartphone', 'Globe': 'FiGlobe',
                        'ZoomIn': 'FiZoomIn', 'Check': 'FiCheck', 'Copy': 'FiCopy', 'WifiOff': 'FiWifiOff',
                        'Trash2': 'FiTrash2', 'HelpCircle': 'FiHelpCircle', 'Info': 'FiInfo', 'ChevronLeft': 'FiChevronLeft',
                        'RefreshCw': 'FiRefreshCw', 'Download': 'FiDownload', 'ChevronRight': 'FiChevronRight',
                        'Server': 'FiServer', 'Layers': 'FiLayers'
                    };
                    const imports = icons.map(icon => {
                        let originalBase = icon.split(' as ')[0].trim();
                        let alias = icon.includes(' as ') ? icon.split(' as ')[1].trim() : originalBase;
                        let fi = fiMap[originalBase] || 'FiStar';
                        return fi + ' as ' + alias;
                    });
                    return 'import { ' + imports.join(', ') + ' } from \'react-icons/fi\';';
                });
            }

            if (code.includes('document.body.setAttribute')) {
                modified = true;
                code = code.replace(/document\.body\.setAttribute/g, "document.getElementById('bypax-inner')?.setAttribute");
            }

            if (modified) {
                fs.writeFileSync(filePath, code);
            }
        }
    });
}

const demoDir = 'src/components/demo-app';
if (fs.existsSync(demoDir)) fs.rmSync(demoDir, { recursive: true, force: true });
copyDir('BypaxDPI/src', demoDir);
processFiles(demoDir);
console.log('Done!');
