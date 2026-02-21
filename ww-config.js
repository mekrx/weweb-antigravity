export default {
    editor: {
        label: {
            en: 'CRM Dashboard Layout',
            ru: 'Макет CRM Дашборда',
            pl: 'Układ CRM Dashboard'
        },
        icon: 'layout',
        customStylePropertiesOrder: [
            ['sidebarWidth', 'sidebarCollapsedWidth', 'topbarHeight'],
            ['sidebarBgColor', 'topbarBgColor', 'contentBgColor', 'overlayColor']
        ]
    },
    properties: {
        // Dropzones
        menuToggleZone: { type: 'Array', hidden: true, defaultValue: [] },
        topbarZone: { type: 'Array', hidden: true, defaultValue: [] },
        sidebarZone: { type: 'Array', hidden: true, defaultValue: [] },
        contentZone: { type: 'Array', hidden: true, defaultValue: [] },

        // Layout Dimensions
        sidebarWidth: {
            label: { en: 'Sidebar Width (Expanded)', ru: 'Ширина боковой панели', pl: 'Szer. paska bocznego' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 100, max: 400 }] },
            defaultValue: '280px',
            bindable: true,
            responsive: true,
        },
        sidebarCollapsedWidth: {
            label: { en: 'Sidebar Width (Collapsed)', ru: 'Свернутая ширина (только ПК)', pl: 'Zwinięta szeroka (PC)' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 0, max: 200 }] },
            defaultValue: '80px',
            bindable: true,
            responsive: true,
        },
        topbarHeight: {
            label: { en: 'Top Bar Height', ru: 'Высота верхней панели', pl: 'Wys. paska górnego' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 40, max: 120 }] },
            defaultValue: '70px',
            bindable: true,
            responsive: true,
        },

        // Colors
        sidebarBgColor: {
            label: { en: 'Sidebar Background', ru: 'Фон боковой панели', pl: 'Tło paska bocznego' },
            type: 'Color',
            defaultValue: '#ffffff',
            bindable: true,
            responsive: true,
        },
        topbarBgColor: {
            label: { en: 'Top Bar Background', ru: 'Фон верхней панели', pl: 'Tło paska górnego' },
            type: 'Color',
            defaultValue: '#ffffff',
            bindable: true,
            responsive: true,
        },
        contentBgColor: {
            label: { en: 'Content Background', ru: 'Фон контента', pl: 'Tło zawartości' },
            type: 'Color',
            defaultValue: '#F3F4F6',
            bindable: true,
            responsive: true,
        },
        overlayColor: {
            label: { en: 'Menu Overlay (Mobile)', ru: 'Фон затемнения (моб)', pl: 'Tło ciemne (mobilne)' },
            type: 'Color',
            defaultValue: 'rgba(0,0,0,0.4)',
            bindable: true,
            responsive: true,
        }
    }
};
