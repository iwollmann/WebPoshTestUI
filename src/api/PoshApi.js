const commands = [{
    id: "E4D60004-F549-494F-9954-E62B66A96B01",
    name: "goto",
    parameters: [{
        name: "url",
        type: "string"
    }
    ],
    command: "Set-WebDriverSessionUrl"
}, {
        id: "48DFE885-81C2-4571-9419-283774140900",
        name: "sendkeys",
        parameters: [{
            name: "ElementCssSelector"
        }, {
                name: "Value",
                type: "string"
            }
        ],
        command: "Set-WebDriverSessionSendKeys"
    }
]

class PoshApi {
    static GetAllCommands() {
        return new Promise((resolve, reject) => {
            resolve(Object.assign([], commands));
        });
    }
}

export default PoshApi;
