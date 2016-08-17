import React, {PropTypes} from 'react';
import GraphContainer from './GraphContainer';
import GraphManager from './GraphManager';

class App extends React.Component {
    render() {
        return (
            <div>
                <GraphManager />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children : PropTypes.object
};

export default App;