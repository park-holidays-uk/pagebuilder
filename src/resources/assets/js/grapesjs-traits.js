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
        { 'name': 'stylable', 'label': 'Stylable', 'type': 'select', 'options': [{ value: 'true', name: 'True' }, { value: 'false', name: 'False' }] },
        { 'name': 'draggable', 'label': 'Draggable', 'type': 'select', 'options': [{ value: 'true', name: 'True' }, { value: 'false', name: 'False' }] },
        { 'name': 'droppable', 'label': 'Droppable', 'type': 'select', 'options': [{ value: 'true', name: 'True' }, { value: 'false', name: 'False' }] },
        { 'name': 'copyable', 'label': 'Copyable', 'type': 'select', 'options': [{ value: 'true', name: 'True' }, { value: 'false', name: 'False' }] },
        { 'name': 'resizable', 'label': 'Resizable', 'type': 'select', 'options': [{ value: 'true', name: 'True' }, { value: 'false', name: 'False' }] },
        { 'name': 'editable', 'label': 'Editable', 'type': 'select', 'options': [{ value: 'true', name: 'True' }, { value: 'false', name: 'False' }] },
        { 'name': 'removable', 'label': 'Removable', 'type': 'select', 'options': [{ value: 'true', name: 'True' }, { value: 'false', name: 'False' }] },
    ];

    if (!isPageMode) {
        _.forEach(properties, function(property) {
            traits.push({
                type: property.type,
                label: property.label,
                name: property.name,
                placeholder: property.placeholder || '',
                options: property.options || [],
                changeProp: 1
            })
        });
    }

    /*
     *   TRAITS
     */
    var componentTypes = [
        /* TAGS */
        { 'name': 'Heading', 'is': 'tagName', 'value': ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'] },
        { 'name': 'Paragraph', 'is': 'tagName', 'value': ['P'] },
        { 'name': 'Text', 'is': 'tagName', 'value': ['SPAN'] },
        {
            'name': 'Link',
            'is': 'tagName',
            'value': ['A'],
            'traits': [{
                type: 'text',
                label: 'Href',
                name: 'href',
                placeholder: '#'
            }]
        },
        { 'name': 'Button', 'is': 'tagName', 'value': ['BUTTON'] },
        { 'name': 'Image', 'is': 'tagName', 'value': ['IMG'] },
        { 'name': 'Div', 'is': 'tagName', 'value': ['DIV'] },
        /* CLASSES */
        { 'name': 'Wrapper', 'is': 'className', 'value': 'wrapper' },
        { 'name': 'Container', 'is': 'className', 'value': 'container' },
        { 'name': 'Fluid Container', 'is': 'className', 'value': 'container-fluid' },
        { 'name': 'Grid', 'is': 'className', 'value': 'grid' },
        { 'name': 'Column', 'is': 'className', 'value': 'col' },
        { 'name': 'Background Image', 'is': 'className', 'value': 'background-image' },
    ];

    _.forEach(componentTypes, function(componentType) {

        domComponents.addType(componentType.name, {
            model: defaultModel.extend({
                defaults: Object.assign({}, defaultModel.prototype.defaults, {
                    traits: componentType.traits ? componentType.traits.concat(traits) : traits
                }),

                init() {
                    var self = this;

                    var stylableTrait = this.get('traits').where({ name: 'stylable' })[0];
                    var value = stylableTrait.get('value');
                    stylableTrait.set('value', (value == '' || value == false || value == null) ? 'false' : 'true');

                    // Listeners
                    this.listenTo(this, 'change:stylable', function() {
                        self.property = 'stylable';
                        self.fixProperty();
                    });
                },

                fixProperty() {
                    var trait = this.get('traits').where({ name: this.property })[0];
                    if (trait.get('value') == 'true') { this.attributes[this.property] = true; }
                    if (trait.get('value') == 'false') { this.attributes[this.property] = false; }
                    console.log(trait);

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

            view: defaultView,
        });

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