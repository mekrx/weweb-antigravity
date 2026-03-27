export default {
    editor: {
        label: {
            en: 'CRM Navigation Menu',
            pl: 'Menu nawigacyjne CRM'
        },
        icon: 'layout',
        customStylePropertiesOrder: [
            // --- THEME ---
            ['theme'],

            // --- CONNECTION ---
            ['supabaseUrl', 'supabaseAnonKey'],

            // --- STATE ---
            ['isSidebarCollapsed', 'isMobileMenuOpen'],

            // --- LAYOUT DIMENSIONS ---
            ['sidebarWidth', 'sidebarCollapsedWidth', 'topbarHeight'],

            // --- ANIMATION ---
            ['animationDuration', 'animationTimingFunction'],

            // --- COLORS: SURFACES ---
            ['sidebarBgColor', 'topbarBgColor', 'overlayColor', 'accentColor'],

            // --- COLORS: BORDERS & EFFECTS ---
            ['sidebarBorderColor', 'topbarBorderColor', 'topbarBlur', 'topbarShadow', 'scrollbarColor'],

            // --- NAV STYLING ---
            ['navIconSize', 'navIconColor', 'navActiveColor', 'navActiveBg', 'navHoverBg'],

            // --- USER BLOCK ---
            ['showUserBlock', 'logoutLabel', 'logoutIcon'],
        ]
    },
    triggerEvents: [
        {
            name: 'overlayClick',
            label: { en: 'On Mobile Overlay Click', pl: 'Kliknięcie na overlay (zamknięcie menu)' },
            event: {}
        },
        {
            name: 'themeChange',
            label: { en: 'On Theme Change', pl: 'Zmiana motywu' },
            event: { theme: '' },
        },
        {
            name: 'logout',
            label: { en: 'On Logout Click', pl: 'Kliknięcie wylogowania' },
            event: {},
        },
        {
            name: 'navClick',
            label: { en: 'On Nav Item Click', pl: 'Kliknięcie elementu nawigacji' },
            event: { url: '', label: '', index: 0 },
        },
    ],
    properties: {
        // === DROPZONES ===
        menuToggleZone: { type: 'Array', hidden: true, defaultValue: [] },
        topbarZone: { type: 'Array', hidden: true, defaultValue: [] },
        sidebarZone: { type: 'Array', hidden: true, defaultValue: [] },
        overlayZone: { type: 'Array', hidden: true, defaultValue: [] },

        // === THEME ===
        theme: {
            label: { en: 'Theme', pl: 'Motyw' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'dark', label: { en: 'Dark', pl: 'Ciemny' } },
                    { value: 'light', label: { en: 'Light', pl: 'Jasny' } },
                ]
            },
            defaultValue: 'dark',
            bindable: true,
            responsive: true,
        },

        // === CONNECTION ===
        supabaseUrl: {
            label: { en: 'Supabase URL' },
            type: 'Text',
            defaultValue: '',
            bindable: true,
            section: 'settings',
        },
        supabaseAnonKey: {
            label: { en: 'Supabase Anon Key' },
            type: 'Text',
            defaultValue: '',
            bindable: true,
            section: 'settings',
        },

        // === STATE ===
        isSidebarCollapsed: {
            label: { en: 'Collapse Sidebar (PC)', pl: 'Zwiń sidebar (PC)' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
        },
        isMobileMenuOpen: {
            label: { en: 'Open Menu (Mobile)', pl: 'Otwórz menu (Mob)' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
        },

        // === NAVIGATION ITEMS ===
        navItems: {
            label: { en: 'Navigation Items', pl: 'Elementy nawigacji' },
            type: 'Array',
            options: {
                item: {
                    type: 'Object',
                    defaultValue: { label: 'Page', icon: '', url: '', isActive: false },
                    options: {
                        item: {
                            label: {
                                label: { en: 'Label', pl: 'Nazwa' },
                                type: 'Text',
                            },
                            icon: {
                                label: { en: 'Icon (Iconify)', pl: 'Ikona (Iconify)' },
                                type: 'Text',
                            },
                            url: {
                                label: { en: 'Page URL', pl: 'URL strony' },
                                type: 'Text',
                            },
                            isActive: {
                                label: { en: 'Active', pl: 'Aktywny' },
                                type: 'OnOff',
                            },
                        },
                    },
                },
            },
            defaultValue: [
                { label: 'Dashboard', icon: 'lucide:layout-dashboard', url: '/dashboard', isActive: true },
                { label: 'Admin', icon: 'lucide:settings', url: '/admin', isActive: false },
                { label: 'Clients', icon: 'lucide:users', url: '/clients', isActive: false },
            ],
            bindable: true,
            section: 'settings',
        },

        // === ANIMATION ===
        animationDuration: {
            label: { en: 'Animation Duration', pl: 'Czas animacji' },
            type: 'Length',
            options: { unitChoices: [{ value: 'ms', label: 'ms', min: 0, max: 2000 }] },
            defaultValue: '300ms',
            bindable: true,
            responsive: true,
        },
        animationTimingFunction: {
            label: { en: 'Animation Ease', pl: 'Typ animacji' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'cubic-bezier(0.16,1,0.3,1)', label: { en: 'Smooth' } },
                    { value: 'ease', label: { en: 'Ease' } },
                    { value: 'linear', label: { en: 'Linear' } },
                    { value: 'ease-in', label: { en: 'Ease In' } },
                    { value: 'ease-out', label: { en: 'Ease Out' } },
                    { value: 'ease-in-out', label: { en: 'Ease In Out' } },
                ],
            },
            defaultValue: 'cubic-bezier(0.16,1,0.3,1)',
            bindable: true,
            responsive: true,
        },

        // === LAYOUT DIMENSIONS ===
        sidebarWidth: {
            label: { en: 'Sidebar Width', pl: 'Szerokość sidebara' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 100, max: 400 }] },
            defaultValue: '260px',
            bindable: true,
            responsive: true,
        },
        sidebarCollapsedWidth: {
            label: { en: 'Collapsed Width (PC)', pl: 'Zwinieta szerokość (PC)' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 0, max: 200 }] },
            defaultValue: '68px',
            bindable: true,
            responsive: true,
        },
        topbarHeight: {
            label: { en: 'Top Bar Height', pl: 'Wysokość paska górnego' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 40, max: 120 }] },
            defaultValue: '56px',
            bindable: true,
            responsive: true,
        },

        // === COLORS: SURFACES ===
        sidebarBgColor: {
            label: { en: 'Sidebar Background', pl: 'Tło sidebara' },
            type: 'Color',
            defaultValue: '#141416',
            bindable: true, responsive: true,
        },
        topbarBgColor: {
            label: { en: 'Top Bar Background', pl: 'Tło paska górnego' },
            type: 'Color',
            defaultValue: '#141416',
            bindable: true, responsive: true,
        },
        overlayColor: {
            label: { en: 'Overlay Color', pl: 'Kolor overlay' },
            type: 'Color',
            defaultValue: 'rgba(0,0,0,0.65)',
            bindable: true, responsive: true,
        },
        accentColor: {
            label: { en: 'Accent Color', pl: 'Kolor akcentu' },
            type: 'Color',
            defaultValue: '#4B8765',
            bindable: true, responsive: true,
        },

        // === COLORS: BORDERS & EFFECTS ===
        sidebarBorderColor: {
            label: { en: 'Sidebar Border', pl: 'Ramka sidebara' },
            type: 'Color',
            defaultValue: '#27272a',
            bindable: true, responsive: true,
        },
        topbarBorderColor: {
            label: { en: 'Top Bar Border', pl: 'Ramka paska górnego' },
            type: 'Color',
            defaultValue: '#27272a',
            bindable: true, responsive: true,
        },
        topbarBlur: {
            label: { en: 'Topbar Backdrop Blur', pl: 'Rozmycie paska' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 0, max: 30 }] },
            defaultValue: '12px',
            bindable: true, responsive: true,
        },
        topbarShadow: {
            label: { en: 'Top Bar Shadow', pl: 'Cień paska górnego' },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'none', label: { en: 'None' } },
                    { value: 'sm', label: { en: 'Small' } },
                    { value: 'md', label: { en: 'Medium' } },
                ]
            },
            defaultValue: 'sm',
            bindable: true, responsive: true,
        },
        scrollbarColor: {
            label: { en: 'Scrollbar Color', pl: 'Kolor scrollbara' },
            type: 'Color',
            defaultValue: '#27272a',
            bindable: true,
        },

        // === NAV STYLING ===
        navIconSize: {
            label: { en: 'Nav Icon Size', pl: 'Rozmiar ikony' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 12, max: 32 }] },
            defaultValue: '18px',
            bindable: true, responsive: true,
        },
        navIconColor: {
            label: { en: 'Nav Icon Color', pl: 'Kolor ikony' },
            type: 'Color',
            defaultValue: '#71717a',
            bindable: true,
        },
        navActiveColor: {
            label: { en: 'Nav Active Color', pl: 'Kolor aktywnego elementu' },
            type: 'Color',
            defaultValue: '#6BAA85',
            bindable: true,
        },
        navActiveBg: {
            label: { en: 'Nav Active Background', pl: 'Tło aktywnego elementu' },
            type: 'Color',
            defaultValue: 'rgba(75,135,101,0.12)',
            bindable: true,
        },
        navHoverBg: {
            label: { en: 'Nav Hover Background', pl: 'Tło hover elementu' },
            type: 'Color',
            defaultValue: 'rgba(75,135,101,0.06)',
            bindable: true,
        },

        // === USER BLOCK ===
        showUserBlock: {
            label: { en: 'Show User Block', pl: 'Pokaż blok użytkownika' },
            type: 'OnOff',
            defaultValue: true,
            bindable: true,
        },
        logoutLabel: {
            label: { en: 'Logout Label', pl: 'Tekst wylogowania' },
            type: 'Text',
            defaultValue: 'Wyloguj',
            bindable: true,
        },
        logoutIcon: {
            label: { en: 'Logout Icon', pl: 'Ikona wylogowania' },
            type: 'Text',
            defaultValue: 'lucide:log-out',
            bindable: true,
        },
    }
};
