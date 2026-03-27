export default {
    editor: {
        label: { en: 'CRM Navigation Menu' },
        icon: 'layout',
        customStylePropertiesOrder: [
            ['theme'],
            ['supabaseUrl', 'supabaseAnonKey'],
            ['isSidebarCollapsed', 'isMobileMenuOpen'],
            ['sidebarWidth', 'sidebarCollapsedWidth', 'topbarHeight'],
            ['animationDuration'],
            ['sidebarTitle', 'sidebarTitleSize'],
            ['showUserBlock', 'logoutLabel'],
            ['nav1Label', 'nav1Icon', 'nav1Link'],
            ['nav2Label', 'nav2Icon', 'nav2Link'],
            ['nav3Label', 'nav3Icon', 'nav3Link'],
            ['nav4Label', 'nav4Icon', 'nav4Link'],
            ['nav5Label', 'nav5Icon', 'nav5Link'],
            ['nav6Label', 'nav6Icon', 'nav6Link'],
            ['nav7Label', 'nav7Icon', 'nav7Link'],
            ['nav8Label', 'nav8Icon', 'nav8Link'],
            ['navIconSize'],
        ]
    },
    triggerEvents: [
        { name: 'overlayClick', label: { en: 'On overlay click (close mobile menu)' }, event: {} },
        { name: 'themeChange', label: { en: 'On theme toggle' }, event: { theme: '' } },
        { name: 'logout', label: { en: 'On logout click' }, event: {} },
        { name: 'navClick', label: { en: 'On nav item click' }, event: { url: '', label: '', index: 0 } },
        { name: 'collapseToggle', label: { en: 'On sidebar collapse/expand' }, event: { collapsed: false } },
    ],
    properties: {
        menuToggleZone: { type: 'Array', hidden: true, defaultValue: [] },
        sidebarZone: { type: 'Array', hidden: true, defaultValue: [] },

        // Theme
        theme: { label: { en: 'Theme' }, type: 'TextSelect', options: { options: [{ value: 'dark', label: { en: 'Dark' } }, { value: 'light', label: { en: 'Light' } }] }, defaultValue: 'dark', bindable: true, responsive: true },

        // Connection
        supabaseUrl: { label: { en: 'Supabase URL' }, type: 'Text', defaultValue: '', bindable: true, section: 'settings' },
        supabaseAnonKey: { label: { en: 'Supabase Anon Key' }, type: 'Text', defaultValue: '', bindable: true, section: 'settings' },

        // State
        isSidebarCollapsed: { label: { en: 'Sidebar collapsed (PC)' }, type: 'OnOff', defaultValue: false, bindable: true },
        isMobileMenuOpen: { label: { en: 'Mobile menu open' }, type: 'OnOff', defaultValue: false, bindable: true },

        // Dimensions
        sidebarWidth: { label: { en: 'Sidebar width' }, type: 'Length', options: { unitChoices: [{ value: 'px', label: 'px', min: 180, max: 320 }] }, defaultValue: '240px', bindable: true, responsive: true },
        sidebarCollapsedWidth: { label: { en: 'Collapsed width' }, type: 'Length', options: { unitChoices: [{ value: 'px', label: 'px', min: 48, max: 100 }] }, defaultValue: '64px', bindable: true, responsive: true },
        topbarHeight: { label: { en: 'Mobile topbar height' }, type: 'Length', options: { unitChoices: [{ value: 'px', label: 'px', min: 40, max: 80 }] }, defaultValue: '52px', bindable: true, responsive: true },
        animationDuration: { label: { en: 'Animation speed' }, type: 'Length', options: { unitChoices: [{ value: 'ms', label: 'ms', min: 0, max: 800 }] }, defaultValue: '200ms', bindable: true },

        // Sidebar brand
        sidebarTitle: { label: { en: 'Sidebar title' }, type: 'Text', defaultValue: 'CRM Panel', bindable: true },
        sidebarTitleSize: { label: { en: 'Title font size' }, type: 'Length', options: { unitChoices: [{ value: 'px', label: 'px', min: 10, max: 32 }] }, defaultValue: '16px', bindable: true, responsive: true },

        // User block
        showUserBlock: { label: { en: 'Show user block' }, type: 'OnOff', defaultValue: true, bindable: true },
        logoutLabel: { label: { en: 'Logout text' }, type: 'Text', defaultValue: 'Wyloguj', bindable: true },

        // Nav icon size
        navIconSize: { label: { en: 'Nav icon size' }, type: 'Length', options: { unitChoices: [{ value: 'px', label: 'px', min: 10, max: 32 }] }, defaultValue: '18px', bindable: true, responsive: true },

        // === NAV ITEMS 1-8: Label + SystemIcon + Link ===
        nav1Label: { label: { en: 'Nav 1 — Label' }, type: 'Text', defaultValue: 'Dashboard', bindable: true },
        nav1Icon: { label: { en: 'Nav 1 — Icon' }, type: 'SystemIcon', bindable: true },
        nav1Link: { label: { en: 'Nav 1 — Link' }, type: 'Link', bindable: true },

        nav2Label: { label: { en: 'Nav 2 — Label' }, type: 'Text', defaultValue: 'Panel admina', bindable: true },
        nav2Icon: { label: { en: 'Nav 2 — Icon' }, type: 'SystemIcon', bindable: true },
        nav2Link: { label: { en: 'Nav 2 — Link' }, type: 'Link', bindable: true },

        nav3Label: { label: { en: 'Nav 3 — Label' }, type: 'Text', defaultValue: 'Klienci', bindable: true },
        nav3Icon: { label: { en: 'Nav 3 — Icon' }, type: 'SystemIcon', bindable: true },
        nav3Link: { label: { en: 'Nav 3 — Link' }, type: 'Link', bindable: true },

        nav4Label: { label: { en: 'Nav 4 — Label' }, type: 'Text', defaultValue: '', bindable: true },
        nav4Icon: { label: { en: 'Nav 4 — Icon' }, type: 'SystemIcon', bindable: true },
        nav4Link: { label: { en: 'Nav 4 — Link' }, type: 'Link', bindable: true },

        nav5Label: { label: { en: 'Nav 5 — Label' }, type: 'Text', defaultValue: '', bindable: true },
        nav5Icon: { label: { en: 'Nav 5 — Icon' }, type: 'SystemIcon', bindable: true },
        nav5Link: { label: { en: 'Nav 5 — Link' }, type: 'Link', bindable: true },

        nav6Label: { label: { en: 'Nav 6 — Label' }, type: 'Text', defaultValue: '', bindable: true },
        nav6Icon: { label: { en: 'Nav 6 — Icon' }, type: 'SystemIcon', bindable: true },
        nav6Link: { label: { en: 'Nav 6 — Link' }, type: 'Link', bindable: true },

        nav7Label: { label: { en: 'Nav 7 — Label' }, type: 'Text', defaultValue: '', bindable: true },
        nav7Icon: { label: { en: 'Nav 7 — Icon' }, type: 'SystemIcon', bindable: true },
        nav7Link: { label: { en: 'Nav 7 — Link' }, type: 'Link', bindable: true },

        nav8Label: { label: { en: 'Nav 8 — Label' }, type: 'Text', defaultValue: '', bindable: true },
        nav8Icon: { label: { en: 'Nav 8 — Icon' }, type: 'SystemIcon', bindable: true },
        nav8Link: { label: { en: 'Nav 8 — Link' }, type: 'Link', bindable: true },
    }
};
