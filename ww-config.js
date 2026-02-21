export default {
    editor: {
        label: {
            en: 'CRM Layout Section',
            ru: 'Секция Макет CRM'
        },
        icon: 'layout',
        customStylePropertiesOrder: [
            ['menuWidth', 'menuPadding', 'contentPadding'],
            ['menuBgColor', 'contentBgColor', 'textColor', 'iconColor'],
            ['fontSize']
        ]
    },
    properties: {
        menuWidth: {
            label: { en: 'Menu Width (PC)', ru: 'Ширина меню (ПК)' },
            type: 'Length',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 50, max: 400 }],
            },
            defaultValue: '260px',
            bindable: true,
            responsive: true,
        },
        menuPadding: {
            label: { en: 'Menu Padding', ru: 'Отступы меню' },
            type: 'Length',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 0, max: 100 }],
            },
            defaultValue: '16px',
            bindable: true,
            responsive: true,
        },
        contentPadding: {
            label: { en: 'Content Padding', ru: 'Отступы контента' },
            type: 'Length',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 0, max: 100 }],
            },
            defaultValue: '32px',
            bindable: true,
            responsive: true,
        },
        menuBgColor: {
            label: { en: 'Menu Background', ru: 'Фон меню' },
            type: 'Color',
            defaultValue: '#ffffff',
            bindable: true,
            responsive: true,
        },
        contentBgColor: {
            label: { en: 'Content Background', ru: 'Фон контента' },
            type: 'Color',
            defaultValue: '#F3F4F6',
            bindable: true,
            responsive: true,
        },
        textColor: {
            label: { en: 'Text Color', ru: 'Цвет текста' },
            type: 'Color',
            defaultValue: '#374151',
            bindable: true,
            responsive: true,
        },
        iconColor: {
            label: { en: 'Icon Color', ru: 'Цвет иконок' },
            type: 'Color',
            defaultValue: '#6B7280',
            bindable: true,
            responsive: true,
        },
        fontSize: {
            label: { en: 'Base Font Size', ru: 'Размер шрифта' },
            type: 'Length',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 10, max: 24 }],
            },
            defaultValue: '15px',
            bindable: true,
            responsive: true,
        },
        menuItems: {
            label: { en: 'Menu Items', ru: 'Элементы меню' },
            type: 'Array',
            options: {
                item: {
                    type: 'Object',
                    options: {
                        item: {
                            icon: {
                                type: 'Text',
                                label: { en: 'Icon (FontAwesome Class)', ru: 'Иконка (класс FontAwesome)' }
                            },
                            text: {
                                type: 'Text',
                                label: { en: 'Label', ru: 'Текст' }
                            },
                            link: {
                                type: 'Text',
                                label: { en: 'Link / Action', ru: 'Ссылка' }
                            }
                        }
                    }
                }
            },
            defaultValue: [
                { icon: 'fas fa-chart-line', text: 'Dashboard', link: '#' },
                { icon: 'fas fa-users', text: 'Customers', link: '#' },
                { icon: 'fas fa-database', text: 'Data Tables', link: '#' },
                { icon: 'fas fa-cog', text: 'Settings', link: '#' }
            ],
            bindable: true
        }
    }
};
