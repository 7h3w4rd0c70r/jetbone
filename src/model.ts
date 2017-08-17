
import Waiter from './core/waiter'
import Module from './module'
import Schema from './schema'
import * as Types from './types'

class Model extends Waiter {
    public name: string = null

    private readonly _parent: Module
    private readonly _schema: Schema
    private _state: object

    constructor(_parent: Module, name: string, schema: object) {
        super()

        this._parent = _parent
        this.name = name
        this._schema = new Schema(schema)
        this._state = this._schema.getInitialState()
    }
}

export default Model
