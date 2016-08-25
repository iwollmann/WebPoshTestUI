let queue = {};

class PubSub {
    constructor() {
    }

    static pub(id, data) {
        const events = queue[id];
        if (typeof event !== 'undefined') {
            events(data);

            return true;
        }

        return false;
    }

    static sub(id, callback) {
        if (typeof queue[id] === 'undefined') {
            queue[id]  = callback;

            return true;
        }

        return false;
    }

    static unsub(id){
        queue.pop(id);
    }
}

export default PubSub;