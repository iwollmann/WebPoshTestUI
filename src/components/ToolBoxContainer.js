import React, {Component, PropTypes} from 'react';
import joint from 'jointjs';
import $ from 'jquery';


class ToolBoxContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        let root = this.refs.tbContainer;

        let toolGraph = new joint.dia.Graph,
            toolPaper = new joint.dia.Paper({
                el: root,
                height: 300,
                width: 100,
                model: toolGraph,
                interactive: false
            });

        const rect = new joint.shapes.devs.Model({
            position: { x: 10, y: 30 },
            size: { width: 100, height: 30 },
            inPorts: ['In'],
            outPorts: ['Out'],
            attrs: {
                rect: { fill: 'blue' },
                '.label': { text: 'OnClick', 'ref-x': .4, 'ref-y': .2 },
                '.inPorts circle': { fill: '#16A085', magnet: 'passive', type: 'input' },
                '.outPorts circle': { fill: '#E74C3C', type: 'output' }
            }
        });

        joint.shapes.commands = {};
        joint.shapes.commands.GoTo = joint.shapes.devs.Model.extend({
            defaults: joint.util.deepSupplement({
                type: 'commands.GoTo',
                href:''                
            }, joint.shapes.devs.Model.prototype.defaults)
        });

        joint.shapes.commands.GoToView = joint.shapes.devs.ModelView.extend({
            initialize: function () {
                joint.dia.ElementView.prototype.initialize.apply(this, arguments);
                this.$box = $('<div class="html-element"><button class="delete">x</button><span>Href:</span><input type="text" value="I m HTML input" /></div>');

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
debugger;
const bbox2 = this.model.graph.getBBox();
                this.$box.css({ width: 150, height: 40, left: bbox.x+bbox2.x, top: bbox.y+bbox2.y });
            },
            removeBox: function () {
                this.$box.remove();
            },
            updateModel:function(evt){
                this.model.set('href',$(evt.target).val());
            }

        });

        toolGraph.addCells([rect]);

        let paper = this.props.paper,
            graph = this.props.graph;


        toolPaper.on('cell:pointerdown', function (cellView, e, x, y) {
            $(root).append('<div id="flyPaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;"></div>');
            let flyGraph = new joint.dia.Graph,
                flyPaper = new joint.dia.Paper({
                    el: $('#flyPaper'),
                    model: flyGraph,
                    interactive: false
                }),
                flyShape = cellView.model.clone(),
                pos = cellView.model.position(),
                offset = {
                    x: x - pos.x,
                    y: y - pos.y
                };

            flyShape.position(0, 0);
            flyGraph.addCell(flyShape);
            $("#flyPaper").offset({
                left: e.pageX - offset.x,
                top: e.pageY - offset.y
            });
            $(root).on('mousemove.fly', function (e) {
                $("#flyPaper").offset({
                    left: e.pageX - offset.x,
                    top: e.pageY - offset.y
                });
            });
            $(root).on('mouseup.fly', function (e) {
                const x = e.pageX;
                const y = e.pageY;
                const target = paper.$el.offset();

                if (x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height()) {
                    // let s = flyShape.clone();
                    let s = new joint.shapes.commands.GoTo({
                        size: { width: 100, height: 30 },
                        inPorts: ['In'],
                        outPorts: ['Out'],
                        attrs: {
                            rect: { fill: 'blue' },
                            '.label': { text: 'OnClick', 'ref-x': .4, 'ref-y': .2 },
                            '.inPorts circle': { fill: '#16A085', magnet: 'passive', type: 'input' },
                            '.outPorts circle': { fill: '#E74C3C', type: 'output' }
                        },
                        interactive: true
                    });
                    debugger;
                    s.position(x - target.left - offset.x, y - target.top - offset.y);
                    graph.addCell(s);
                }
                $(root).off('mousemove.fly').off('mouseup.fly');
                flyShape.remove();
                $('#flyPaper').remove();
            });
        });
    }

    render() {
        return (
            <div className="tbContainer" ref="tbContainer">
            </div>
        );
    }
}

ToolBoxContainer.propTypes = {
    graph: PropTypes.object,
    paper: PropTypes.object
};

export default ToolBoxContainer;