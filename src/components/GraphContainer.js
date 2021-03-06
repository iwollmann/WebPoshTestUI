import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import joint from 'jointjs';
import $ from 'jquery';
import PubSub from 'pubsub-js';

class GraphContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleContainerUpdate = this.handleContainerUpdate.bind(this);
    }

    componentDidMount() {
        let graph = new joint.dia.Graph(),
            paper = new joint.dia.Paper({
                el: ReactDOM.findDOMNode(this.refs.graphContainer),
                height: 295,
                model: graph,
                gridSize: 1,
                defaultLink: new joint.dia.Link({
                    attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } }
                }),
                validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                    const id = cellViewS.model.id;
                    const links = cellViewS.model.graph.getLinks().filter((x)=> {
                        return x.get('source').id == id;
                    });

                    if (links.length > 1) return false;

                    if (magnetS && magnetS.getAttribute('type') === 'input') return false;
                    if (cellViewS === cellViewT) return false;

                    return magnetT && magnetT.getAttribute('type') === 'input';
                },
                validateMagnet: function (cellView, magnet) {
                    return magnet.getAttribute('magnet') !== 'passive';
                },
                snapLinks: { radius: 75 }
            });

        let start = new joint.shapes.devs.Model({
            position: { x: 50, y: 50 },
            size: { width: 90, height: 90 },
            outPorts: ['Out'],
            attrs: {
                '.label': { text: 'Start', 'ref-x': .4, 'ref-y': .2 },
                circle: { fill: '#2ECC71' },
                '.outPorts circle': { fill: '#E74C3C', type: 'output' }
            }
        });

        graph.addCell(start);

        graph.on('change:source change:target', function (link, target, y) {
            const source = link.get('source');
            if (source.id && target.id) {
                const targetElement = link.graph.getCell(target);
                PubSub.publish('addCommand', targetElement.toString());
            }
        });

        graph.on('remove', function(cell, collection, opt){
            if (cell.isLink()) {
                const targetElement = collection.get(cell.get('target'));
                PubSub.publish('removeCommand', targetElement.toString());
            }
        });

        this.handleContainerUpdate(graph, paper);
    }

    handleContainerUpdate(graph, paper) {
        this.props.handleGraphContainerUpdate(graph, paper);
    }

    render() {
        return (
            <div className="graphContainer" ref="graphContainer">
            </div>
        );
    }
}

GraphContainer.propTypes = {
    handleGraphContainerUpdate: PropTypes.func
};

export default GraphContainer;