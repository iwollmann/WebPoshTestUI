import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import joint from 'jointjs';
import ToolBoxContainer from './ToolBoxContainer';
import GraphContainer from './GraphContainer';

class GraphManager extends React.Component {
    constructor(props) {
        super(props);

        this.state = { graph: {}, paper: {} };
        this.handleGraphContainer = this.handleGraphContainer.bind(this);
    }

    handleGraphContainer(graph, paper){
        this.setState({ graph: graph, paper: paper });
    }

    render() {
        return (
            <div>
                <GraphContainer handleGraphContainerUpdate={this.handleGraphContainer} />
                <ToolBoxContainer graph={this.state.graph} paper={this.state.paper}/>
            </div>
        );
    }
}

export default GraphManager;