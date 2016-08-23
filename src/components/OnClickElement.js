import React, {Component, PropTypes} from 'react';
import joint from 'jointjs';

class OnClickElement extends Component {
    render () {
            joint.shapes.html.Test = joint.shapes.basic.Rect.extend({
            defaults: joint.util.deepSupplement({
                type: 'html.Test',
                attrs: {
                    rect: { stroke: 'none', 'fill-opacity': 0 }
                }
            }, joint.shapes.basic.Rect.prototype.defaults)
        });

        joint.shapes.html.ElementView = joint.dia.ElementView.extend({
            initialize: function() {
                //_.bindAll(this, 'updateBox');
                joint.dia.ElementView.prototype.initialize.apply(this, arguments);

                // this.$box = $(_.template(this.template)());
                // // Prevent paper from handling pointerdown.
                // this.$box.find('input,select').on('mousedown click', function(evt) { evt.stopPropagation(); });
                // // This is an example of reacting on the input change and storing the input data in the cell model.
                // this.$box.find('input').on('change', _.bind(function(evt) {
                //     this.model.set('input', $(evt.target).val());
                // }, this));
                // this.$box.find('select').on('change', _.bind(function(evt) {
                //     this.model.set('select', $(evt.target).val());
                // }, this));
                // this.$box.find('select').val(this.model.get('select'));
                // this.$box.find('.delete').on('click', _.bind(this.model.remove, this.model));
                // // Update the box position whenever the underlying model changes.
                // this.model.on('change', this.updateBox, this);
                // // Remove the box when the model gets removed from the graph.
                // this.model.on('remove', this.removeBox, this);

                this.updateBox();
            },
            render: function() {
                joint.dia.ElementView.prototype.render.apply(this, arguments);
                // this.paper.$el.prepend(this.$box);
                // this.updateBox();
                return this;
            },
            updateBox: function() {
                // Set the position and dimension of the box so that it covers the JointJS element.
                // const bbox = this.model.getBBox();
                // // Example of updating the HTML with a data stored in the cell model.
                // this.$box.find('label').text(this.model.get('label'));
                // this.$box.find('span').text(this.model.get('select'));
                // this.$box.css({ width: bbox.width, height: bbox.height, left: bbox.x, top: bbox.y, transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)' });
            },
            removeBox: function(evt) {
                // this.$box.remove();
            }
        });

        return (
            <div ref="template">
                <button className="ui delete">x</button>
                <label>Testing</label>
                <input type="text" value="I\'m HTML input" />
            </div>
        );
    }
}

OnClickElement.propTypes = {

};

export default OnClickElement;