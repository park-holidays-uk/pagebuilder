/*export default*/
grapesjs.plugins.add('traits', (editor, options) => {

    /*
     *   VARIABLES 
     */

    // Managers
    var opt = options || {};
    var commands = editor.Commands;

    // Each new type extends the default Trait
    editor.TraitManager.addType('multi-select', {
        events: {
            'click': 'onChange', // trigger parent onChange method on click
        },

        /**
         * Returns the input element
         * @return {HTMLElement}
         */
        getInputEl: function() {
            if (!this.$input) {
                var md = this.model;
                var options = md.get('options') || [];

                var input = $('<select></select>');
                input.attr('multiple', 'multiple');

                if (options.length) {
                    options.forEach(function(option) {
                        var optionEl = $('<option></option>');
                        optionEl.html(option.name);
                        optionEl.val(option.value);
                        input.append(optionEl)
                    });
                }

                this.$input = input;

                var target = this.target;
                var name = md.get('name');
                var value = md.get('value');

                if (md.get('changeProp')) {
                    value = value || target.get(name);
                } else {
                    var attrs = target.get('attributes');
                    value = attrs[name];
                }

                if (value) {
                    _.forEach(this.$input.get(0).options, function(o) {
                        o.selected = false;
                    });

                    _.filter(this.$input.get(0).options, function(o) { return (value.indexOf(o.value) > -1); }).map(function(o) {
                        if (o.value.trim() != '' || value.trim() == '') {
                            o.selected = true;
                        }
                    });
                }
            }

            return this.$input.get(0);
        },

        /**
         * Fires when the input is changed
         * @private
         */
        onChange() {
            var selected = this.$input.get(0).selectedOptions;
            var values = _.map(selected, 'value');

            this.model.set('value', values.join(',')); //this.getInputEl().value
        },

        /**
         * Triggered when the value of the model is changed
         */
        onValueChange: function() {
            this.target.set(this.model.get('name'), this.model.get('value'));
        }
    });
});