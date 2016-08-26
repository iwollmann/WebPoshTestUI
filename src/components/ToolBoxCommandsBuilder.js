import joint from 'jointjs';

class ToolBoxCommandsBuilder {
    static BuildCommands(names) {
        let commands = [];

        for (let i = 0; i < names.length; i++) {
            commands.push(new joint.shapes.devs.Model({
                position: { x: 10, y: 30*(i+1) },
                size: { width: 100, height: 30 },
                attrs: {
                    rect: { fill: 'blue' },
                    '.label': { text: names[i], 'ref-x': .4, 'ref-y': .2 }
                }
            }));
        }

        return commands;
    }
}

export default ToolBoxCommandsBuilder;