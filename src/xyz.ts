
import Waiter from './core/waiter'
import Module from './module'

class XYZ extends Waiter {
    private _state: object = {

    }

    constructor(options: object = { }) {
        super()
    }

    private _createModule(name) {
        if (this._state[name]) {
            throw Error('Module ' + name + ' already exists')
        }
        const module = new Module(this, name)
        module.listen({
            onChange: this.dispatchChange,
            onLoading: this.dispatchLoading
        })
        this._state[name] = module
    }

    public module(moduleName) {

    }
}

export default XYZ
