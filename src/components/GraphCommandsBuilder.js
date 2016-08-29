import joint from 'jointjs';
import _ from 'lodash';
import $ from 'jquery';

class GraphCommandsBuilder {
    constructor(commands) {
        this._commands = commands;
        if (typeof joint.shapes.commands === 'undefined') {
            this.loadElements();
        }
    }

    loadElements() {
        joint.shapes.commands = {};

        for (let index = 0; index < this._commands.length; index++) {
            this.buildDefinition(this._commands[index]);
            this.buildView(this._commands[index]);
        }
    }

    buildDefinition(command) {
        let propertyDefaults = { type: 'commands.' + command.name };

        for (let i = 0; i < command.parameters.length; i++) {
            propertyDefaults[command.parameters[i].name] = "";
        }

        const toString = function (value) {
            return ' -' + value.name + ' "' + this.attributes[value.name] + '"';
        };

        joint.shapes.commands[command.name] = joint.shapes.devs.Model.extend({
            defaults: joint.util.deepSupplement(propertyDefaults, joint.shapes.devs.Model.prototype.defaults),
            toString: function () {
                return command.command + _.map(command.parameters, toString.bind(this)).join(' ');
            }
        });
    }

    buildView(command) {
        let template = '<div class="html-element">' +
            '<button class="delete">x</button>' +
            '<div class="ui form" id="parametersList">';

        for (let index = 0; index < command.parameters.length; index++) {
            const parameter = command.parameters[index];
            template += '<div class="field"><span class="ui mini leabeled">' + parameter.name + ':</span>' +
                '<input class="ui mini input" type="text" value="" /></div>';
        }

        template += '</div></div>';

        joint.shapes.commands[command.name + 'View'] = joint.shapes.devs.ModelView.extend({
            initialize: function () {
                joint.dia.ElementView.prototype.initialize.apply(this, arguments);
                this.$box = $(template);

                this.$box.find('input').on('change', this.updateModel.bind(this));

                this.$box.find('.delete').on('click', this.model.remove.bind(this.model));
                this.model.on('change', this.updateBox, this);
                this.model.on('remove', this.removeBox, this);

                this.updateBox();
            },
            render: function () {
                joint.dia.ElementView.prototype.render.apply(this, arguments);
                this.paper.$el.prepend(this.$box);
                this.updateBox();
                return this;
            },
            updateBox: function () {
                const bbox = this.model.getBBox();
                const gBbox = this.model.graph.getBBox();
                this.$box.css({ width: 150, height: 40, left: (bbox.x + gBbox.x), top: (bbox.y + gBbox.y) });
            },
            removeBox: function () {
                this.$box.remove();
            },
            updateModel: function (evt) {
                _.map(command.parameters, ((parameter) => { this.model.set(parameter.name, $(evt.target).val()); }).bind(this));
            }

        });
    }
}

export default GraphCommandsBuilder;