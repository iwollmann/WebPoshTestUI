import React, {Component, PropTypes} from 'react';
import Typist from 'react-typist';

class CommandOutput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commands: ['New-WebDriverSession -Url "http://localhost:9515/"']
        };
    }

    componentWillMount(){
        this.setState({
            commands: [...this.state.commands,'testing']
        });
    }

    render() {
        function renderCommands(command) {
            return (<div><span className="ui green">{command}</span><br/></div>);
        }
        return (
            <div className="ui container inverted segment eight wide column" id="cdOutput">
                <Typist>{this.state.commands.map(renderCommands, this)}</Typist>
            </div>
        );
    }
}

CommandOutput.propTypes = {

};

export default CommandOutput;