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
                // placeholder: property.placeholder || '',
                // options: property.options || [],
                changeProp: 1
            })
        });
    }

    /*
     *   TRAITS
     */
    var componentTypes = [
        /* TAGS */
        { 'name': 'heading', 'is': 'tagName', 'value': ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'] },
        { 'name': 'paragraph', 'is': 'tagName', 'value': ['P'] },
        { 'name': 'text', 'is': 'tagName', 'value': ['SPAN'] },
        {
            'name': 'link',
            'is': 'tagName',
            'value': ['A'],
            'traits': [{
                type: 'text',
                label: 'Href',
                name: 'href',
                placeholder: '#'
            }]
        },
        { 'name': 'button', 'is': 'tagName', 'value': ['BUTTON'] },
        { 'name': 'image', 'is': 'tagName', 'value': ['IMG'] },
        { 'name': 'div', 'is': 'tagName', 'value': ['DIV'] },
        /* DYNAMIC BLOCKS */
        { 'name': 'dynamic block', 'is': 'tagName', 'value': ['DYNABLOCK'] },
        /* CLASSES */
        { 'name': 'wrapper', 'is': 'className', 'value': 'wrapper' },
        { 'name': 'container', 'is': 'className', 'value': 'container' },
        { 'name': 'fluid container', 'is': 'className', 'value': 'container-fluid' },
        { 'name': 'grid', 'is': 'className', 'value': 'grid' },
        { 'name': 'column', 'is': 'className', 'value': 'col' },
        { 'name': 'background image', 'is': 'className', 'value': 'background-image' },
    ];

    _.forEach(componentTypes, function(componentType) {

        domComponents.addType(componentType.name, {
            model: defaultModel.extend({
                defaults: Object.assign({}, defaultModel.prototype.defaults, {
                    // traits: componentType.traits ? componentType.traits.concat(traits) : traits
                }),

                init() {
                    var self = this;

                    // var trait = this.get('traits').where({ name: 'stylable' })[0];
                    // if (trait.get('value') == '') { trait.set('value', false); }
                    // if (this.attributes.stylable == 'false' || (Array.isArray(this.attributes.stylable) && this.attributes.stylable.length == 0) || trait.get('value') == '') { trait.set('value', false); }

                    // console.log(trait);
                    // Listeners
                    // console.log(this, this.get('traits'));

                    var myTraits = this.get('traits');
                    myTraits.push(componentType.traits ? componentType.traits.concat(traits) : traits);

                    this.set('traits', myTraits);

                    self.listenTo(this, 'change:status', function() {
                        if (_.indexOf(['heading', 'paragraph', 'text', 'link'], self.attributes.type) > -1) {
                            if (self.attributes.status == '') {
                                self.view.el.setAttribute('contenteditable', false);
                            } else if (self.attributes.status == 'selected') {
                                // Selected
                            } else {
                                // Other State
                            }
                        }
                    });

                    self.listenTo(this, 'change:stylable', function() {
                        self.property = 'stylable';
                        self.fixProperty();
                    });
                },

                fixProperty() {
                    // var trait = this.get('traits').where({ name: this.property })[0];

                    if (this.property == 'stylable') {
                        editor.runCommand('fix-stylable-property', { node: this, thisNodeOnly: true });
                    }
                }
            }, {
                isComponent: function(el) {
                    switch (componentType.is) {
                        case 'tagName':
                            if (_.indexOf(componentType.value, el[componentType.is]) != -1) {
                                return { type: componentType.name };
                            }
                            break;
                        case 'className':
                            if (el[componentType.is] && el[componentType.is].indexOf(componentType.value) != -1) {
                                return { type: componentType.name };
                            }
                            break;
                    }
                },
            }),

            view: defaultView.extend({
                events: {
                    'dblclick': 'doubleClicked'
                },

                doubleClicked(e) {
                    if (_.indexOf(['heading', 'paragraph', 'text', 'link'], this.model.attributes.type) > -1) {
                        var component = editor.getSelected();
                        if (component.attributes.editable) {
                            component.view.el.setAttribute('contenteditable', true);
                        }
                    }
                },
            }),
        });

    });

    /*
     *   COMMANDS
     */

    commands.add('remove-id-attribute', {
        run: function(editor, sender, options) {

            if (options.node.attributes.attributes['id'] && options.node.attributes.attributes['id'].match('/(c\d{3})\w+/')) {
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

                if (options.node.view && !options.thisNodeOnly) {
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

    // ONLOAD
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
    });

    // SELECTION CHANGE
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