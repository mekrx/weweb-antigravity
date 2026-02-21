export default {
    editor: {
        label: {
            en: 'CRM Dashboard Layout',
            ru: 'Макет CRM Дашборда'
        },
        icon: 'layout',
        customStylePropertiesOrder: [
            ['sidebarWidth', 'sidebarCollapsedWidth', 'topbarHeight', 'contentPadding'],
            ['sidebarBgColor', 'topbarBgColor', 'contentBgColor', 'overlayColor', 'iconColor'],
            ['menuToggleIcon']
        ]
    },
    properties: {
        // Dropzones
        topbarZone: { type: 'Array', hidden: true, defaultValue: [] },
        sidebarZone: { type: 'Array', hidden: true, defaultValue: [] },
        contentZone: { type: 'Array', hidden: true, defaultValue: [] },

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
        contentPadding: {
            label: { en: 'Content Padding', ru: 'Отступы до контента' },
            type: 'Length',
            options: { unitChoices: [{ value: 'px', label: 'px', min: 0, max: 100 }] },
            defaultValue: '32px',
            bindable: true,
            responsive: true,
        },

        // Colors
        sidebarBgColor: {
            label: { en: 'Sidebar Fill', ru: 'Фон боковой панели' },
            type: 'Color',
            defaultValue: '#ffffff',
            bindable: true,
            responsive: true,
        },
        topbarBgColor: {
            label: { en: 'Top Bar Fill', ru: 'Фон верхней панели' },
            type: 'Color',
            defaultValue: '#ffffff',
            bindable: true,
            responsive: true,
        },
        contentBgColor: {
            label: { en: 'Content Fill', ru: 'Фон контента' },
            type: 'Color',
            defaultValue: '#F3F4F6',
            bindable: true,
            responsive: true,
        },
        overlayColor: {
            label: { en: 'Overlay Fill', ru: 'Фон затемнения (моб)' },
            type: 'Color',
            defaultValue: 'rgba(0,0,0,0.4)',
            bindable: true,
            responsive: true,
        },
        iconColor: {
            label: { en: 'Menu Icon Color', ru: 'Цвет иконки меню' },
            type: 'Color',
            defaultValue: '#000000',
            bindable: true,
            responsive: true,
        },

        // Settings
        menuToggleIcon: {
            label: { en: 'Menu Toggle Icon', ru: 'Иконка меню' },
            type: 'Icon',
            defaultValue: 'lucide:menu',
            bindable: true,
            responsive: true,
        }
    }
};
