/*export default*/
grapesjs.plugins.add('attribute-manager', (editor, options) => {

    var opt = options || {};
    var stylePrefix = editor.getConfig().stylePrefix;

    /**  **/
    var isPageMode = (opt.mode == 'page');

    var attributes = [
        // { 'name': 'custom-name', 'label': 'Custom Name', 'type': 'input', 'value': '', 'placeholder': 'e.g. Fluid Container' },
        { 'name': 'stylable', 'label': 'Stylable', 'type': 'select', 'options': ['false', 'true', 'background-image'], 'value': 'false', 'placeholder': 'e.g. true, false, background-image' },
        { 'name': 'draggable', 'label': 'Draggable', 'type': 'input', 'value': 'false', 'placeholder': 'e.g. true, false' },
        { 'name': 'droppable', 'label': 'Droppable', 'type': 'input', 'value': 'false', 'placeholder': 'e.g. true, false, .classname' },
        { 'name': 'copyable', 'label': 'Copyable', 'type': 'checkbox', 'value': false, 'placeholder': 'e.g. true, false' },
        { 'name': 'resizable', 'label': 'Resizable', 'type': 'checkbox', 'value': false, 'placeholder': 'e.g. true, false' },
        { 'name': 'editable', 'label': 'Editable', 'type': 'checkbox', 'value': false, 'placeholder': 'e.g. true, false' },
        { 'name': 'removable', 'label': 'Removable', 'type': 'checkbox', 'value': false, 'placeholder': 'e.g. true, false' },
    ]

    /*
     *   COMMANDS
     */
    var commands = editor.Commands;

    commands.add('open-attribute-manager', {
        run: function(editor) {
            $('.gjs-editor').addClass('gjs-pn-attributes-shown');

            // Prepoluate values
            var component = editor.getSelected();
            _.forEach(attributes, function(attribute) {
                var inputEl = document.getElementById('attribute_' + attribute.name);
                inputEl.value = component.attributes[attribute.name];
            });
        }
    });

    commands.add('close-attribute-manager', {
        run: function(editor) {
            $('.gjs-editor').removeClass('gjs-pn-attributes-shown');
        }
    });

    commands.add('save-attribute', {
        run: function(editor, sender, options) {
            // sender.set('active', 0);
            // Set Attributes on Component
            var component = editor.getSelected();
            component.attributes[options.attribute] = (options.value == 'true' || options.value == 'false') ? JSON.parse(options.value) : ((options.value != '') ? options.value : false);
            editor.refresh();
        }
    });


    /*
     *    PANELS
     */

    var panels = editor.Panels;
    panels.addPanel({ id: 'attribute-manager' });

    /*
     *   PANEL ELEMENTS
     */

    var container = document.createElement('div');
    container.classList = 'gjs-sm-sector';

    // Title Element
    var titleEl = document.createElement('div');
    var titleIcon = document.createElement('span');
    titleIcon.classList = 'icon-settings fa fa-cog';
    titleEl.classList = 'gjs-sm-title';
    titleEl.innerHTML = '  Attributes';
    titleEl.insertBefore(titleIcon, titleEl.firstChild);

    // Wrapper Element
    var outWrapperEl = document.createElement('div');
    var inWrapperEl = document.createElement('div');
    outWrapperEl.classList = 'gjs-sm-properties';
    inWrapperEl.classList = 'gjs-trt-traits';

    container.appendChild(titleEl);

    // Attrbute Elements
    _.forEach(attributes, function(attribute) {
        var wrapperEl = document.createElement('div');
        var labelEl = document.createElement('div');

        wrapperEl.classList = 'gjs-trt-trait';
        labelEl.classList = 'gjs-label';
        labelEl.innerHTML = ' ' + attribute.label;
        wrapperEl.appendChild(labelEl);

        var fieldEl = document.createElement('div');
        fieldEl.classList = 'gjs-field gjs-field-text';

        switch (attribute.type) {
            case 'input':
            case 'select':
            case 'checkbox':
                var inputholderEl = document.createElement('div');
                var inputEl = document.createElement('input');
                inputholderEl.classList = 'gjs-input-holder';
                inputEl.setAttribute('id', 'attribute_' + attribute.name);
                inputEl.setAttribute('name', attribute.name);
                inputEl.setAttribute('placeholder', attribute.placeholder);

                inputEl.onchange = function() {
                    editor.runCommand('save-attribute', { 'attribute': inputEl.getAttribute('name'), 'value': inputEl.value });
                };

                // if (attribute.type == 'select') {
                //     _.forEach(attribute.options, function(option) {
                //         var optionEl = document.createElement('option');
                //         optionEl.value = option;
                //         optionEl.innerHTML = option;

                //         inputEl.appendChild(optionEl);
                //     });
                // }

                inputholderEl.appendChild(inputEl);
                fieldEl.appendChild(inputholderEl);
                break;
                // case 'checkbox':
                //     break;
        }

        wrapperEl.appendChild(fieldEl);
        inWrapperEl.appendChild(wrapperEl);
    });

    outWrapperEl.appendChild(inWrapperEl);
    container.appendChild(outWrapperEl);

    /*
     *   EVENTS
     */

    editor.on('load', function() {
        var attrPanel = document.getElementById('gjs-pn-attribute-manager');
        attrPanel.insertBefore(container, attrPanel.firstChild);
    });

    editor.on('change:selectedComponent', function() {
        var component = editor.getSelected();

        if (component && !component.attributes.wrapper) {
            if (!isPageMode) {
                editor.runCommand('open-attribute-manager');
            }
        } else {
            if (!isPageMode) {
                editor.runCommand('close-attribute-manager');
            }
        }
    });

});