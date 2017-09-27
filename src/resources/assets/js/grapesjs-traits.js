/*export default*/
grapesjs.plugins.add('traits', (editor, options) => {

    var opt = options || {};
    var stylePrefix = editor.getConfig().stylePrefix;

    var panelManager = editor.Panels;
    var domComponents = editor.DomComponents;
    var commands = editor.Commands;

    var defaultType = domComponents.getType('default');
    var defaultModel = defaultType.model;
    var defaultView = defaultType.view;

    /**  **/
    var isPageMode = (opt.mode == 'page');
    var traits = [];

    /** Editable Properties **/
    var properties = [
        { 'name': 'stylable', 'label': 'Stylable', 'type': 'checkbox' },
        { 'name': 'draggable', 'label': 'Draggable', 'type': 'checkbox' },
        { 'name': 'droppable', 'label': 'Droppable', 'type': 'checkbox' },
        { 'name': 'copyable', 'label': 'Copyable', 'type': 'checkbox' },
        { 'name': 'resizable', 'label': 'Resizable', 'type': 'checkbox' },
        { 'name': 'editable', 'label': 'Editable', 'type': 'checkbox' },
        { 'name': 'removable', 'label': 'Removable', 'type': 'checkbox' },
    ];

    if (!isPageMode) {
        _.forEach(properties, function(property) {
            traits.push({
                type: property.type,
                label: property.label,
                name: property.name,
                changeProp: 1
            })
        });
    }

    /*
     *   METHODS
     */

    var fixStylableProperty = function() {
        editor.runCommand('fix-stylable-property', { node: editor.getSelected() });
    };

    /*
     *   TRAITS
     */

    /** TEXT ELEMENTS **/
    domComponents.addType('Heading', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                traits: traits
            }),
            init() {
                this.listenTo(this, 'change:stylable', fixStylableProperty);
            }
        }, {
            isComponent: function(el) {
                switch (el.tagName) {
                    case 'H1':
                    case 'H2':
                    case 'H3':
                    case 'H4':
                    case 'H5':
                    case 'H6':
                        return { type: 'Heading' };
                        break;
                }
            },
        }),

        view: defaultView,
    });

    domComponents.addType('Paragraph', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                traits: traits
            }),
            init() {
                this.listenTo(this, 'change:stylable', fixStylableProperty);
            }
        }, {
            isComponent: function(el) {
                switch (el.tagName) {
                    case 'P':
                        return { type: 'Paragraph' };
                        break;
                }
            },
        }),

        view: defaultView,
    });

    domComponents.addType('Text', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                traits: traits
            }),
            init() {
                this.listenTo(this, 'change:stylable', fixStylableProperty);
            }
        }, {
            isComponent: function(el) {
                switch (el.tagName) {
                    case 'SPAN':
                        return { type: 'Text' };
                        break;
                }
            },
        }),

        view: defaultView,
    });

    domComponents.addType('Link', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                traits: [{
                    type: 'text',
                    label: 'Href',
                    name: 'href',
                    placeholder: '#'
                }].concat(traits)
            }),
            init() {
                this.listenTo(this, 'change:stylable', fixStylableProperty);
            }
        }, {
            isComponent: function(el) {
                switch (el.tagName) {
                    case 'A':
                        return { type: 'Link' };
                        break;
                }
            },
        }),

        view: defaultView,
    });

    /** BUTTON ELEMENTS **/
    domComponents.addType('Button', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                traits: traits
            }),
            init() {
                this.listenTo(this, 'change:stylable', fixStylableProperty);
            }
        }, {
            isComponent: function(el) {
                switch (el.tagName) {
                    case 'BUTTON':
                        return { type: 'Button' };
                        break;
                }
            },
        }),

        view: defaultView,
    });

    /** IMAGE ELEMENTS **/
    domComponents.addType('Image', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                traits: traits
            }),
            init() {
                this.listenTo(this, 'change:stylable', fixStylableProperty);
            }
        }, {
            isComponent: function(el) {
                switch (el.tagName) {
                    case 'IMG':
                        return { type: 'Image' };
                        break;
                }
            },
        }),

        view: defaultView,
    });


    /** DIV ELEMENTS **/
    domComponents.addType('Div', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                traits: traits
            }),
            init() {
                this.listenTo(this, 'change:stylable', fixStylableProperty);
            }
        }, {
            isComponent: function(el) {
                switch (el.tagName) {
                    case 'DIV':
                        return { type: 'Div' };
                        break;
                }
            },
        }),

        view: defaultView,
    });

    domComponents.addType('Wrapper', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                traits: traits
            }),
            init() {
                this.listenTo(this, 'change:stylable', fixStylableProperty);
            }
        }, {
            isComponent: function(el) {
                if (el.className && el.className.indexOf('wrapper') != -1) {
                    return { type: 'Wrapper' };
                }
            },
        }),

        view: defaultView,
    });

    domComponents.addType('Container', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                traits: traits
            }),
            init() {
                this.listenTo(this, 'change:stylable', fixStylableProperty);
            }
        }, {
            isComponent: function(el) {
                if (el.className && el.className.indexOf('container') != -1) {
                    return { type: 'Container' };
                }
            },
        }),

        view: defaultView,
    });

    domComponents.addType('Fluid Container', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                traits: traits
            }),
            init() {
                this.listenTo(this, 'change:stylable', fixStylableProperty);
            }
        }, {
            isComponent: function(el) {
                if (el.className && el.className.indexOf('container-fluid') != -1) {
                    return { type: 'Fluid Container' };
                }
            },
        }),

        view: defaultView,
    });

    domComponents.addType('Grid', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                traits: traits
            }),
            init() {
                this.listenTo(this, 'change:stylable', fixStylableProperty);
            }
        }, {
            isComponent: function(el) {
                if (el.className && el.className.indexOf('grid') != -1) {
                    return { type: 'Grid' };
                }
            },
        }),

        view: defaultView,
    });

    domComponents.addType('Column', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                traits: traits
            }),
            init() {
                this.listenTo(this, 'change:stylable', fixStylableProperty);
            }
        }, {
            isComponent: function(el) {
                if (el.className && el.className.indexOf('col') != -1) {
                    return { type: 'Column' };
                }
            },
        }),

        view: defaultView,
    });

    /** BACKGROUND IMAGES **/
    domComponents.addType('Background Image', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                traits: traits
            }),
            init() {
                this.listenTo(this, 'change:stylable', fixStylableProperty);
            }
        }, {
            isComponent: function(el) {
                if (el.className && el.className.indexOf('background-image') != -1) {
                    return { type: 'Background Image' };
                }
            },
        }),

        view: defaultView,
    });

    /*
     *   COMMANDS
     */

    commands.add('remove-id-attribute', {
        run: function(editor, sender, options) {

            if (options.node.attributes.attributes['id'].match('/{c\d{3})\w+/')) {
                delete options.node.attributes.attributes['id'];
            }

            if (options.node.view) {
                _.forEach(options.node.view.components.models, function(model) {
                    editor.runCommand('remove-id-attribute', { node: model });
                });
            }

            editor.refresh();
        }
    });

    commands.add('set-default-properties', {
        run: function(editor, sender, options) {
            if (!options) {
                var wrapperChildren = domComponents.getComponents();

                _.forEach(wrapperChildren.models, function(wrapperChild) {
                    editor.runCommand('set-default-properties', { node: wrapperChild });
                });
            } else {
                options.node.attributes.stylable = [];
                options.node.attributes.draggable = false;
                options.node.attributes.droppable = false;
                options.node.attributes.copyable = false;
                options.node.attributes.resizable = false;
                options.node.attributes.editable = false;
                options.node.attributes.removable = false;

                if (options.node.view) {
                    _.forEach(options.node.view.components.models, function(model) {
                        editor.runCommand('set-default-properties', { node: model });
                    });
                }

                editor.refresh();
            }
        }
    });

    commands.add('fix-stylable-property', {
        run: function(editor, sender, options) {
            if (!options) {
                var wrapperChildren = domComponents.getComponents();

                _.forEach(wrapperChildren.models, function(wrapperChild) {
                    editor.runCommand('fix-stylable-property', { node: wrapperChild });
                });
            } else {
                if (options.node.attributes.stylable == false) {
                    options.node.attributes.stylable = [];
                }

                if (options.node.view) {
                    _.forEach(options.node.view.components.models, function(model) {
                        editor.runCommand('fix-stylable-property', { node: model });
                    });
                }

                editor.refresh();
            }
        }
    });

    /*
     *   EVENTS
     */

    editor.on('load', function() {
        var openTmBtn = panelManager.getButton('views', 'open-tm');
        openTmBtn && openTmBtn.set('active', 1);

        var stylesPanel = $('#gjs-sm-sectors');

        /** Settings **/
        var settingsPanel = $('<div id="gjs-pn-settings" class="gjs-sm-sector no-select">' +
            '<div class="gjs-sm-title"><span class="icon-settings fa fa-cog"></span> Settings</div>' +
            '<div class="gjs-sm-properties"></div>' +
            '</div>');

        var settingsProps = settingsPanel.find('.gjs-sm-properties');
        settingsProps.append($('.gjs-trt-traits'));

        settingsPanel.find('.gjs-sm-title').on('click', function() {
            settingsProps.toggle();
        });

        stylesPanel.before(settingsPanel);

        var openBmBtn = panelManager.getButton('views', 'open-blocks');
        openBmBtn && openBmBtn.set('active', 1);

        console.log(traits);
    });

    editor.on('change:selectedComponent', function() {
        var component = editor.getSelected();

        if (component && !component.attributes.wrapper) {
            if ($('#gjs-pn-settings').find('.gjs-trt-traits').html() != '') {
                $('#gjs-pn-settings').removeClass('hidden');
            } else if (!$('#gjs-pn-settings').hasClass('hidden')) {
                $('#gjs-pn-settings').addClass('hidden');
            }
        } else {
            if (!$('#gjs-pn-settings').hasClass('hidden')) {
                $('#gjs-pn-settings').addClass('hidden');
            }
        }
    });

});