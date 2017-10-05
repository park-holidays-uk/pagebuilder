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
        {
            'name': 'dynamic block',
            'is': 'tagName',
            'value': ['DYNABLOCK']
        },
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
                init() {
                    var self = this;
                    var _traits = ((self.get('type') == 'dynamic block')) ? [] : (componentType.traits ? componentType.traits.concat(traits) : traits);
                    var attrs = self.get('attributes');
                    var datajson = {};

                    if (self.get('type') == 'dynamic block') {
                        var props = JSON.parse(atob(attrs['properties']));
                        self.set('properties', props);
                        delete attrs['properties'];

                        _.forEach(props, function(prop) {
                            _traits.push({
                                type: prop.type,
                                label: prop.property.replace('_', ' '),
                                name: prop.property.replace('_', ''),
                                changeProp: 1
                            });

                            datajson[prop.property] = '';
                            self.set(prop.property.replace('_', ''), '');
                        });

                        attrs['data-json'] = btoa(JSON.stringify(datajson));
                        self.set('attributes', attrs);
                    }

                    this.set('traits', _traits);

                    // Listeners
                    self.listenTo(this, 'change:status', function() {
                        if (self.get('status') == '') {
                            if (_.indexOf(['heading', 'paragraph', 'text', 'link'], self.get('type')) > -1) {
                                self.view.el.setAttribute('contenteditable', false);
                            }
                        } else if (self.get('status') == 'selected') {

                        }
                    });

                    self.listenTo(this, 'change:stylable', function() {
                        self.property = 'stylable';
                        self.fixProperty();
                    });

                    if (self.get('type') == 'dynamic block') {
                        _.forEach(self.get('properties'), function(prop) {
                            var name = prop.property.replace('_', '');
                            self.listenTo(self, 'change:' + name, function() {
                                attrs = self.get('attributes');

                                var datajson = JSON.parse(atob(attrs['data-json']));
                                datajson[prop.property] = self.get(name);

                                attrs['data-json'] = btoa(JSON.stringify(datajson));
                                self.set('attributes', attrs);

                                console.log(self, attrs);
                            });
                        });
                    }
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
                var level = options.level || 0;

                options.node.set('stylable', []);
                options.node.set('draggable', (level == 0));
                options.node.set('droppable', false);
                options.node.set('copyable', false);
                options.node.set('resizable', false);
                options.node.set('editable', false);
                options.node.set('removable', (level == 0));

                if (options.node.view) {
                    level++;
                    _.forEach(options.node.view.components.models, function(model) {
                        editor.runCommand('set-default-properties', { node: model, level: level });
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
                if (options.node.get('stylable') == false) {
                    options.node.set('stylable', []);
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