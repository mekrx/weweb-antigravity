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
            ['navIconSize'],
        ]
    },
    triggerEvents: [
        { name: 'overlayClick', label: { en: 'On overlay click (close mobile menu)' }, event: {} },
        { name: 'themeChange', label: { en: 'On theme toggle' }, event: { theme: '' } },
        { name: 'logout', label: { en: 'On logout click' }, event: {} },
        { name: 'navClick', label: { en: 'On nav item click' }, event: { url: '', label: '', sectionKey: '' } },
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

        // === NAV SECTIONS (Array with Add/Remove) ===
        navSections: {
            label: { en: 'Navigation sections' },
            type: 'Array',
            bindable: true,
            options: {
                movable: true,
                expandable: true,
                getItemLabel(item, index) {
                    return item.sectionLabel || `Section ${index + 1}`;
                },
                item: {
                    type: 'Object',
                    defaultValue: { sectionLabel: '', items: [] },
                    options: {
                        item: {
                            sectionLabel: {
                                label: { en: 'Section label' },
                                type: 'Text',
                            },
                            items: {
                                label: { en: 'Items' },
                                type: 'Array',
                                options: {
                                    movable: true,
                                    expandable: true,
                                    getItemLabel(item, index) {
                                        return item.label || `Item ${index + 1}`;
                                    },
                                    item: {
                                        type: 'Object',
                                        defaultValue: { label: '', icon: null, link: null, children: [] },
                                        options: {
                                            item: {
                                                label: {
                                                    label: { en: 'Label' },
                                                    type: 'Text',
                                                },
                                                icon: {
                                                    label: { en: 'Icon' },
                                                    type: 'SystemIcon',
                                                },
                                                link: {
                                                    label: { en: 'Link' },
                                                    type: 'Link',
                                                },
                                                children: {
                                                    label: { en: 'Sub-items' },
                                                    type: 'Array',
                                                    options: {
                                                        movable: true,
                                                        expandable: true,
                                                        getItemLabel(item, index) {
                                                            return item.label || `Sub ${index + 1}`;
                                                        },
                                                        item: {
                                                            type: 'Object',
                                                            defaultValue: { label: '', link: null },
                                                            options: {
                                                                item: {
                                                                    label: {
                                                                        label: { en: 'Label' },
                                                                        type: 'Text',
                                                                    },
                                                                    link: {
                                                                        label: { en: 'Link' },
                                                                        type: 'Link',
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                    defaultValue: [],
                                                },
                                            },
                                        },
                                    },
                                },
                                defaultValue: [],
                            },
                        },
                    },
                },
            },
            defaultValue: [
                {
                    sectionLabel: '',
                    items: [
                        { label: 'Dashboard', icon: null, link: null, children: [] },
                    ],
                },
                {
                    sectionLabel: 'Administracja',
                    items: [
                        {
                            label: 'Panel admina', icon: null, link: null,
                            children: [
                                { label: 'Dashboard', link: null },
                                { label: 'Użytkownicy', link: null },
                                { label: 'Role', link: null },
                                { label: 'Audyt', link: null },
                            ],
                        },
                    ],
                },
                {
                    sectionLabel: 'CRM',
                    items: [
                        { label: 'Klienci', icon: null, link: null, children: [] },
                    ],
                },
            ],
            section: 'settings',
        },
    }
};
