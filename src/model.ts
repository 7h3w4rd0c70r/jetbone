
import Waiter from './core/waiter'
import Module from './module'

class Model extends Waiter {
    public name: string = null

    private _parent: Module = null

    constructor(_parent: Module, name: string, schema: object) {
        super()

        this._parent = _parent
        this.name = name
    }

    public static validateSchema(schema: object): boolean {
        return true
    }
}

export default Model
