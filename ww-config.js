export default {
    editor: {
        label: {
            en: 'CRM Layout Section',
            ru: 'Секция Макет CRM',
            pl: 'Sekcja Układu CRM'
        },
        icon: 'layout',
        customStylePropertiesOrder: [
            ['menuWidth', 'menuPadding', 'contentPadding'],
            ['menuBgColor', 'contentBgColor', 'textColor', 'iconColor', 'hoverBgColor', 'activeColor'],
            ['fontSize']
        ]
    },
    properties: {
        // Removed contentZone, sidebarTopZone, sidebarBottomZone from here because declaring them as 'Info' breaks WeWeb Layouts
        menuWidth: {
            label: { en: 'Menu Width (PC)', ru: 'Ширина меню (ПК)', pl: 'Szer. menu (PC)' },
            type: 'Length',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 60, max: 400 }],
            },
            defaultValue: '260px',
            bindable: true,
            responsive: true,
        },
        menuPadding: {
            label: { en: 'Menu Padding', ru: 'Отступы меню', pl: 'Padding menu' },
            type: 'Length',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 0, max: 100 }],
            },
            defaultValue: '16px',
            bindable: true,
            responsive: true,
        },
        contentPadding: {
            label: { en: 'Content Padding', ru: 'Отступы контента', pl: 'Padding zaw.' },
            type: 'Length',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 0, max: 100 }],
            },
            defaultValue: '32px',
            bindable: true,
            responsive: true,
        },
        menuBgColor: {
            label: { en: 'Menu Background', ru: 'Фон меню', pl: 'Tło menu' },
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
        textColor: {
            label: { en: 'Text Color', ru: 'Цвет текста', pl: 'Kolor tekstu' },
            type: 'Color',
            defaultValue: '#374151',
            bindable: true,
            responsive: true,
        },
        iconColor: {
            label: { en: 'Icon Color', ru: 'Цвет иконок', pl: 'Kolor ikony' },
            type: 'Color',
            defaultValue: '#6B7280',
            bindable: true,
            responsive: true,
        },
        hoverBgColor: {
            label: { en: 'Hover BG Color', ru: 'Фон при наведении', pl: 'Tło hover' },
            type: 'Color',
            defaultValue: 'rgba(55, 65, 81, 0.05)',
            bindable: true,
            responsive: true,
        },
        activeColor: {
            label: { en: 'Active Item Color', ru: 'Цвет активного', pl: 'Kolor aktywny' },
            type: 'Color',
            defaultValue: '#3B82F6',
            bindable: true,
            responsive: true,
        },
        fontSize: {
            label: { en: 'Base Font Size', ru: 'Размер шрифта', pl: 'Rozmiar czcionki' },
            type: 'Length',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 10, max: 24 }],
            },
            defaultValue: '14px',
            bindable: true,
            responsive: true,
        },
        menuCategories: {
            label: { en: 'Menu Categories', ru: 'Категории', pl: 'Kategorie menu' },
            type: 'Array',
            options: {
                item: {
                    type: 'Object',
                    options: {
                        item: {
                            title: {
                                type: 'Text',
                                label: { en: 'Title', ru: 'Заголовок', pl: 'Tytuł' }
                            },
                            items: {
                                type: 'Array',
                                label: { en: 'Items', ru: 'Элементы', pl: 'Elementy' },
                                options: {
                                    item: {
                                        type: 'Object',
                                        options: {
                                            item: {
                                                icon: {
                                                    type: 'Icon',
                                                    label: { en: 'Icon', ru: 'Иконка', pl: 'Ikona' }
                                                },
                                                text: {
                                                    type: 'Text',
                                                    label: { en: 'Label', ru: 'Текст', pl: 'Etykieta' }
                                                },
                                                link: {
                                                    type: 'Link',
                                                    label: { en: 'Link', ru: 'Ссылка', pl: 'Link' }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            defaultValue: [
                {
                    title: 'ANALYTICS',
                    items: [
                        { icon: 'lucide:pie-chart', text: 'Dashboard', link: null },
                        { icon: 'lucide:trending-up', text: 'Reports', link: null }
                    ]
                },
                {
                    title: 'MANAGEMENT',
                    items: [
                        { icon: 'lucide:users', text: 'Customers', link: null },
                        { icon: 'lucide:shopping-cart', text: 'Orders', link: null },
                        { icon: 'lucide:box', text: 'Products', link: null }
                    ]
                }
            ],
            bindable: true
        },
        systemMenu: {
            label: { en: 'Bottom Menu', ru: 'Нижнее меню', pl: 'Dolne menu' },
            type: 'Array',
            options: {
                item: {
                    type: 'Object',
                    options: {
                        item: {
                            icon: {
                                type: 'Icon',
                                label: { en: 'Icon', ru: 'Иконка', pl: 'Ikona' }
                            },
                            text: {
                                type: 'Text',
                                label: { en: 'Label', ru: 'Текст', pl: 'Etykieta' }
                            },
                            link: {
                                type: 'Link',
                                label: { en: 'Link', ru: 'Ссылка', pl: 'Link' }
                            }
                        }
                    }
                }
            },
            defaultValue: [
                { icon: 'lucide:settings', text: 'Settings', link: null },
                { icon: 'lucide:help-circle', text: 'Help & Support', link: null }
            ],
            bindable: true
        }
    }
};
