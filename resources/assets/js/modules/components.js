/*export default*/
export default grapesjs.plugins.add('components', (editor, options) => {

    /*
     *   VARIABLES
     */
    var opt = options || {};
    var stylePrefix = editor.getConfig().stylePrefix;

    // Managers
    var domComponents = editor.DomComponents;
    var commands = editor.Commands;
    var panels = editor.Panels;

    // Built In Types
    var defaultType = domComponents.getType('default');
    var textType = domComponents.getType('text');
    var linkType = domComponents.getType('link');
    var imageType = domComponents.getType('image');
    var videoType = domComponents.getType('video');
    var tableType = domComponents.getType('table');
    var tableRowType = domComponents.getType('row');
    var tableCellType = domComponents.getType('cell');

    // Parameters
    var isPageMode = (options.record.type == 'page');

    // Sharred Proeprties
    var buttonProperties = {
        size: 'button_size',
        style: 'button_style',
        chevron: 'chevron_class',
        is_outline: 'button_outline',
        is_block: 'button_block',
        is_flat: 'button_flat'
    };

    // Shared Traits
    var dividerTrait = { type: 'divider', changeProp: 1 };

    var propertyTraits = [{
        type: 'checkbox',
        name: 'disableTraits',
        label: 'Disable Traits',
        changeProp: 1
    }, {
        type: 'checkbox',
        name: 'is_stylable',
        label: 'Stylable',
        changeProp: 1
    }, {
        type: 'checkbox',
        name: 'draggable',
        label: 'Draggable',
        changeProp: 1
    }, {
        type: 'checkbox',
        name: 'droppable',
        label: 'Droppable',
        changeProp: 1
    }, {
        type: 'checkbox',
        name: 'copyable',
        label: 'Copyable',
        changeProp: 1
    }, {
        type: 'checkbox',
        name: 'resizable',
        label: 'Resizable',
        changeProp: 1
    }, {
        type: 'checkbox',
        name: 'editable',
        label: 'Editable',
        changeProp: 1
    }, {
        type: 'checkbox',
        name: 'removable',
        label: 'Removable',
        changeProp: 1
    }];

    var alignmentTraits = [{
        type: 'select',
        name: 'self_alignment',
        label: 'Align',
        options: [
            { name: 'None', value: '' },
            { name: 'Left', value: 'left' },
            { name: 'Center', value: 'center' },
            { name: 'Right', value: 'right' }
        ],
        changeProp: 1
    }];

    var buttonStyleTraits = [{
        type: 'select',
        name: 'button_size',
        label: 'Size',
        options: [
            { name: 'Normal', value: '' },
            { name: 'Large', value: 'large' },
            { name: 'Small', value: 'small' },
            { name: 'Tiny', value: 'tiny' }
        ],
        changeProp: 1
    }, {
        type: 'select',
        name: 'button_style',
        label: 'Style',
        options: [
            { name: 'None', value: '' },
            { name: 'Button Link', value: 'link' },
            { name: 'Default', value: 'default' },
            { name: 'White', value: 'white' },
            { name: 'Holidays', value: 'holidays' },
            { name: 'Touring', value: 'touring' },
            { name: 'Ownership', value: 'ownership' },
            // { name: 'Primary', value: 'primary' },
            // { name: 'secondary', value: 'secondary' },
            // { name: 'Success', value: 'success' },
            // { name: 'Info', value: 'info' },
            // { name: 'Warning', value: 'warning' },
            // { name: 'Error', value: 'error' },
            // { name: 'Green', value: 'green' },
            // { name: 'Light Green', value: 'light-green' },
            // { name: 'Dark Green', value: 'dark-green' },
            // { name: 'Lime', value: 'lime' },
            // { name: 'Yellow', value: 'yellow' },
            // { name: 'Amber', value: 'amber' },
            // { name: 'Orange', value: 'orange' },
            // { name: 'Deep Orange', value: 'deep-orange' },
            // { name: 'Red', value: 'red' },
            // { name: 'Pink', value: 'pink' },
            // { name: 'Purple', value: 'purple' },
            // { name: 'Deep Purple', value: 'deep-purple' },
            // { name: 'Indigo', value: 'indigo' },
            // { name: 'Cyan', value: 'cyan' },
            // { name: 'Brown', value: 'brown' },
            // { name: 'Blue Grey', value: 'blue-grey' }
        ],
        changeProp: 1
    }, {
        type: 'select',
        name: 'chevron_class',
        label: 'Chevron',
        options: [
            { name: 'None', value: '' },
            { name: 'Left', value: 'link-chevron-left' },
            { name: 'Right', value: 'link-chevron-right' },
        ],
        changeProp: 1
    }, {
        type: 'checkbox',
        name: 'button_outline',
        label: 'Outline',
        changeProp: 1
    }, {
        type: 'checkbox',
        name: 'button_block',
        label: 'Block',
        changeProp: 1
    }, {
        type: 'checkbox',
        name: 'button_flat',
        label: 'Flat',
        changeProp: 1
    }];

    var marginTraits = [{
        type: 'select',
        name: 'margin_top_class',
        label: 'Margin Top',
        options: [
            { name: 'No Margin', value: '' },
            { name: 'Auto', value: 'mt-auto' },
            { name: 'Zero', value: 'mt-0' },
            { name: '0.25 REM', value: 'mt-1' },
            { name: '0.5 REM', value: 'mt-2' },
            { name: '1 REM', value: 'mt-3' },
            { name: '1.5 REM', value: 'mt-4' },
            { name: '3 REM', value: 'mt-5' }
        ],
        changeProp: 1
    }, {
        type: 'select',
        name: 'margin_bottom_class',
        label: 'Margin Bottom',
        options: [
            { name: 'No Margin', value: '' },
            { name: 'Auto', value: 'mb-auto' },
            { name: 'Zero', value: 'mb-0' },
            { name: '0.25 REM', value: 'mb-1' },
            { name: '0.5 REM', value: 'mb-2' },
            { name: '1 REM', value: 'mb-3' },
            { name: '1.5 REM', value: 'mb-4' },
            { name: '3 REM', value: 'mb-5' }
        ],
        changeProp: 1
    }];

    var inputTraits = [{
        type: 'text',
        name: 'value',
        label: 'Value',
        placeholder: 'Enter a default value..'
    }, {
        type: 'text',
        name: 'placeholder',
        label: 'Placeholder',
        placeholder: 'Enter placeholder text..'
    }, {
        type: 'checkbox',
        name: 'required',
        label: 'Required'
    }];

    var inputTypeTrait = {
        type: 'select',
        name: 'type',
        label: 'Type',
        options: [
            // { name: 'Colour', value: 'color' },
            { name: 'Date', value: 'date' },
            { name: 'Date Time', value: 'datetime-local' },
            { name: 'Email Address', value: 'email' },
            // { name: 'Month', value: 'month' },
            { name: 'Number', value: 'number' },
            // { name: 'Range', value: 'range' },
            // { name: 'Search', value: 'search' },
            { name: 'Telephone', value: 'tel' },
            { name: 'Text', value: 'text' },
            { name: 'Time', value: 'time' },
            { name: 'URL', value: 'url' },
            // { name: 'Week', value: 'week' },
        ]
    };

    var customNameTrait = {
        type: 'text',
        name: 'name',
        label: 'Name',
        placeholder: 'Enter a custom name..'
    };

    var customNameLabel = customNameTrait.label;

    var standardComponentTypes = [
        { 'name': 'div', tagNames: ['DIV'] },
        { 'name': 'section', tagNames: ['SECTION'] },

        // Temporary
        { 'name': 'table', tagNames: ['TABLE'] },
        { 'name': 'row', tagNames: ['TR'] },
        { 'name': 'cell', tagNames: ['TH', 'TD'] },
        { 'name': 'thead', tagNames: ['THEAD'] },
        { 'name': 'tbody', tagNames: ['TBODY'] },
        { 'name': 'tfoot', tagNames: ['TFOOT'] },
    ];


    /*
     *   COMPONENT TYPES
     */

    // Standard
    standardComponentTypes.forEach(function(type) {
        domComponents.addType(type.name, {
            model: defaultType.model.extend({
                defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                    stylable: [],
                    traits: []
                }),
                init() {
                    // Initialise code
                    var self = this;
                    var stylables = [];
                    var traits = [];

                    switch (self.get('tagName')) {
                        case 'div':
                        case 'section':
                            stylables = [
                                'float', /*'display',*/
                                'width', 'max-width', 'height',
                                'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right',
                                'padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right'
                            ];

                            traits = [{
                                    type: 'select',
                                    name: 'bgColorClass',
                                    label: 'BG. Colour',
                                    options: [
                                        { name: 'None', value: '' },
                                        { name: 'Primary', value: 'background-primary' },
                                        { name: 'Holidays', value: 'background-holidays' },
                                        { name: 'Touring', value: 'background-touring' },
                                        { name: 'Ownership', value: 'background-ownership' },
                                        { name: 'Sun', value: 'background-sun' },
                                        { name: 'Rose', value: 'background-rose' },
                                        { name: 'Dark', value: 'background-dark' },
                                        { name: 'Grey', value: 'background-grey' }
                                    ],
                                    changeProp: 1
                                },
                                {
                                    type: 'checkbox',
                                    name: 'isBgPale',
                                    label: 'Pale',
                                    changeProp: 1
                                }
                            ];
                            break;
                    }

                    // Run Commands
                    editor.runCommand('set-id-attribute', { component: self });
                    editor.runCommand('set-properties', { component: self, stylables: stylables, traits: traits });

                    // Listener -- Background Colour
                    self.listenTo(self, 'change:bgColorClass', function(component, value) {
                        var removeClasses = [
                            'background-primary', 'background-holidays', 'background-touring', 'background-ownership',
                            'background-sun', 'background-rose', 'background-dark', 'background-grey',

                            'background-primary-pale', 'background-holidays-pale', 'background-touring-pale', 'background-ownership-pale',
                            'background-grey-pale'
                        ];

                        var paleableClasses = ['background-primary', 'background-holidays', 'background-touring', 'background-ownership', 'background-grey'];
                        var makePale = component.get('isBgPale') && _.indexOf(paleableClasses, value) > -1;

                        editor.runCommand('remove-class', { component: self, classes: removeClasses });

                        if (value) {
                            editor.runCommand('add-class', { component: self, classes: [makePale ? value + '-pale' : value] });
                        }

                        editor.trigger('change:selectedComponent');
                    });

                    // Listener -- Is Background Color Pale
                    self.listenTo(self, 'change:isBgPale', function(component, value) {
                        var newClass;
                        var removeClasses = [
                            'background-primary', 'background-holidays', 'background-touring', 'background-ownership',
                            'background-sun', 'background-rose', 'background-dark', 'background-grey',

                            'background-primary-pale', 'background-holidays-pale', 'background-touring-pale', 'background-ownership-pale',
                            'background-grey-pale'
                        ];

                        var paleableClasses = ['background-primary', 'background-holidays', 'background-touring', 'background-ownership', 'background-grey'];

                        var current = _.find(component.get('classes').models, function(c) {
                            return _.indexOf(removeClasses, c.id) > -1;
                        });

                        var paleable = _.indexOf(paleableClasses, current.id) > -1;

                        if (current) {
                            newClass = value ? (paleable ? current.id + '-pale' : current.id.replace('-pale', '')) : current.id.replace('-pale', '');
                            editor.runCommand('remove-class', { component: self, classes: removeClasses });
                            editor.runCommand('add-class', { component: self, classes: [newClass] });

                            if (!paleable) { component.set('isBgPale', false); }
                        }
                    });
                }
            }, {
                isComponent: function(el) {
                    if (type.tagNames.indexOf(el.tagName) != -1) {
                        return { type: type.name };
                    }
                },
            }),

            view: defaultType.view
        });
    });

    // TEXT
    domComponents.addType('text', {
        model: textType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                droppable: false,
                editable: true,
                // traits: []
            }),
            init() {
                // Initialise code
                var self = this;
                var traits = [];
                var stylables = [
                    'text-align', 'font-weight',
                    'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right',
                    'padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right'
                ];
                var regex = /\b(h\d{1})\b/g;

                if (regex.test(self.get('tagName'))) {
                    self.set('custom-name', 'Heading');

                    traits.push({
                        type: 'select',
                        name: 'tagName',
                        label: 'Type',
                        options: [
                            { name: 'Heading 1', value: 'h1' },
                            { name: 'Heading 2', value: 'h2' },
                            { name: 'Heading 3', value: 'h3' },
                            { name: 'Heading 4', value: 'h4' },
                            { name: 'Heading 5', value: 'h5' },
                            { name: 'Heading 6', value: 'h6' }
                        ],
                        changeProp: 1
                    })
                }

                traits.push({
                    type: 'select',
                    name: 'colorClass',
                    label: 'Colour',
                    options: [
                        { name: 'Default', value: '' },
                        { name: 'Muted', value: 'text-muted' },
                        { name: 'White', value: 'text-white' },
                        { name: 'Primary', value: 'text-primary' },
                        { name: 'Holidays', value: 'text-holidays' },
                        { name: 'Touring', value: 'text-touring' },
                        { name: 'Ownership', value: 'text-ownership' }
                    ],
                    changeProp: 1
                });

                switch (self.get('tagName')) {
                    case 'caption':
                    case 'label':
                    case 'cine':
                        if (!self.get('custom-name')) {
                            var tagName = self.get('tagName');
                            tagName = tagName[0].toUpperCase() + tagName.substr(1).toLowerCase();
                            self.set('custom-name', tagName);
                        }

                        if (self.get('tagName') == 'caption') {
                            stylables = [];
                            traits = [];
                            self.set('copyable', false);
                            self.set('draggable', false);
                        }
                        break;
                    case 'p':
                        if (!self.get('custom-name')) {
                            self.set('custom-name', 'Paragraph');
                        }
                        break;
                }

                // Run Commands
                editor.runCommand('set-properties', { component: self, stylables: stylables, traits: traits });
                if (!self.get('linked_clone')) { editor.runCommand('set-id-attribute', { component: self }); }

                setTimeout(function() {
                    self.set('linked_clone', false);
                }, 1000);

                // Listener -- TagName
                self.listenTo(self, 'change:tagName', function(component, value) {
                    var sel = editor.getSelected();

                    var collection = sel.collection;
                    var index = collection.indexOf(sel);
                    sel.set('linked_clone', true);
                    var clone = sel.clone();

                    collection.add(clone, { at: index + 1 });
                    editor.trigger('component:update', sel);

                    editor.select(clone);
                    sel.destroy();
                });

                // Listener -- Colour
                self.listenTo(self, 'change:colorClass', function(component, value) {
                    var removeClasses = ['text-muted', 'text-white', 'text-primary', 'text-holidays', 'text-touring', 'text-ownership'];
                    editor.runCommand('remove-class', { component: self, classes: removeClasses });

                    if (value) {
                        editor.runCommand('add-class', { component: self, classes: [value] });
                    }
                });
            }
        }, {
            isComponent: function(el) {
                var regex = /\b(SPAN|P|H\d{1}|SMALL|CINE|LABEL|CAPTION)\b/g;
                if (regex.test(el.tagName)) {
                    return { type: 'text' };
                }
            },
        }),

        view: textType.view
    });

    // Link
    domComponents.addType('link', {
        model: linkType.model.extend({
            defaults: Object.assign({}, linkType.model.prototype.defaults, {
                stylable: [
                    'text-align', 'font-weight',
                    'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'
                ]
            }),
            init() {
                // Initialise code
                var self = this;
                var traits = self.get('traits').models.filter(function(t) { return t.get('changeProp') == 0 && t.get('type') != 'divider'; });

                traits = traits.concat([dividerTrait])
                    .concat(alignmentTraits)
                    .concat([dividerTrait])
                    .concat(buttonStyleTraits);

                // Run Commands
                editor.runCommand('set-properties', { component: self, traits: traits });
                editor.runCommand('set-id-attribute', { component: self });

                // Button Styles
                var buttonSize = self.get(buttonProperties.size);
                var buttonStyle = self.get(buttonProperties.style);
                var buttonChevron = self.get(buttonProperties.chevron);
                var buttonOutline = self.get(buttonProperties.is_outline);
                var buttonBlock = self.get(buttonProperties.is_block);
                var buttonFlat = self.get(buttonProperties.is_flat);

                if (!buttonSize) { self.set(buttonProperties.size, ''); }
                if (!buttonStyle) { self.set(buttonProperties.style, ''); }
                if (!buttonChevron) { self.set(buttonProperties.chevron, ''); }
                if (!buttonOutline) { self.set(buttonProperties.is_outline, false); }
                if (!buttonBlock) { self.set(buttonProperties.is_block, false); }
                if (!buttonFlat) { self.set(buttonProperties.is_flat, false); }

                // Listeners -- Button style traits
                for (var key in buttonProperties) {
                    if (buttonProperties.hasOwnProperty(key)) {
                        self.listenTo(self, 'change:' + buttonProperties[key], function(component, value) {
                            editor.runCommand('set-button-style', { component: component });
                        });
                    }
                }

                // Listener -- ALignment
                self.listenTo(self, 'change:self_alignment', function(component, value) {
                    editor.runCommand('set-alignment', { component: component, align: value });
                });

                editor.runCommand('set-button-style', { component: self });
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'A') {
                    return { type: 'link' };
                }
            },
        }),

        view: linkType.view
    });

    // Icon
    domComponents.addType('icon', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [
                    'font-size', 'font-weight',
                    'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'
                ]
            }),
            init() {
                // Initialise code
                var self = this;
                var traits = [];
                var toolbarItems = self.get('toolbar');
                var iconSelectorItem = _.find(toolbarItems, { command: 'open-icon-selector' });

                if (!iconSelectorItem) {
                    toolbarItems.splice(2, 0, { attributes: { class: 'fa fa-info', title: 'Change icon' }, command: 'open-icon-selector' })
                    self.set('toolbar', toolbarItems);
                }

                editor.runCommand('set-id-attribute', { component: self });
                editor.runCommand('set-properties', { component: self, traits: traits });
            }
        }, {
            isComponent: function(el) {
                var regex = /\b(icon)\b/g;
                if (el.tagName == 'I' && regex.test(el.className)) {
                    return { type: 'icon' };
                }
            },
        }),

        view: defaultType.view
    });

    // List
    domComponents.addType('list', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [
                    'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right',
                    'padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right'
                ],
                traits: []
            }),
            init() {
                // Initialise code
                var self = this;
                self.set('custom-name', (self.get('tagName') == 'ul' ? 'Unordered List' : 'Ordered List'))

                editor.runCommand('set-id-attribute', { component: self });
                editor.runCommand('set-properties', { component: self });
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'UL' || el.tagName == 'OL') {
                    return { type: 'list' };
                }
            },
        }),

        view: defaultType.view
    });

    // List Item
    domComponents.addType('list item', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [
                    'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right',
                    'padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right'
                ],
                traits: []
            }),
            init() {
                // Initialise code
                var self = this;
                self.set('custom-name', 'List Item');

                editor.runCommand('set-id-attribute', { component: self });
                editor.runCommand('set-properties', { component: self });
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'LI') {
                    return { type: 'list item' };
                }
            },
        }),

        view: defaultType.view
    });

    // Table Wrapper
    domComponents.addType('table wrapper', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                droppable: ['table'],
                traits: []
            }),
            init() {
                // Initialise code
                var self = this;
                var traits = [{
                    type: 'select',
                    name: 'theme_class',
                    label: 'Theme',
                    options: [
                        { name: 'None', value: '' },
                        { name: 'Holidays', value: 'holidays' },
                        { name: 'Touring', value: 'touring' },
                        { name: 'Ownership', value: 'ownership' }
                    ],
                    changeProp: 1
                }];

                // editor.runCommand('set-id-attribute', { component: self });
                editor.runCommand('set-properties', { component: self, stylables: [], traits: traits });

                // Listener -- Change theme class
                self.listenTo(self, 'change:theme_class', function(component, value) {
                    var removeClasses = ['holidays', 'touring', 'ownership'];
                    editor.runCommand('remove-class', { component: self, classes: removeClasses });

                    if (value) {
                        editor.runCommand('add-class', { component: self, classes: [value] });
                    }
                });
            }
        }, {
            isComponent: function(el) {
                var regex = /\b(table-wrapper)\b/g;
                if (el.tagName == 'DIV' && regex.test(el.className)) {
                    return { type: 'table wrapper' };
                }
            },
        }),

        view: defaultType.view
    });

    // Table Wrapper
    domComponents.addType('table group', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                droppable: ['table'],
                traits: []
            }),
            init() {
                // Initialise code
                var self = this;

                var tagName = self.get('tagName');
                tagName = tagName[0].toUpperCase() + tagName.substr(1).toLowerCase();
                self.set('custom-name', tagName);

                switch (self.get('tagName')) {
                    case 'thead':
                    case 'tfoot':
                        self.set('copyable', false);
                        self.set('draggable', false);
                        self.set('droppable', false);
                        break;
                }

                // editor.runCommand('set-id-attribute', { component: self });
                editor.runCommand('set-properties', { component: self, stylables: [], traits: [] });
            }
        }, {
            isComponent: function(el) {
                var regex = /\b(THEAD|TBODY|TFOOT)\b/g;
                if (regex.test(el.tagName)) {
                    return { type: 'table group' };
                }
            },
        }),

        view: defaultType.view
    });

    // Container
    domComponents.addType('container', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: ['margin', 'margin-top', 'margin-bottom', 'padding', 'padding-top', 'padding-bottom'],
                draggable: true,
                copyable: true,
                resizable: false,
                editable: true,
                removable: true
            }),
            init() {
                // Initialise code
                var self = this;

                var classes = {
                    normal: 'container',
                    fluid: 'fluid-container'
                };
                var isFluid = self.get('classes').where({ name: classes.fluid }).length > 0;
                self.set('fluid', isFluid);

                var traits = [{
                    type: 'checkbox',
                    name: 'fluid',
                    label: 'Fluid',
                    changeProp: 1
                }];

                // Run Commands
                editor.runCommand('set-id-attribute', { component: self });
                editor.runCommand('set-properties', { component: self, traits: traits, allowDisablingTraits: true });

                // Listener -- Change container class between Fluid and Non-fluid
                self.listenTo(self, 'change:fluid', function(component, value) {
                    var prevClass = value ? classes.normal : classes.fluid;
                    var newClass = value ? classes.fluid : classes.normal;

                    editor.runCommand('remove-class', { component: self, classes: [prevClass] });
                    editor.runCommand('add-class', { component: self, classes: [newClass] });
                });

                // DRAGGABLE #WRAPPER FIX - TODO Remove in future versions
                if (self.get('draggable') == '#wrapper') {
                    self.set('draggable', true);
                }
            }
        }, {
            isComponent: function(el) {
                var regex = /\b(container|fluid-container)\b/g;
                if (el.tagName == 'DIV' && regex.test(el.className)) {
                    return { type: 'container' };
                }
            },
        }),

        view: defaultType.view
    });

    // Grid
    domComponents.addType('grid', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: ['margin', 'margin-top', 'margin-bottom'],
                droppable: ['.grd-cl'],
                resizable: false,
                editable: true,
            }),
            init() {
                // Initialise code
                var self = this;
                // self.set('noGutter', self.get('classes').models.filter(function(c) { return c.get('name').indexOf('-noGutter') > -1; }).length > 0);

                var traits = [{
                    type: 'select',
                    name: 'horizontallyAligned',
                    label: 'H. Align',
                    options: [
                        { name: 'Default', value: '' },
                        { name: 'Center', value: 'center' },
                        { name: 'Right', value: 'right' }
                    ],
                    changeProp: 1
                }, {
                    type: 'checkbox',
                    name: 'equalHeight',
                    label: 'Eq. Height',
                    changeProp: 1
                }, {
                    type: 'checkbox',
                    name: 'noGutter',
                    label: 'No Gutter',
                    changeProp: 1
                }];

                _.forEach(traits, function(trait) {
                    // Listener -- Horizontal Alignment
                    self.listenTo(self, 'change:' + trait.name, function(component, value) {
                        var newClass = 'grid';

                        var ha = component.get('horizontallyAligned');
                        var eh = component.get('equalHeight');
                        var ng = component.get('noGutter');

                        if (ha && ha != '') { newClass += '-' + ha; }
                        if (eh) { newClass += '-equalHeight'; }
                        if (ng) { newClass += '-noGutter'; }

                        // Remove Old CLasses
                        editor.runCommand('remove-class', { component: component, classes: [], removeAllBut: ['grd'] });

                        // Add New CLasses
                        editor.runCommand('add-class', { component: component, classes: [newClass] });
                    });
                });

                // Run Commands
                editor.runCommand('set-id-attribute', { component: self });
                editor.runCommand('set-properties', { component: self, traits: traits });
            }
        }, {
            isComponent: function(el) {
                var regex = /\b(grid)([-]\d{1,2})?(([_]([a-z]{2})[-]\d{1,2}){1,3})?(-noGutter)?\b/g;
                if (el.tagName == 'DIV' && regex.test(el.className)) {
                    return { type: 'grid' };
                }
            },
        }),

        view: defaultType.view.extend({
            // The render() should return 'this'
            render: function() {
                // Extend the original render method
                defaultType.view.prototype.render.apply(this, arguments);
                // this.el.classList.add(stylePrefix + 'grd');
                return this;
            },
        })
    });

    // COLUMN
    domComponents.addType('column', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                draggable: ['.grd'],
                resizable: false,
                editable: false,
            }),
            init() {
                var self = this;
                var options = [
                    { name: 'None', value: '' },
                    { name: '1', value: '1' },
                    { name: '2', value: '2' },
                    { name: '3', value: '3' },
                    { name: '4', value: '4' },
                    { name: '5', value: '5' },
                    { name: '6', value: '6' },
                    { name: '7', value: '7' },
                    { name: '8', value: '8' },
                    { name: '9', value: '9' },
                    { name: '10', value: '10' },
                    { name: '11', value: '11' },
                    { name: '12', value: '12' }
                ];

                var columnSizeTraits = [{
                    type: 'select',
                    name: 'column_xl',
                    label: 'XL',
                    options: options,
                    changeProp: 1
                }, {
                    type: 'select',
                    name: 'column_lg',
                    label: 'LG',
                    options: options,
                    changeProp: 1
                }, {
                    type: 'select',
                    name: 'column_md',
                    label: 'MD',
                    options: options,
                    changeProp: 1
                }, {
                    type: 'select',
                    name: 'column_sm',
                    label: 'SM',
                    options: options,
                    changeProp: 1
                }, {
                    type: 'select',
                    name: 'column_xs',
                    label: 'XS',
                    options: options,
                    changeProp: 1
                }];

                var traits = columnSizeTraits;

                _.forEach(columnSizeTraits, function(trait) {
                    // Listener -- Column Size Traits
                    self.listenTo(self, 'change:' + trait.name, function(component, value) {
                        var newClass = 'col';

                        var xl = component.get('column_xl');
                        var lg = component.get('column_lg');
                        var md = component.get('column_md');
                        var sm = component.get('column_sm');
                        var xs = component.get('column_xs');

                        if (xl) { newClass += '-' + xl; }
                        if (lg) { newClass += '_lg-' + lg; }
                        if (md) { newClass += '_md-' + md; }
                        if (sm) { newClass += '_sm-' + sm; }
                        if (xs) { newClass += '_xs-' + xs; }

                        // Remove Old CLasses
                        editor.runCommand('remove-class', { component: component, classes: [], removeAllBut: ['grd-cl'] });
                        // Add New Classes
                        editor.runCommand('add-class', { component: component, classes: [newClass] });
                    });
                });

                // Run Commands
                editor.runCommand('set-properties', { component: self, traits: traits });
                // editor.runCommand('set-id-attribute', { component: self });
            }
        }, {
            isComponent: function(el) {
                var regex = /\b(col)([-]\d{1,2})?(([_]([a-z]{2})[-]\d{1,2}){1,3})?\b/g;
                if (el.tagName == 'DIV' && regex.test(el.className)) {
                    return { type: 'column' };
                }
            },
        }),

        view: defaultType.view.extend({
            // The render() should return 'this'
            render: function() {
                // Extend the original render method
                defaultType.view.prototype.render.apply(this, arguments);
                // this.el.classList.add(stylePrefix + 'grd-cl');
                return this;
            },
        })
    });

    // Image
    domComponents.addType('image', {
        model: imageType.model.extend({
            defaults: Object.assign({}, imageType.model.prototype.defaults, {
                stylable: ['float', 'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'],
                editable: true,
                resizable: false
            }),
            init() {
                // Initialise code
                var self = this;
                var traits = [self.get('traits').where({ name: 'alt' })[0]].concat([{
                    type: 'text',
                    name: 'srcset_sizes',
                    label: 'Srcset',
                    placeholder: 'eg. 400x250 768w',
                    changeProp: 1
                }, {
                    type: 'checkbox',
                    name: 'is_responsive',
                    label: 'Responsive',
                    changeProp: 1
                }]);

                // Run Commands
                editor.runCommand('set-properties', { component: self, traits: traits });
                editor.runCommand('set-id-attribute', { component: self });

                // Listener -- SRC
                self.listenTo(self, 'change:src', function(component, value) {
                    editor.runCommand('set-srcset', { component: component });
                });

                // Listener -- Srcseet Sizes
                self.listenTo(self, 'change:srcset_sizes', function(component, value) {
                    editor.runCommand('set-srcset', { component: component });
                });

                // Listener -- Responsive
                self.listenTo(self, 'change:is_responsive', function(component, value) {
                    var respClass = ['img-responsive'];

                    if (value) {
                        // Add New CLasses
                        editor.runCommand('add-class', { component: component, classes: respClass });
                    } else {
                        // Remove Old CLasses
                        editor.runCommand('remove-class', { component: component, classes: respClass });
                    }
                });
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'IMG') {
                    return { type: 'image' };
                }
            },
        }),

        view: imageType.view
    });

    // Video
    domComponents.addType('video', {
        model: videoType.model.extend({
            defaults: Object.assign({}, videoType.model.prototype.defaults, {
                stylable: ['margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'],
            }),
            init() {
                // Initialise code
                var self = this;

                // Run Commands
                // editor.runCommand('set-properties', { component: self });
                editor.runCommand('set-id-attribute', { component: self });
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'VIDEO') {
                    return { type: 'video' };
                }
            },
        }),

        view: videoType.view
    });

    // Button
    domComponents.addType('button', {
        model: textType.model.extend({
            defaults: Object.assign({}, textType.model.prototype.defaults, {
                stylable: []
            }),
            init() {
                // Initialise code
                var self = this;
                var attrs = self.get('attributes');
                if (!attrs.type) { attrs.type = 'button'; }

                self.set('attributes', attrs);

                // Button Styles
                var buttonSize = self.get(buttonProperties.size);
                var buttonStyle = self.get(buttonProperties.style);
                var buttonChevron = self.get(buttonProperties.chevron);
                var buttonOutline = self.get(buttonProperties.is_outline);
                var buttonBlock = self.get(buttonProperties.is_block);
                var buttonFlat = self.get(buttonProperties.is_flat);

                if (!buttonSize) { self.set(buttonProperties.size, ''); }
                if (!buttonStyle) { self.set(buttonProperties.style, 'default'); }
                if (!buttonChevron) { self.set(buttonProperties.chevron, ''); }
                if (!buttonOutline) { self.set(buttonProperties.is_outline, false); }
                if (!buttonBlock) { self.set(buttonProperties.is_block, false); }
                if (!buttonFlat) { self.set(buttonProperties.is_flat, false); }

                // Listeners -- Button style traits
                for (var key in buttonProperties) {
                    if (buttonProperties.hasOwnProperty(key)) {
                        self.listenTo(self, 'change:' + buttonProperties[key], function(component, value) {
                            editor.runCommand('set-button-style', { component: component });
                        });
                    }
                }

                // Listener -- ALignment
                self.listenTo(self, 'change:self_alignment', function(component, value) {
                    editor.runCommand('set-alignment', { component: component, align: value });
                });

                var traits = [{
                        type: 'select',
                        name: 'type',
                        label: 'Type',
                        options: [
                            { name: 'Button', value: 'button' },
                            { name: 'Submit', value: 'submit' },
                            { name: 'Reset', value: 'reset' },
                        ]
                    }]
                    .concat([dividerTrait])
                    .concat(alignmentTraits)
                    .concat([dividerTrait])
                    .concat(buttonStyleTraits);

                editor.runCommand('set-button-style', { component: self });
                editor.runCommand('set-properties', { component: self, traits: traits });
                editor.runCommand('set-id-attribute', { component: self });
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'BUTTON') {
                    return { type: 'button' };
                }
            },
        }),

        view: textType.view
    });

    // Form
    domComponents.addType('form', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                droppable: false,
                copyable: true,
                resizable: false,
                editable: false,
                removable: true,
                traits: []
            }),
            init() {
                // Initialise code
                var self = this;
                var attrs = self.get('attributes');
                attrs.action = options.forms.action;
                attrs.method = options.forms.method;

                self.set('attributes', attrs);
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'FORM') {
                    return { type: 'form' };
                }
            },
        }),

        view: defaultType.view
    });

    // Form Dropzone
    domComponents.addType('form dropzone', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                draggable: false,
                droppable: true,
                copyable: false,
                resizable: false,
                editable: false,
                removable: false,
                traits: []
            })
        }, {
            isComponent: function(el) {
                if (el.className == 'form-dropzone') {
                    return { type: 'form dropzone' };
                }
            },
        }),

        view: defaultType.view
    });

    // Input Box
    domComponents.addType('input', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                droppable: false
            }),
            init() {
                // Initialise code
                var self = this;
                var attrs = self.get('attributes');
                var traits = [].concat(inputTypeTrait).concat(inputTraits);

                var formData = {};
                var getFieldNames = false;
                var inputType = attrs.type ? attrs.type : self.get('is_hidden') ? 'hidden' : null;

                switch (inputType) {
                    case 'checkbox':
                    case 'radio':
                        traits = traits.filter(function(t) {
                            return (t.name == 'name' && t.type == 'text') || t.name == 'value' || t.name == 'required';
                        });

                        traits.splice(traits.length - 1, 0, {
                            type: 'checkbox',
                            name: 'is_checked',
                            label: 'Checked',
                            changeProp: 1
                        });

                        getFieldNames = true;
                        formData.include_types = [inputType];

                        // Listener -- name field
                        self.listenTo(self, 'change:is_checked', function(component, value) {
                            var attrs = component.get('attributes');

                            if (value) {
                                attrs.checked = 'checked';
                            } else {
                                delete attrs.checked;
                            }

                            component.set('attributes', attrs);
                            domComponents.render();
                        });
                        break;
                    case 'hidden':
                        // Code Here
                        if (!self.get('is_hidden')) { self.set('is_hidden', true); }
                        attrs.readonly = 'readonly';
                        attrs['data-hidden'] = 'hidden';
                        delete attrs.type;

                        customNameTrait.label = customNameLabel;
                        traits = [].concat(self.get('removable') ? customNameTrait : []).concat(traits.filter(function(t) {
                            return t.name == 'value';
                        }));
                        break;
                    default:
                        // Code Here
                        getFieldNames = (inputType);
                        formData.exclude_types = ['radio', 'checkbox', 'textarea'];
                        break;
                }

                if (getFieldNames) {
                    if (!self.get('name_field') || self.get('name_field') == '') {
                        var index = (inputType == 'radio' || inputType == 'checkbox') ? 0 : 1;
                        customNameTrait.label = ' ';
                        traits.splice(index, 0, customNameTrait);
                    }

                    /* Load Options */
                    $.ajax({
                            type: 'POST',
                            url: opt.url_prefix + '/ajax/get/field/names',
                            dataType: 'json',
                            data: formData
                        })
                        .done(function(data) {
                            var exists = traits.filter(function(t) { return t.name == 'name_field'; }).length > 0;

                            if (!exists) {
                                var trait = {
                                    type: 'select',
                                    name: 'name_field',
                                    label: 'Name',
                                    options: [{ name: 'Custom', value: '' }],
                                    value: '',
                                    changeProp: 1
                                };

                                data.forEach(function(field) {
                                    if (field.name) {
                                        trait.options.push({
                                            name: field.name,
                                            value: field.value,
                                            input_type: field.type,
                                            default_values: field.values,
                                            copies: field.copies
                                        });
                                    }
                                });

                                var index = (inputType == 'radio' || inputType == 'checkbox') ? 0 : 1;
                                traits.splice(index, 0, trait);
                            }

                            self.set('traits', traits);
                        });

                    // Listener -- name field
                    self.listenTo(self, 'change:name_field', function(component, value) {
                        var attrs = component.get('attributes');
                        traits = component.get('traits').models.filter(function(t) { return t.get('name') != 'name' && t.get('name') != 'type'; });

                        var selectedOption = traits.filter(function(t) {
                            return t.get('name') == 'name_field';
                        })[0].get('options').filter(function(o) { return o.value == value })[0];

                        customNameTrait.label = ' ';
                        attrs.name = value;

                        switch (inputType) {
                            case 'checkbox':
                            case 'radio':
                                // Code here
                                if (value.trim() == '') {
                                    traits.splice(1, 0, customNameTrait);
                                }
                                break;
                            default:
                                // Code here
                                if (value.trim() == '') {
                                    traits.splice(0, 0, inputTypeTrait);
                                    traits.splice(2, 0, customNameTrait);
                                    attrs.type = 'text';
                                } else {
                                    attrs.type = selectedOption.input_type;
                                }
                                break;
                        }

                        // ACCEPT Attribute
                        if (attrs.type == 'file') {
                            attrs.accept = 'image/*';
                        } else {
                            delete attrs.accept;
                        }

                        component.set('traits', traits);
                        component.set('attributes', attrs);
                        editor.trigger('change:selectedComponent');
                        domComponents.render();

                        customNameTrait.label = customNameLabel;
                    });
                }

                self.set('traits', traits);
                self.set('attributes', attrs);
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'INPUT') {
                    return { type: 'input' };
                }
            },
        }),

        view: defaultType.view
    });

    // Select Box
    domComponents.addType('select', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                droppable: ['option'],
                traits: [{
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    placeholder: 'Enter field name..'
                }, {
                    type: 'text',
                    name: 'size',
                    label: 'Size',
                    value: 1,
                    min: 1,
                    max: 10
                }, {
                    type: 'checkbox',
                    name: 'multiple',
                    label: 'Multiple',
                    changeProp: 1
                }, {
                    type: 'checkbox',
                    name: 'required',
                    label: 'Required'
                }]
            }),
            init() {
                // Initialise code
                var self = this;

                // Listener -- Multiple
                self.listenTo(self, 'change:multiple', function(component, value) {
                    var attrs = component.get('attributes');

                    if (value) {
                        attrs.multiple = 'multiple';
                    } else {
                        delete attrs.multiple;
                    }

                    component.set('attributes', attrs);
                    domComponents.render();
                });
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'SELECT') {
                    return { type: 'select' };
                }
            },
        }),

        view: defaultType.view
    });

    // Select Box
    domComponents.addType('option', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                droppable: false,
                traits: [{
                    type: 'text',
                    name: 'content',
                    label: 'Text',
                    placeholder: 'Enter the text.',
                    changeProp: 1
                }, {
                    type: 'text',
                    name: 'value',
                    label: 'Value',
                    placeholder: 'Enter the value.'
                }, {
                    type: 'checkbox',
                    name: 'is_selected',
                    label: 'Selected',
                    changeProp: 1
                }, {
                    type: 'checkbox',
                    name: 'is_disabled',
                    label: 'Disabled',
                    changeProp: 1
                }]
            }),
            init() {
                // Initialise code
                var self = this;

                // Listener -- Content
                self.listenTo(self, 'change:content', function(component, value) {
                    domComponents.render();
                });

                // Listener -- Selected
                self.listenTo(self, 'change:is_selected', function(component, value) {
                    var attrs = component.get('attributes');

                    if (value) {
                        attrs.selected = 'selected';
                    } else {
                        delete attrs.selected;
                    }

                    component.set('attributes', attrs);
                    domComponents.render();
                });

                // Listener -- Selected
                self.listenTo(self, 'change:is_disabled', function(component, value) {
                    var attrs = component.get('attributes');

                    if (value) {
                        attrs.disabled = 'disabled';
                    } else {
                        delete attrs.disabled;
                    }

                    component.set('attributes', attrs);
                    domComponents.render();
                });
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'OPTION') {
                    return { type: 'option' };
                }
            },
        }),

        view: defaultType.view
    });

    // Textarea
    domComponents.addType('textarea', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                droppable: false
            }),
            init() {
                // Initialise code
                var self = this;
                var attrs = self.get('attributes');
                var traits = [{
                    type: 'text',
                    name: 'rows',
                    label: 'Rows',
                }].concat(inputTraits);

                if (!self.get('name_field') || self.get('name_field') == '') {
                    customNameTrait.label = ' ';
                    traits.splice(0, 0, customNameTrait);
                }

                /* Load Options */
                $.ajax({
                        type: 'POST',
                        url: opt.url_prefix + '/ajax/get/field/names',
                        dataType: 'json',
                        data: { include_types: ['textarea'] }
                    })
                    .done(function(data) {
                        var exists = traits.filter(function(t) { return t.name == 'name_field'; }).length > 0;

                        if (!exists) {
                            var trait = {
                                type: 'select',
                                name: 'name_field',
                                label: 'Name',
                                options: [{ name: 'Custom', value: '' }],
                                value: '',
                                changeProp: 1
                            };

                            data.forEach(function(field) {
                                if (field.name) {
                                    trait.options.push({
                                        name: field.name,
                                        value: field.value
                                    });
                                }
                            });

                            traits.splice(0, 0, trait);
                        }

                        self.set('traits', traits);
                    });

                // Listener -- name field
                self.listenTo(self, 'change:name_field', function(component, value) {
                    var attrs = component.get('attributes');
                    traits = component.get('traits').models.filter(function(t) { return t.get('name') != 'name'; });

                    customNameTrait.label = ' ';
                    attrs.name = value;

                    if (value == '') {
                        traits.splice(1, 0, customNameTrait);
                    }

                    component.set('traits', traits);
                    component.set('attributes', attrs);
                    editor.trigger('change:selectedComponent');
                    domComponents.render();

                    customNameTrait.label = customNameLabel;
                });


                self.set('traits', traits);
                self.set('attributes', attrs);
                editor.runCommand('set-id-attribute', { component: self });
                // customNameTrait.label = customNameLabel;
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'TEXTAREA') {
                    return { type: 'textarea' };
                }
            },
        }),

        view: defaultType.view
    });


    // DYNAMIC BLOCKS
    domComponents.addType('dynablock', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                droppable: false,
                copyable: false,
                resizable: false,
                editable: false
            }),
            init() {
                var self = this;
                var attrs = self.get('attributes');
                var properties = self.get('properties') || [];
                var traits = !isPageMode ? [{
                    type: 'text',
                    name: 'data-view',
                    label: 'View',
                    placeholder: 'Enter view name'
                }] : [];

                var datajson = attrs['data-json'] ? JSON.parse(atob(attrs['data-json'])) : {};

                if (attrs['properties']) {
                    // Take payload-properties and add to gjs_components
                    properties = JSON.parse(atob(attrs['properties']));
                    delete attrs['properties'];

                    self.set('properties', properties || {});
                }

                if (properties) {
                    // Create Dynamic Traits from Payload Properties
                    _.forEach(properties, function(property) {
                        var trait = {
                            type: (property.type == 'select' && property.multiple) ? 'multi-select' : property.type,
                            label: property.label || property.name,
                            name: property.name,
                            options: property.options || [],
                            value: property.value,
                            changeProp: 1
                        };

                        trait.options = [{ name: (property.multiple) ? 'All ' + property.label : 'Please select ', value: '', disable: !property.multiple }].concat(trait.options);

                        // Ajax Load Options
                        if (property.dynamic_options) {
                            var formData = {
                                table: property.options_table,
                                text_field: property.options_text_field,
                                value_field: property.options_value_field
                            };

                            if (property.options_connection) { formData.connection = property.options_connection; }

                            /* Load Options */
                            $.ajax({
                                    type: 'POST',
                                    url: opt.url_prefix + '/ajax/get/trait/options',
                                    dataType: 'json',
                                    data: formData,
                                })
                                .done(function(data) {
                                    var compTraits = self.get('traits');
                                    var iTrait = _.find(compTraits.models, function(m) { return m.get('name') == property.name; });
                                    var index = _.indexOf(compTraits.models, function(t) { t.get('name') == iTrait.name; });
                                    var options = iTrait.get('options');

                                    if (options) {
                                        data.forEach(function(option) {
                                            options.push(option);
                                        });
                                    }

                                    iTrait.set('options', options);
                                    compTraits.where({ name: iTrait.name }).splice(index, 0, iTrait);
                                    self.set('traits', compTraits);
                                });
                        }

                        traits.push(trait);

                        if (!self.get(property.name)) {
                            datajson[property.name] = property.value;
                            self.set(property.name, property.value);
                        }
                    });
                }

                attrs['data-json'] = btoa(JSON.stringify(datajson));
                if (!attrs['data-view']) { attrs['data-view'] = ''; }

                self.set('attributes', attrs);
                editor.runCommand('set-properties', { component: self, traits: traits, disablePropertyTraits: true });

                if (!isPageMode) {
                    // Add Class
                    editor.runCommand('add-class', { component: self, classes: ['dynamic-block'] });
                }

                self.set('custom-name', 'Dynamic Block');

                // Listeners - Traits
                _.forEach(self.get('properties'), function(property) {
                    self.listenTo(self, 'change:' + property.name, function(component, value) {
                        attrs = component.get('attributes');

                        var datajson = JSON.parse(atob(attrs['data-json']));
                        datajson[property.name] = value.trim();

                        attrs['data-json'] = btoa(JSON.stringify(datajson));
                        component.set('attributes', attrs);
                        domComponents.render();
                    });
                });

                editor.runCommand('set-id-attribute', { component: self });
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'DYNABLOCK') {
                    return { type: 'dynablock' };
                }
            },
        }),

        view: defaultType.view
    });

    // SERVER BLOCKS
    domComponents.addType('serverblock', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                draggable: true,
                droppable: false,
                copyable: false,
                resizable: false,
                editable: false,
                removable: true
            }),
            init() {
                var self = this;
                self.set('custom-name', 'Server Block');
                editor.runCommand('set-properties', { component: self, traits: [] });
                editor.runCommand('set-id-attribute', { component: self });
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'SERVERBLOCK') {
                    return { type: 'serverblock' };
                }
            },
        }),

        view: defaultType.view
    });

    /*
     *   COMMANDS
     */

    /** Set ID and add CLASS based on CID  **/
    commands.add('set-id-attribute', {
        run: function(editor, sender, options) {
            var regex = /\b(c\d{2,})\b/g;
            var attrs = options.component.get('attributes');
            var oldId = attrs.id;

            if (!oldId || regex.test(oldId)) { attrs.id = options.component.cid; }
            options.component.set('attributes', attrs);

            // Add new class matching new ID
            var removeClasses = options.component.get('classes').models.filter(function(c) { return regex.test(c.get('name')); }).map(function(c) { return c.get('name'); });
            editor.runCommand('remove-class', { component: options.component, classes: removeClasses });
            editor.runCommand('add-class', { component: options.component, classes: [options.component.cid] });
        }
    });

    /** Set SRCSET **/
    commands.add('set-srcset', {
        run: function(editor, sender, options) {
            var attrs = options.component.get('attributes');
            var sizes = options.component.get('srcset_sizes');
            var src = options.component.get('src');

            if (sizes && src) {
                sizes = sizes.split(',');
                var srcset = [];
                var filename = src.split('/');
                filename = filename[filename.length - 1];

                _.forEach(sizes, function(s) {
                    var s = s.split(' ');
                    if (s.length == 2) {
                        var path = opt.mediaPath.resize.replace('{w}x{h}', s[0]);
                        srcset.push(path + filename + ' ' + s[1]);
                    }
                });

                attrs.srcset = srcset.join(',');
            } else {
                delete attrs.srcset;
            }

            options.component.set('attributes', attrs);
            domComponents.render();
        }
    });

    /** Set Properties **/
    commands.add('set-properties', {
        run: function(editor, sender, options) {
            var self = options.component;
            var stylable = options.stylables || self.get('stylable');
            var not_stylable = (stylable == false || stylable == []);

            // Check if is_stylable been set as attribute
            var is_stylable = options.component.get('is_stylable');
            if (typeof(is_stylable) != 'undefined' && is_stylable != null && !is_stylable) {
                stylable = [];
                not_stylable = true;
            }

            var disableTraits = options.component.get('disableTraits') || false;
            var traits = !disableTraits ? options.traits || [] : [];
            options.component.set('stylable', stylable);

            if (opt.user.isSuperUser) {
                if (traits.length > 0 && traits[traits.length - 1].type != 'divider') { traits.push(dividerTrait); }
                traits = traits.concat(propertyTraits);

                // Listener -- Change is stylable
                self.listenTo(self, 'change:is_stylable', function(component, value) {
                    component.set('stylable', value ? stylable : []);
                    editor.trigger('change:selectedComponent', editor, self);
                });

                // Listener -- Change disable traits
                self.listenTo(self, 'change:disableTraits', function(component, value) {
                    editor.runCommand('set-properties', options);
                    editor.trigger('change:selectedComponent', editor, self);
                });

                var is_stylable = self.get('is_stylable');
                if (typeof is_stylable === 'undefined') { self.set('is_stylable', !not_stylable); }
            }

            if ((!opt.user.isSuperUser && !disableTraits && options.allowDisablingTraits)) {
                self.set('traits', []);
            } else {
                self.set('traits', traits);
            }
        }
    });

    /** Add Remove Classes **/
    commands.add('add-class', {
        run: function(editor, sender, options) {
            var parentModel = options.component.sm;
            const sm = parentModel.get('SelectorManager');
            var componentClasses = options.component.get('classes');

            options.classes.forEach(function(cls) {
                var classModel = sm.add({ name: cls, label: cls });
                componentClasses.add(classModel);
            });

            parentModel.trigger('targetClassAdded');
        }
    });

    commands.add('remove-class', {
        run: function(editor, sender, options) {
            var parentModel = options.component.sm;
            const sm = parentModel.get('SelectorManager');
            var componentClasses = options.component.get('classes');
            var classesToRemove = options.classes || [];
            var removeAll = options.removeAll || false;
            var removeAllBut = options.removeAllBut || [];
            var regex = /\b(c\d{2,})\b/g;

            for (var i = componentClasses.length - 1; i >= 0; i--) {
                var cls = componentClasses.models[i];
                var removeThis = (classesToRemove.indexOf(cls.id) > -1) || ((removeAll || (removeAllBut.length > 0 && removeAllBut.indexOf(cls.id) == -1)) && !regex.test(cls.id));

                if (removeThis) {
                    componentClasses.remove(cls);
                }
            }
        }
    });

    /** Alignment **/
    commands.add('set-alignment', {
        run: function(editor, sender, options) {
            var alignClasses = [
                'd-block', 'd-inline-block', 'd-table', 'ml-0', 'ml-auto', 'mr-0', 'mr-auto', 'mx-auto'
            ];

            // Remove Old CLasses
            editor.runCommand('remove-class', { component: options.component, classes: alignClasses });

            // Add New Clasess
            if (options.align != '') {
                var newClasses = [];

                switch (options.component.get('type')) {
                    case 'link':
                        newClasses.push('d-table');
                        break;
                    case 'button':
                        newClasses.push('d-block');
                        break;
                }

                switch (options.align) {
                    case 'left':
                        newClasses.push('ml-0');
                        newClasses.push('mr-auto');
                        break;
                    case 'center':
                        newClasses.push('mx-auto');
                        break;
                    case 'right':
                        newClasses.push('mr-0');
                        newClasses.push('ml-auto');
                        break;
                }

                editor.runCommand('add-class', { component: options.component, classes: newClasses });
            }
        }
    });

    /** Set Button Style **/
    commands.add('set-button-style', {
        run: function(editor, sender, options) {
            var button = {
                size: options.component.get(buttonProperties.size),
                style: options.component.get(buttonProperties.style),
                chevron: options.component.get(buttonProperties.chevron),
                is_outline: options.component.get(buttonProperties.is_outline),
                is_block: options.component.get(buttonProperties.is_block),
                is_flat: options.component.get(buttonProperties.is_flat)
            };

            var buttonClasses = [
                'btn', 'btn-block', 'btn-link', 'btn-default', 'btn-flat',
                'btn-primary', 'btn-secondary', 'btn-success', 'btn-info', 'btn-warning', 'btn-error',
                'btn-green', 'btn-light-green', 'btn-dark-green', 'btn-lime', 'btn-white',
                'btn-cyan', 'btn-indigo', 'btn-purple', 'btn-deep-purple',
                'btn-yellow', 'btn-amber', 'btn-orange', 'btn-deep-orange',
                'btn-pink', 'btn-red', 'btn-brown', 'btn-blue-grey',
                'btn-holidays', 'btn-touring', 'btn-ownership',
                // Outlines
                'btn-outline-primary', 'btn-outline-holidays', 'btn-outline-touring', 'btn-outline-ownership',
                'btn-outline-white',
                // Sizes
                'btn-large', 'btn-small', 'btn-tiny',
                // Chevron
                'link-chevron-left', 'link-chevron-right'
            ];

            // Remove Old CLasses
            editor.runCommand('remove-class', { component: options.component, classes: buttonClasses });

            // Add Class
            var newClasses = [];

            if (button.style != '') {
                newClasses.push('btn');

                var styleClass = 'btn-';
                styleClass += (button.is_outline ? ((buttonClasses.indexOf('btn-outline-' + button.style) != -1) ? 'outline-' : '') : '') + button.style;
                newClasses.push(styleClass);

                if (button.size != '') { newClasses.push('btn-' + button.size); }
                if (button.is_block) { newClasses.push('btn-block'); }
                if (button.is_flat) { newClasses.push('btn-flat'); }
            }

            if (button.chevron != '') { newClasses.push(button.chevron); }
            if (newClasses != []) { editor.runCommand('add-class', { component: options.component, classes: newClasses }); }
        }
    });

    /*
     *   EVENTS
     */

    /* Selected Component Changed */
    editor.on('change:selectedComponent', function(ed, component) {
        console.log('Component Selected Changed', component);

        var isWrapper = component ? (component.get('wrapper') == 1) : false;
        var invalidComponent = (isWrapper || (!component && !editor.getSelected()));

        var stylable = component ? component.get('stylable') : false;
        var disableSM = invalidComponent || (stylable == false || stylable == []);
        console.log(component);
        var disableTM = invalidComponent || (component ? (component.get('traits').length == 0) : false);

        var smBtn = panels.getButton('views', 'open-sm');
        var tmBtn = panels.getButton('views', 'open-tm');

        smBtn.set('disable', disableSM);
        tmBtn.set('disable', disableTM);

        if ((disableSM && smBtn.get('active')) || (disableTM && tmBtn.get('active'))) {
            var lmBtn = panels.getButton('views', 'open-layers');
            lmBtn.set('active', true);
        }
    });

    /* Component Added */
    editor.on('component:add', function(component) {
        editor.runCommand('prevent-default');
        console.log('Component Add', component);
    });

    /* Padding Styles Updated */
    editor.on('component:styleUpdate:padding', function(property) {
        var component = editor.getSelected();
        var sm = component.sm.get('StyleManager');
        var padding = _.find(sm.getProperties('Dimension').models, function(prop) {
            return prop.get('name') == 'Padding';
        });

        switch (component.get('type')) {
            case 'container':
                var x = component.get('type') == 'container' ? '15px' : 0;

                if (padding.get('properties')) {
                    var paddingLeft = padding.get('properties').where({ property: 'padding-left' })[0];
                    paddingLeft.set('value', x);

                    var paddingRight = padding.get('properties').where({ property: 'padding-right' })[0];
                    paddingRight.set('value', x);
                }
                break;
        }
    });

    /* Margin Styles Updated */
    editor.on('component:styleUpdate:margin', function(property) {
        var component = editor.getSelected();
        var sm = component.sm.get('StyleManager');
        var margin = _.find(sm.getProperties('Dimension').models, function(prop) {
            return prop.get('name') == 'Margin';
        });

        switch (component.get('type')) {
            case 'container':
            case 'grid':
                var x = component.get('type') == 'container' ? 'auto' : 0;

                if (component.get('type') == 'grid') {
                    x = component.get('noGutter') ? 0 : '-0.5rem';
                }

                if (margin.get('properties')) {
                    var marginLeft = margin.get('properties').where({ property: 'margin-left' })[0];
                    marginLeft.set('value', x);

                    var marginRight = margin.get('properties').where({ property: 'margin-right' })[0];
                    marginRight.set('value', x);
                }
                break;
        }
    });
});