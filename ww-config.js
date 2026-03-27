export default {
    editor: {
        label: { en: 'CRM Navigation Menu', pl: 'Menu nawigacyjne CRM' },
        icon: 'layout',
        customStylePropertiesOrder: [
            ['theme'],
            ['supabaseUrl', 'supabaseAnonKey'],
            ['isSidebarCollapsed', 'isMobileMenuOpen'],
            ['activeNavUrl'],
            ['sidebarWidth', 'sidebarCollapsedWidth', 'topbarHeight'],
            ['animationDuration', 'animationTimingFunction'],
            ['sidebarTitle'],
            ['showUserBlock', 'logoutLabel'],
            ['nav1Label', 'nav1Icon', 'nav1Url'],
            ['nav2Label', 'nav2Icon', 'nav2Url'],
            ['nav3Label', 'nav3Icon', 'nav3Url'],
            ['nav4Label', 'nav4Icon', 'nav4Url'],
            ['nav5Label', 'nav5Icon', 'nav5Url'],
            ['nav6Label', 'nav6Icon', 'nav6Url'],
            ['nav7Label', 'nav7Icon', 'nav7Url'],
            ['nav8Label', 'nav8Icon', 'nav8Url'],
        ]
    },
    triggerEvents: [
        { name: 'overlayClick', label: { en: 'On overlay click (close mobile menu)' }, event: {} },
        { name: 'themeChange', label: { en: 'On theme change' }, event: { theme: '' } },
        { name: 'logout', label: { en: 'On logout click' }, event: {} },
        { name: 'navClick', label: { en: 'On nav item click' }, event: { url: '', label: '', index: 0 } },
        { name: 'collapseToggle', label: { en: 'On sidebar collapse toggle' }, event: { collapsed: false } },
    ],
    properties: {
        // Dropzones — only keep what's needed
        menuToggleZone: { type: 'Array', hidden: true, defaultValue: [] },
        sidebarZone: { type: 'Array', hidden: true, defaultValue: [] },

        // Theme
        theme: {
            label: { en: 'Theme', pl: 'Motyw' },
            type: 'TextSelect',
            options: { options: [
                { value: 'dark', label: { en: 'Dark' } },
                { value: 'light', label: { en: 'Light' } },
            ]},
            defaultValue: 'dark', bindable: true, responsive: true,
        },

        // Supabase
        supabaseUrl: { label: { en: 'Supabase URL' }, type: 'Text', defaultValue: '', bindable: true, section: 'settings' },
        supabaseAnonKey: { label: { en: 'Supabase Anon Key' }, type: 'Text', defaultValue: '', bindable: true, section: 'settings' },

        // State
        isSidebarCollapsed: { label: { en: 'Sidebar collapsed (PC)' }, type: 'OnOff', defaultValue: false, bindable: true },
        isMobileMenuOpen: { label: { en: 'Mobile menu open' }, type: 'OnOff', defaultValue: false, bindable: true },
        activeNavUrl: { label: { en: 'Active page URL' }, type: 'Text', defaultValue: '', bindable: true },

        // Dimensions
        sidebarWidth: { label: { en: 'Sidebar width' }, type: 'Length', options: { unitChoices: [{ value: 'px', label: 'px', min: 180, max: 360 }] }, defaultValue: '260px', bindable: true, responsive: true },
        sidebarCollapsedWidth: { label: { en: 'Collapsed width' }, type: 'Length', options: { unitChoices: [{ value: 'px', label: 'px', min: 48, max: 120 }] }, defaultValue: '68px', bindable: true, responsive: true },
        topbarHeight: { label: { en: 'Mobile topbar height' }, type: 'Length', options: { unitChoices: [{ value: 'px', label: 'px', min: 0, max: 80 }] }, defaultValue: '52px', bindable: true, responsive: true },

        // Animation
        animationDuration: { label: { en: 'Animation speed' }, type: 'Length', options: { unitChoices: [{ value: 'ms', label: 'ms', min: 0, max: 1000 }] }, defaultValue: '250ms', bindable: true, responsive: true },
        animationTimingFunction: {
            label: { en: 'Animation ease' }, type: 'TextSelect',
            options: { options: [
                { value: 'cubic-bezier(0.16,1,0.3,1)', label: { en: 'Smooth' } },
                { value: 'ease', label: { en: 'Ease' } },
                { value: 'ease-in-out', label: { en: 'Ease In Out' } },
            ]},
            defaultValue: 'cubic-bezier(0.16,1,0.3,1)', bindable: true,
        },

        // Sidebar brand
        sidebarTitle: { label: { en: 'Sidebar title' }, type: 'Text', defaultValue: 'CRM Panel', bindable: true },

        // User block
        showUserBlock: { label: { en: 'Show user block' }, type: 'OnOff', defaultValue: true, bindable: true },
        logoutLabel: { label: { en: 'Logout text' }, type: 'Text', defaultValue: 'Wyloguj', bindable: true },

        // === NAV ITEMS (1-8) ===
        ..._navItemProps(1, 'Dashboard', 'dashboard', '/dashboard'),
        ..._navItemProps(2, 'Admin', 'settings', '/admin'),
        ..._navItemProps(3, 'Klienci', 'users', '/clients'),
        ..._navItemProps(4, '', 'folder', ''),
        ..._navItemProps(5, '', 'chart', ''),
        ..._navItemProps(6, '', 'mail', ''),
        ..._navItemProps(7, '', 'file', ''),
        ..._navItemProps(8, '', 'star', ''),
    }
};

function _navItemProps(n, defLabel, defIcon, defUrl) {
    const iconOptions = [
        { value: 'dashboard', label: { en: 'Dashboard' } },
        { value: 'home', label: { en: 'Home' } },
        { value: 'users', label: { en: 'Users' } },
        { value: 'settings', label: { en: 'Settings' } },
        { value: 'shield', label: { en: 'Shield' } },
        { value: 'folder', label: { en: 'Folder' } },
        { value: 'file', label: { en: 'File' } },
        { value: 'mail', label: { en: 'Mail' } },
        { value: 'calendar', label: { en: 'Calendar' } },
        { value: 'chart', label: { en: 'Chart' } },
        { value: 'database', label: { en: 'Database' } },
        { value: 'bell', label: { en: 'Bell' } },
        { value: 'search', label: { en: 'Search' } },
        { value: 'star', label: { en: 'Star' } },
        { value: 'list', label: { en: 'List' } },
        { value: 'globe', label: { en: 'Globe' } },
        { value: 'lock', label: { en: 'Lock' } },
        { value: 'clock', label: { en: 'Clock' } },
        { value: 'zap', label: { en: 'Zap' } },
        { value: 'none', label: { en: '— None —' } },
    ];
    return {
        [`nav${n}Label`]: { label: { en: `Nav ${n} — Label` }, type: 'Text', defaultValue: defLabel, bindable: true },
        [`nav${n}Icon`]: { label: { en: `Nav ${n} — Icon` }, type: 'TextSelect', options: { options: iconOptions }, defaultValue: defIcon, bindable: true },
        [`nav${n}Url`]: { label: { en: `Nav ${n} — URL` }, type: 'Text', defaultValue: defUrl, bindable: true },
    };
}
