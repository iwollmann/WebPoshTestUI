import React, {Component, PropTypes} from 'react';
import Typist from 'react-typist';
import PubSub from 'pubsub-js';
import update from 'react-addons-update';

class CommandOutput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commands: ['New-WebDriverSession -Url "http://localhost:9515/"']
        };
    }

    componentDidMount() {
        this.addCommandToken = PubSub.subscribe('addCommand', this.addCommand.bind(this));
        this.removeCommandToken = PubSub.subscribe('removeCommand', this.removeCommand.bind(this));
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.addCommandToken);
        PubSub.unsubscribe(this.removeCommandToken);
    }
    addCommand(msg, data) {
        this.setState({
            commands: [...this.state.commands, data]
        });
    }

    removeCommand(msg, data) {
        const index = this.state.commands.indexOf(data);
        if (index >= 0) {
            this.setState({
                commands: update(this.state.commands, { $splice: [[index, 1]] })
            });
        }
    }

    render() {
        function renderCommands(command) {
            return (<div><p className="typing">{command}</p><br/></div>);
        }
        return (
            <div className="sixteen wide column">Output:
                <div className="ui container inverted segment" id="cdOutput">
                    {this.state.commands.map(renderCommands, this) }
                </div>
            </div>
        );
    }
}

export default CommandOutput;