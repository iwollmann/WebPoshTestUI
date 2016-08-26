import React, {Component, PropTypes} from 'react';
import joint from 'jointjs';
import $ from 'jquery';
import commands from './JointCommands';
import PubSub from 'pubsub-js';
import ToolBoxCommandsBuilder from './ToolBoxCommandsBuilder';
import * as commandActions from '../actions/commandActions';
import _ from 'lodash';

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

        commandActions.LoadCommands().then((commands) => {
            const commandsTool = ToolBoxCommandsBuilder.BuildCommands(_.map(commands, 'name'));
            toolGraph.addCells(commandsTool);
        });

        let paper = this.props.paper,
            graph = this.props.graph,
            addCommand = this.addCommand;


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
                    let s = new commands().getCommand(flyShape.attributes.attrs[".label"].text);
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
            <div className="tbContainer four wide column" ref="tbContainer">
            </div>
        );
    }
}

ToolBoxContainer.propTypes = {
    graph: PropTypes.object,
    paper: PropTypes.object
};

export default ToolBoxContainer;