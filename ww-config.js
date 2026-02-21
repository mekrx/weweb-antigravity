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
        contentZone: {
            type: 'Info',
            editorOnly: true
        },
        sidebarTopZone: {
            type: 'Info',
            editorOnly: true
        },
        sidebarBottomZone: {
            type: 'Info',
            editorOnly: true
        },
        menuWidth: {
            label: { en: 'Menu Width (PC)', ru: 'Ширина меню (ПК)', pl: 'Szerokość menu (PC)' },
            type: 'Length',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 60, max: 400 }],
            },
            defaultValue: '260px',
            bindable: true,
            responsive: true,
        },
        menuPadding: {
            label: { en: 'Menu Padding', ru: 'Отступы меню', pl: 'Odstępy menu' },
            type: 'Length',
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 0, max: 100 }],
            },
            defaultValue: '16px',
            bindable: true,
            responsive: true,
        },
        contentPadding: {
            label: { en: 'Content Padding', ru: 'Отступы контента', pl: 'Odstępy zawartości' },
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
            label: { en: 'Hover BG Color', ru: 'Фон при наведении', pl: 'Tło po najechaniu' },
            type: 'Color',
            defaultValue: 'rgba(55, 65, 81, 0.05)',
            bindable: true,
            responsive: true,
        },
        activeColor: {
            label: { en: 'Active Item Color', ru: 'Цвет активного', pl: 'Aktywny kolor' },
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
            label: { en: 'Main Menu Categories', ru: 'Основные категории', pl: 'Kategorie główne' },
            type: 'Array',
            options: {
                item: {
                    type: 'Object',
                    options: {
                        item: {
                            title: {
                                type: 'Text',
                                label: { en: 'Category Title', ru: 'Заголовок категории', pl: 'Tytuł kategorii' }
                            },
                            items: {
                                type: 'Array',
                                label: { en: 'Menu Items', ru: 'Элементы меню', pl: 'Elementy menu' },
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
                                                    label: { en: 'Link / Action', ru: 'Ссылка', pl: 'Link' }
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
                        { icon: 'fas fa-chart-pie', text: 'Dashboard', link: {} },
                        { icon: 'fas fa-chart-line', text: 'Reports', link: {} }
                    ]
                },
                {
                    title: 'MANAGEMENT',
                    items: [
                        { icon: 'fas fa-users', text: 'Customers', link: {} },
                        { icon: 'fas fa-shopping-cart', text: 'Orders', link: {} },
                        { icon: 'fas fa-box', text: 'Products', link: {} }
                    ]
                }
            ],
            bindable: true
        },
        systemMenu: {
            label: { en: 'Bottom System Menu', ru: 'Нижнее системное меню', pl: 'Dolne menu systemowe' },
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
                                label: { en: 'Link / Action', ru: 'Ссылка', pl: 'Link' }
                            }
                        }
                    }
                }
            },
            defaultValue: [
                { icon: 'fas fa-cog', text: 'Settings', link: {} },
                { icon: 'fas fa-question-circle', text: 'Help & Support', link: {} }
            ],
            bindable: true
        }
    }
};
