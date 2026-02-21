export default {
    editor: {
        label: {
            en: 'CRM Navigation Menu',
            ru: 'Навигационное меню CRM'
        },
        icon: 'layout',
        customStylePropertiesOrder: [
            ['isSidebarCollapsed', 'isMobileMenuOpen'],
            ['sidebarWidth', 'sidebarCollapsedWidth', 'topbarHeight'],
            ['sidebarBgColor', 'topbarBgColor', 'overlayColor']
        ]
    },
    triggerEvents: [
        { name: 'overlayClick', label: { en: 'On Mobile Overlay Click', ru: 'Клик по затемнению (закрыть моб. меню)' }, event: {} }
    ],
    properties: {
        // Dropzones
        menuToggleZone: { type: 'Array', hidden: true, defaultValue: [] },
        topbarZone: { type: 'Array', hidden: true, defaultValue: [] },
        sidebarZone: { type: 'Array', hidden: true, defaultValue: [] },

        // State variables explicitly exposed for Workflows
        isSidebarCollapsed: {
            label: { en: 'Collapse Sidebar (PC)', ru: 'Свернуть меню (ПК)' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
        },
        isMobileMenuOpen: {
            label: { en: 'Open Menu (Mobile)', ru: 'Открыть меню (Моб)' },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
        },

        // Layout Dimensions
        sidebarWidth: {
            label: { en: 'Sidebar Width', ru: 'Ширина боковой панели' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 100, max: 400 }] },
            defaultValue: '280px',
            bindable: true,
            responsive: true,
        },
        sidebarCollapsedWidth: {
            label: { en: 'Collapsed Width (PC)', ru: 'Свернутая ширина (ПК)' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 0, max: 200 }] },
            defaultValue: '80px',
            bindable: true,
            responsive: true,
        },
        topbarHeight: {
            label: { en: 'Top Bar Height', ru: 'Высота верхней панели' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 40, max: 120 }] },
            defaultValue: '70px',
            bindable: true,
            responsive: true,
        },

        // Colors
        sidebarBgColor: {
            label: { en: 'Sidebar Fill', ru: 'Фон боковой панели' },
            type: 'Color',
            defaultValue: '#ffffff',
            bindable: true, responsive: true,
        },
        topbarBgColor: {
            label: { en: 'Top Bar Fill', ru: 'Фон верхней панели' },
            type: 'Color',
            defaultValue: '#ffffff',
            bindable: true, responsive: true,
        },
        overlayColor: {
            label: { en: 'Overlay Fill', ru: 'Фон затемнения (моб)' },
            type: 'Color',
            defaultValue: 'rgba(0,0,0,0.4)',
            bindable: true, responsive: true,
        }
    }
};
