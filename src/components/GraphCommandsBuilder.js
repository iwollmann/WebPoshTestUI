import joint from 'jointjs';

class GraphCommandsBuilder {
    contructor(commands) {
        if (typeof joint.shapes.commands === 'undefined') {
            this.loadElements(commands);
        }
    }

    loadElements(commands) {
        for (let index = 0; index < commands.length; index++) {
            this.buildDefinition(commands[index]);
        }
    }

    buildDefinition(command) {
        joint.shapes.commands.GoTo = joint.shapes.devs.Model.extend({
            defaults: joint.util.deepSupplement({
                type: 'commands.GoTo',
                href: ''
            }, joint.shapes.devs.Model.prototype.defaults),
            toString: function () {
                return 'Set-WebDriverSessionUrl -Url "' + this.attributes.href + '"';
            }
        });
    }

    buildView(command) {
        joint.shapes.commands.GoToView = joint.shapes.devs.ModelView.extend({
            initialize: function () {
                joint.dia.ElementView.prototype.initialize.apply(this, arguments);
                this.$box = $('<div class="html-element"><button class="delete">x</button><div class="ui left action input"><span class="ui mini leabeled">Href:</span><input class="ui mini input" type="text" value="I m HTML input" /></div></div>');

                this.$box.find('input').on('change', this.updateModel.bind(this));

                this.$box.find('select').val(this.model.get('select'));
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
                this.model.set('href', $(evt.target).val());
            }

        });
    }
}

export default GraphCommandsBuilder;