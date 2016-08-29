import joint from 'jointjs';
import $ from 'jquery';

class JointCommands {
    constructor() {
        if (typeof joint.shapes.commands === 'undefined') {
             this.loadCommands();
        }
    }

    getCommand(name) {
        return new joint.shapes.commands[name]({
            size: { width: 140, height: 30 },
            inPorts: ['In'],
            outPorts: ['Out'],
            attrs: {
                rect: { fill: 'blue' },
                '.inPorts circle': { fill: '#16A085', magnet: 'passive', type: 'input' },
                '.outPorts circle': { fill: '#E74C3C', type: 'output' }
            }
        });
    }
}

export default JointCommands;