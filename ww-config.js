export default {
    editor: {
        label: {
            en: 'CRM Dashboard Layout',
            ru: 'Макет CRM Дашборда'
        },
        icon: 'layout',
        customStylePropertiesOrder: [
            ['isSidebarCollapsed', 'isMobileMenuOpen'],
            ['sidebarWidth', 'sidebarCollapsedWidth', 'topbarHeight'],
            ['contentPaddingTop', 'contentPaddingBottom', 'contentPaddingLeft', 'contentPaddingRight'],
            ['sidebarBgColor', 'topbarBgColor', 'contentBgColor', 'overlayColor']
        ]
    },
    triggerEvents: [
        { name: 'overlayClick', label: { en: 'On Mobile Overlay Click (to close menu)', ru: 'Клик по затемнению (закрыть моб. меню)' }, event: {} }
    ],
    properties: {
        // Dropzones
        menuToggleZone: { type: 'Array', hidden: true, defaultValue: [] },
        topbarZone: { type: 'Array', hidden: true, defaultValue: [] },
        sidebarZone: { type: 'Array', hidden: true, defaultValue: [] },
        contentZone: { type: 'Array', hidden: true, defaultValue: [] },

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

        // Detailed Content Paddings
        contentPaddingTop: {
            label: { en: 'Padding Top', ru: 'Отступ сверху' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 0, max: 200 }] },
            defaultValue: '32px',
            bindable: true, responsive: true,
        },
        contentPaddingBottom: {
            label: { en: 'Padding Bottom', ru: 'Отступ снизу' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 0, max: 200 }] },
            defaultValue: '32px',
            bindable: true, responsive: true,
        },
        contentPaddingLeft: {
            label: { en: 'Padding Left', ru: 'Отступ слева' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 0, max: 200 }] },
            defaultValue: '32px',
            bindable: true, responsive: true,
        },
        contentPaddingRight: {
            label: { en: 'Padding Right', ru: 'Отступ справа' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 0, max: 200 }] },
            defaultValue: '32px',
            bindable: true, responsive: true,
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
        contentBgColor: {
            label: { en: 'Content Fill', ru: 'Фон контента' },
            type: 'Color',
            defaultValue: '#F3F4F6',
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
