/*export default*/
grapesjs.plugins.add('components', (editor, options) => {

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

    // Parameters
    var isPageMode = (options.record.type == 'page');

    // Sharred Proeprties
    var buttonProperties = {
        size: 'button_size',
        style: 'button_style',
        is_outline: 'button_outline',
        is_block: 'button_block',
        is_flat: 'button_flat'
    }

    // Shared Traits
    var dividerTrait = [{ type: 'divider' }];

    var propertyTraits = [{
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
            { name: 'Holidays', value: 'holidays' },
            { name: 'Touring', value: 'touring' },
            { name: 'Ownership', value: 'ownership' },
            { name: 'Primary', value: 'primary' },
            { name: 'secondary', value: 'secondary' },
            { name: 'Success', value: 'success' },
            { name: 'Info', value: 'info' },
            { name: 'Warning', value: 'warning' },
            { name: 'Error', value: 'error' },
            { name: 'Green', value: 'green' },
            { name: 'Light Green', value: 'light-green' },
            { name: 'Dark Green', value: 'dark-green' },
            { name: 'Lime', value: 'lime' },
            { name: 'Yellow', value: 'yellow' },
            { name: 'Amber', value: 'amber' },
            { name: 'Orange', value: 'orange' },
            { name: 'Deep Orange', value: 'deep-orange' },
            { name: 'Red', value: 'red' },
            { name: 'Pink', value: 'pink' },
            { name: 'Purple', value: 'purple' },
            { name: 'Deep Purple', value: 'deep-purple' },
            { name: 'Indigo', value: 'indigo' },
            { name: 'Cyan', value: 'cyan' },
            { name: 'Brown', value: 'brown' },
            { name: 'Blue Grey', value: 'blue-grey' }
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

    var standardComponentTypes = [
        { 'name': 'div', tagNames: ['DIV'] },
        { 'name': 'section', tagNames: ['SECTION'] },
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

                    // Run Commands
                    if (!isPageMode) {
                        editor.runCommand('set-id-attribute', { component: self });
                    }

                    editor.runCommand('set-properties', { component: self });

                    // Listener -- Change container class between Fluid and Non-fluid
                    self.listenTo(self, 'change:fluid', function(component, value) {
                        var prevClass = value ? classes.normal : classes.fluid;
                        var newClass = value ? classes.fluid : classes.normal;

                        editor.runCommand('remove-class', { component: self, classes: [prevClass] });
                        editor.runCommand('add-class', { component: self, classes: [newClass] });
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
                editable: true,
                traits: []
            }),
            init() {
                // Initialise code
                var self = this;
                var stylables = ['color', 'text-align', 'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'];

                editor.runCommand('set-properties', { component: self, stylables: stylables });

                // Run Commands
                if (!isPageMode) {
                    editor.runCommand('set-id-attribute', { component: self });
                }
            }
        }, {
            isComponent: function(el) {
                var regex = /\b(SPAN|P|H|SMALL|CINE\d{1})\b/g;
                if (regex.test(el.tagName)) {
                    return { type: 'text' };
                }
            },
        }),

        view: textType.view
    });


    // Container
    domComponents.addType('container', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                draggable: ['#wrapper'],
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
                var isFluid = _.includes(self.config.classes, classes.fluid);
                self.set('fluid', isFluid);

                var traits = marginTraits.concat([{
                    type: 'checkbox',
                    name: 'fluid',
                    label: 'Fluid',
                    changeProp: 1
                }]);

                // Run Commands
                if (!isPageMode) {
                    editor.runCommand('set-id-attribute', { component: self });
                }

                editor.runCommand('set-properties', { component: self, traits: traits, allowDisablingTraits: true });

                // Listener -- Change container class between Fluid and Non-fluid
                self.listenTo(self, 'change:fluid', function(component, value) {
                    var prevClass = value ? classes.normal : classes.fluid;
                    var newClass = value ? classes.fluid : classes.normal;

                    editor.runCommand('remove-class', { component: self, classes: [prevClass] });
                    editor.runCommand('add-class', { component: self, classes: [newClass] });
                });

                // Listener -- Margins
                self.listenTo(self, 'change:margin_top_class', function(component, value) {
                    editor.runCommand('set-margin', { component: self, margin: 'top', class: value });
                });

                // Listener -- Margins
                self.listenTo(self, 'change:margin_bottom_class', function(component, value) {
                    editor.runCommand('set-margin', { component: self, margin: 'bottom', class: value });
                });
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
                stylable: [],
                droppable: ['.' + stylePrefix + 'grd-cl'],
                resizable: false,
                editable: true,
            }),
            init() {
                // Initialise code
                var self = this;

                // Run Commands
                if (!isPageMode) {
                    editor.runCommand('set-id-attribute', { component: self });
                }

                editor.runCommand('set-properties', { component: self, traits: marginTraits, allowDisablingTraits: true });

                // Listener -- Margins
                self.listenTo(self, 'change:margin_top_class', function(component, value) {
                    editor.runCommand('set-margin', { component: self, margin: 'top', class: value });
                });

                // Listener -- Margins
                self.listenTo(self, 'change:margin_bottom_class', function(component, value) {
                    editor.runCommand('set-margin', { component: self, margin: 'bottom', class: value });
                });
            }
        }, {
            isComponent: function(el) {
                var regex = /\b(grid)([-]\d{1,2})?(([_]([a-z]{2})[-]\d{1,2}){1,3})?\b/g;
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
                this.el.classList.add(stylePrefix + 'grd');
                return this;
            },
        })
    });

    // COLUMN
    domComponents.addType('column', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                draggable: ['.' + stylePrefix + 'grd'],
                resizable: false,
                editable: false,
            }),
            init() {
                var self = this;
                editor.runCommand('set-properties', { component: self, traits: [] });

                // Run Commands
                if (!isPageMode) {
                    editor.runCommand('set-id-attribute', { component: self });
                }
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
                this.el.classList.add(stylePrefix + 'grd-cl');
                return this;
            },
        })
    });

    // Link
    domComponents.addType('link', {
        model: linkType.model.extend({
            defaults: Object.assign({}, linkType.model.prototype.defaults, {
                stylable: []
            }),
            init() {
                // Initialise code
                var self = this;
                var traits = self.get('traits').models;
                self.set('stylable', self.get('is_stylable') ? true : []);

                traits.concat(dividerTrait)
                    .concat(alignmentTraits)
                    .concat(dividerTrait)
                    .concat(buttonStyleTraits);

                editor.runCommand('set-properties', { component: self, traits: traits });

                // Run Commands
                if (!isPageMode) {
                    editor.runCommand('set-id-attribute', { component: self });
                }

                // Button Styles
                var buttonSize = self.get(buttonProperties.size);
                var buttonStyle = self.get(buttonProperties.style);
                var buttonOutline = self.get(buttonProperties.is_outline);
                var buttonBlock = self.get(buttonProperties.is_block);
                var buttonFlat = self.get(buttonProperties.is_flat);

                if (!buttonSize) { self.set(buttonProperties.size, ''); }
                if (!buttonStyle) { self.set(buttonProperties.style, ''); }
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

    // Image
    domComponents.addType('image', {
        model: imageType.model.extend({
            defaults: Object.assign({}, imageType.model.prototype.defaults, {
                stylable: [],
                editable: true
            }),
            init() {
                // Initialise code
                var self = this;

                editor.runCommand('set-properties', { component: self, traits: [self.get('traits').models[0]] });

                // Run Commands
                if (!isPageMode) {
                    editor.runCommand('set-id-attribute', { component: self });
                }
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
                var buttonOutline = self.get(buttonProperties.is_outline);
                var buttonBlock = self.get(buttonProperties.is_block);
                var buttonFlat = self.get(buttonProperties.is_flat);

                if (!buttonSize) { self.set(buttonProperties.size, ''); }
                if (!buttonStyle) { self.set(buttonProperties.style, 'default'); }
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
                    .concat(dividerTrait)
                    .concat(alignmentTraits)
                    .concat(dividerTrait)
                    .concat(buttonStyleTraits);

                editor.runCommand('set-button-style', { component: self });
                editor.runCommand('set-properties', { component: self, traits: traits });
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
                traits: [{
                    type: 'select',
                    name: 'type',
                    label: 'Type',
                    options: [
                        { name: 'Colour', value: 'color' },
                        { name: 'Date', value: 'date' },
                        { name: 'Date Time', value: 'datetime-local' },
                        { name: 'Email Address', value: 'email' },
                        { name: 'Month', value: 'month' },
                        { name: 'Number', value: 'number' },
                        { name: 'Range', value: 'range' },
                        { name: 'Search', value: 'search' },
                        { name: 'Telephone', value: 'tel' },
                        { name: 'Text', value: 'text' },
                        { name: 'Time', value: 'time' },
                        { name: 'URL', value: 'url' },
                        { name: 'Week', value: 'week' },
                    ]
                }, {
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    placeholder: 'Enter field name..'
                }, {
                    type: 'text',
                    name: 'placeholder',
                    label: 'Placeholder',
                    placeholder: 'Enter placeholder text..'
                }, {
                    type: 'text',
                    name: 'value',
                    label: 'Value',
                    placeholder: 'Enter a default value..'
                }, {
                    type: 'checkbox',
                    name: 'required',
                    label: 'Required'
                }]
            }),
            init() {
                // Initialise code
                var self = this;
                var attrs = self.get('attributes');

                if (!attrs.type) {
                    attrs.type = 'text';
                }

                self.set('attributes', attrs);
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'INPUT' && el.type != 'checkbox' && el.type != 'radio') {
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

    // Input Box
    domComponents.addType('checkbox', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                traits: [{
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    placeholder: 'Enter field name..'
                }, {
                    type: 'text',
                    name: 'value',
                    label: 'Value',
                    placeholder: 'Enter the value..'
                }, {
                    type: 'checkbox',
                    name: 'required',
                    label: 'Required'
                }]
            })
        }, {
            isComponent: function(el) {
                if (el.tagName == 'INPUT' && el.type == 'checkbox') {
                    return { type: 'checkbox' };
                }
            },
        }),

        view: defaultType.view
    });

    // Radio Button
    domComponents.addType('radio button', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                traits: [{
                    type: 'text',
                    name: 'name',
                    label: 'Name',
                    placeholder: 'Enter field name..'
                }, {
                    type: 'text',
                    name: 'value',
                    label: 'Value',
                    placeholder: 'Enter the value..'
                }, {
                    type: 'checkbox',
                    name: 'required',
                    label: 'Required'
                }]
            })
        }, {
            isComponent: function(el) {
                if (el.tagName == 'INPUT' && el.type == 'radio') {
                    return { type: 'radio button' };
                }
            },
        }),

        view: defaultType.view
    });


    // DYNAMIC BLOCKS
    domComponents.addType('dynamic block', {
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
                var traits = !isPageMode ? [{
                    type: 'text',
                    name: 'data-view',
                    label: 'View',
                    placeholder: 'Enter view name'
                }] : [];

                var datajson = {};

                if (attrs['properties']) {
                    if (traits != []) { traits = traits.concat(dividerTrait); }
                    // Take payload-properties and add to gjs_components
                    var properties = JSON.parse(atob(attrs['properties']));
                    self.set('properties', properties);
                    delete attrs['properties'];

                    // Create Dynamic Traits from Payload Properties
                    _.forEach(properties, function(property) {
                        var trait = {
                            type: property.type,
                            label: property.property.replace('_', ' '),
                            name: property.property.replace('_', ''),
                            options: property.options || [],
                            value: property.value,
                            multiple: property.multiple || false,
                            changeProp: 1
                        };

                        trait.options = [{ text: 'Please select ', value: '', disabled: true }].concat(trait.options);

                        // Ajax Load Options
                        // if (property.dynamic_options) {
                        //     /* Load Options */
                        //     $.ajax({
                        //             type: 'POST',
                        //             url: opt.url_prefix + '/ajax/get/trait/options',
                        //             dataType: 'json',
                        //             data: {
                        //                 connection: property.options_conenction,
                        //                 table: property.options_table,
                        //                 text_field: property.options_text_field,
                        //                 value_field: property.options_value_field
                        //             },
                        //         })
                        //         .done(function(data) {
                        //             var options = options = data;

                        //             options.forEach(function(option) {
                        //                 trait.options.push(option);
                        //             });

                        //             traits.push(trait);

                        //             datajson[property.property] = property.value;
                        //             self.set(property.property.replace('_', ''), property.value);
                        //             attrs['data-json'] = btoa(JSON.stringify(datajson));

                        //             if (!attrs['data-view']) { attrs['data-view'] = ''; }
                        //             self.set('attributes', attrs);

                        //             editor.runCommand('set-properties', { component: self, traits: traits, disablePropertyTraits: true });
                        //         });
                        // } else {
                        //     traits.push(trait);
                        // }

                        traits.push(trait);
                        datajson[property.property] = property.value;
                        self.set(property.property.replace('_', ''), property.value);
                    });


                } else {
                    self.set('properties', {});
                }

                attrs['data-json'] = btoa(JSON.stringify(datajson));
                if (!attrs['data-view']) { attrs['data-view'] = ''; }

                self.set('attributes', attrs);
                editor.runCommand('set-properties', { component: self, traits: traits, disablePropertyTraits: true });

                if (!isPageMode) {
                    // Add Class
                    editor.runCommand('add-class', { component: self, classes: ['dynamic-block'] });
                }

                // Listeners - Traits
                _.forEach(self.get('properties'), function(property) {
                    var name = property.property.replace('_', '');
                    self.listenTo(self, 'change:' + name, function() {
                        attrs = self.get('attributes');

                        var datajson = JSON.parse(atob(attrs['data-json']));
                        datajson[property.property] = self.get(name);

                        attrs['data-json'] = btoa(JSON.stringify(datajson));
                        self.set('attributes', attrs);
                    });
                });

            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'DYNABLOCK') {
                    return { type: 'dynamic block' };
                }
            },
        }),

        view: defaultType.view
    });

    // SERVER BLOCKS
    domComponents.addType('server block', {
        model: defaultType.model.extend({
            defaults: Object.assign({}, defaultType.model.prototype.defaults, {
                stylable: [],
                draggable: false,
                droppable: false,
                copyable: false,
                resizable: false,
                editable: false,
                removable: true,

            }),
            icon() {
                editor.runCommand('set-properties', { component: self });
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'SERVERBLOCK') {
                    return { type: 'server block' };
                }
            },
        }),

        view: defaultType.view
    });

    /*
     *   COMMANDS
     */

    /** Add Remove Classes **/
    commands.add('set-id-attribute', {
        run: function(editor, sender, options) {
            var regex = /\b(c\d{1,})\b/g;
            var attrs = options.component.get('attributes');
            var oldId = attrs.id;

            attrs.id = options.component.cid;
            if (oldId && !regex.test(oldId)) { attrs['data-old-id'] = oldId; }
            options.component.set('attributes', attrs);
        }
    });

    /** Set Properties **/
    commands.add('set-properties', {
        run: function(editor, sender, options) {
            var self = options.component;
            var stylable = self.get('stylable');
            var not_stylable = (stylable == false || stylable == []);

            var traits = options.traits || [];

            if (opt.user.isSuperUser && !options.disablePropertyTraits) {
                if (traits.length > 0) { traits = traits.concat(dividerTrait); }
                traits = traits.concat(propertyTraits);

                // Listener -- Change is stylable
                self.listenTo(self, 'change:is_stylable', function(component, value) {
                    component.set('stylable', (value ? (options.stylables ? options.stylables : true) : []));
                });

                var is_stylable = self.get('is_stylable');
                if (typeof is_stylable === 'undefined') { self.set('is_stylable', !not_stylable); }
            }

            if (!opt.user.isSuperUser && !self.get('editable') && options.allowDisablingTraits) {
                self.set('traits', []);
            } else {
                self.set('traits', traits);
            }

            console.log('Set Properties', self);
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

            for (var i = componentClasses.length - 1; i >= 0; i--) {
                var cls = componentClasses.models[i];
                if (options.classes.indexOf(cls.id) > -1) {
                    componentClasses.remove(cls);
                }
            }
        }
    });

    /** Margins **/
    commands.add('set-margin', {
        run: function(editor, sender, options) {
            var removeClasses = [];
            var topClasses = [
                'mt-auto', 'mt-0', 'mt-1', 'mt-2', 'mt-3', 'mt-4', 'mt-5'
            ];

            var bottomClasses = [
                'mb-auto', 'mb-0', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5'
            ];

            switch (options.margin) {
                case 'top':
                    removeClasses = topClasses;
                    break;
                case 'bottom':
                    removeClasses = bottomClasses;
                    break;
            }

            console.log(options.class);

            // Remove Old CLasses
            editor.runCommand('remove-class', { component: options.component, classes: removeClasses });

            // Add New Clasess
            if (options.class != '') {
                editor.runCommand('add-class', { component: options.component, classes: [options.class] });
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
                is_outline: options.component.get(buttonProperties.is_outline),
                is_block: options.component.get(buttonProperties.is_block),
                is_flat: options.component.get(buttonProperties.is_flat)
            };

            var buttonClasses = [
                'btn', 'btn-block', 'btn-link', 'btn-default', 'btn-flat',
                'btn-primary', 'btn-secondary', 'btn-success', 'btn-info', 'btn-warning', 'btn-error',
                'btn-green', 'btn-light-green', 'btn-dark-green', 'btn-lime',
                'btn-cyan', 'btn-indigo', 'btn-purple', 'btn-deep-purple',
                'btn-yellow', 'btn-amber', 'btn-orange', 'btn-deep-orange',
                'btn-pink', 'btn-red', 'btn-brown', 'btn-blue-grey',
                'btn-holidays', 'btn-touring', 'btn-ownership',
                // Outlines
                'btn-outline-primary', 'btn-outline-holidays', 'btn-outline-touring', 'btn-outline-ownership',
                // Sizes
                'btn-large', 'btn-small', 'btn-tiny'
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

                editor.runCommand('add-class', { component: options.component, classes: newClasses });
            }
        }
    });

    /*
     *   EVENTS
     */

    /* Component Added */
    editor.on('component:add', function(component) {
        editor.runCommand('prevent-default');
        console.log('Component Add', component);
    });

    /* Selected Component Changed */
    editor.on('change:selectedComponent', function(ed, component) {
        console.log('Component Selected Changed', component);

        if (!options.user.isSuperUser) {
            var stylable = component ? component.get('stylable') : false;;
            var isWrapper = component ? (component.get('wrapper') == 1) : false;
            var disableSM = (stylable == false || stylable == []);
            var disableTM = component ? (component.get('traits').length == 0) : false;
            var invalidComponent = (isWrapper || !(component || editor.getSelected()));

            var smBtn = panels.getButton('views', 'open-sm');
            var tmBtn = panels.getButton('views', 'open-tm');

            smBtn.set('disable', invalidComponent || disableSM);
            tmBtn.set('disable', invalidComponent || disableTM);

            if (invalidComponent || (disableSM && smBtn.get('active')) || (disableTM && tmBtn.get('active'))) {
                var lmBtn = panels.getButton('views', 'open-layers');
                lmBtn.set('active', true);
            }
        }
    });
});