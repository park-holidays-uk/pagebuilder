/*export default*/
grapesjs.plugins.add('components', (editor, options) => {

    /*
     *   VARIABLES
     */
    var stylePrefix = editor.getConfig().stylePrefix;

    // Managers
    var domComponents = editor.DomComponents;
    var commands = editor.Commands;
    var panels = editor.Panels;

    // Defaults
    var defaultType = domComponents.getType('default');
    var defaultModel = defaultType.model;
    var defaultView = defaultType.view;

    // Parameters
    var isPageMode = (options.record.type == 'page');

    /*
     *   COMPONENTS
     */

    // Wrapper
    domComponents.addType('wrapper', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                stylable: [],
                draggable: false,
                droppable: ['.container', '.fluid-container', '.dynamic-block'],
                copyable: false,
                resizable: false,
                editable: false,
                removable: false,
                traits: []
            })
        }, {
            isComponent: function(el) {
                if (el.tagName == 'DIV' && el.className == 'wrapper') {
                    return { type: 'wrapper' };
                }
            },
        }),

        view: defaultView
    });

    // Container
    domComponents.addType('container', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                stylable: [],
                draggable: ['.wrapper'],
                // droppable: true,
                copyable: true,
                resizable: false,
                editable: false,
                removable: true,
                traits: [{
                    type: 'checkbox',
                    name: 'fluid',
                    label: 'Fluid',
                    changeProp: 1
                }]
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

                // Listener -- Change container class between Fluid and Non-fluid
                self.listenTo(self, 'change:fluid', function(component, value) {
                    var parentModel = this.sm;
                    const sm = parentModel.get('SelectorManager');
                    var compClasses = component.get('classes');

                    var prevClass = value ? classes.normal : classes.fluid;
                    var newClass = value ? classes.fluid : classes.normal;

                    compClasses.forEach(element => {
                        if (element.id == prevClass) {
                            compClasses.remove(element);
                        }
                    });

                    var classModel = sm.add({ name: newClass, label: newClass });
                    compClasses.add(classModel);
                    parentModel.trigger('targetClassAdded');
                });
            }
        }, {
            isComponent: function(el) {
                if (el.tagName == 'DIV' && (el.className == 'container' || el.className.indexOf('container ') != -1 || el.className == 'fluid-container' || el.className.indexOf('fluid-container ') != -1)) {
                    return { type: 'container' };
                }
            },
        }),

        view: defaultView
    });

    // Grid
    domComponents.addType('grid', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                stylable: [],
                // draggable: false,
                droppable: ['.' + stylePrefix + 'grd-cl'],
                // copyable: false,
                resizable: false,
                editable: false,
                // removable: false,

            })
        }, {
            isComponent: function(el) {
                if (el.tagName == 'DIV' && (el.className == 'grid' || el.className.indexOf('grid ') != -1 || el.className.indexOf('grid-') != -1)) {
                    return { type: 'grid' };
                }
            },
        }),

        view: defaultView.extend({
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
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                stylable: [],
                draggable: ['.' + stylePrefix + 'grd'],
                // droppable: true,
                // copyable: false,
                resizable: false,
                editable: false,
                // removable: false,

            })
        }, {
            isComponent: function(el) {
                if (el.tagName == 'DIV' && (el.className == 'col' || el.className.indexOf('col ') != -1 || el.className.indexOf('col-') != -1)) {
                    return { type: 'column' };
                }
            },
        }),

        view: defaultView.extend({
            // The render() should return 'this'
            render: function() {
                // Extend the original render method
                defaultType.view.prototype.render.apply(this, arguments);
                this.el.classList.add(stylePrefix + 'grd-cl');
                return this;
            },
        })
    });


    // DYNAMIC BLOCKS
    domComponents.addType('dynamic block', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                stylable: [],
                // draggable: false,
                droppable: false,
                copyable: false,
                resizable: false,
                editable: false,
                // removable: false,

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
                            value: property.value,
                            changeProp: 1
                        };

                        traits.push(trait);

                        datajson[property.property] = property.value;
                        self.set(property.property.replace('_', ''), property.value);
                    });

                    attrs['data-json'] = btoa(JSON.stringify(datajson));
                } else {
                    self.set('properties', {});
                }

                if (!attrs['data-view']) { attrs['data-view'] = ''; }

                self.set('attributes', attrs);
                self.set('traits', traits);

                if (!isPageMode) {
                    // Add Class
                    var parentModel = self.sm;
                    const sm = parentModel.get('SelectorManager');
                    var compClasses = self.get('classes');

                    var classModel = sm.add({ name: 'dynamic-block', label: 'dynamic-block' });
                    compClasses.add(classModel);
                    parentModel.trigger('targetClassAdded');
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

        view: defaultView.extend({
            // The render() should return 'this'
            render: function() {
                // Extend the original render method
                defaultType.view.prototype.render.apply(this, arguments);
                return this;
            },
        })
    });

    // SERVER BLOCKS
    domComponents.addType('server block', {
        model: defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
                stylable: [],
                // draggable: false,
                droppable: false,
                copyable: false,
                resizable: false,
                editable: false,
                // removable: false,

            })
        }, {
            isComponent: function(el) {
                if (el.tagName == 'SERVERBLOCK') {
                    return { type: 'server block' };
                }
            },
        }),

        view: defaultView
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

        var isWrapper = component ? (component.get('wrapper') == 1 || component.get('type') == 'wrapper') : false;
        var disableSM = component ? (component.get('stylable')) : false;
        var disableTM = component ? (component.get('traits').length == 0) : false;
        var invalidComponent = (isWrapper || !component);

        var smBtn = panels.getButton('views', 'open-sm');
        var tmBtn = panels.getButton('views', 'open-tm');

        smBtn.set('disable', invalidComponent || disableSM);
        tmBtn.set('disable', invalidComponent || disableTM);

        if ((invalidComponent || disableSM || disableTM) && (smBtn.get('active') || tmBtn.get('active'))) {
            var lmBtn = panels.getButton('views', 'open-layers');
            lmBtn.set('active', true);
        }
    });
});