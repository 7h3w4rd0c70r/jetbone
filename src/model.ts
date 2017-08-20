
import Waiter from './core/waiter'
import getter from './core/getter'
import setter from './core/setter'
import createActions from './core/createActions'
import Module from './module'
import Schema from './schema'
import * as Types from './types'

class Model extends Waiter {
    public static __type: string = 'Model'
    public readonly __type: string = 'model'
    public name: string = null

    private readonly _parent: Module
    private readonly _schema: Schema
    private _state: object

     private set state(value: object) {
         this._state = value
         this.dispatchChange()
     }

    constructor(_parent: Module, name: string, schema: object) {
        super()

        this._parent = _parent
        this.name = name
        this._schema = new Schema(schema)
        this._state = this._schema.getInitialState()
    }

    public getState(): object {
        return Object.assign({ }, this._state)
    }

    public setState(state: object): void {
        this.state = this._schema.parseState(state)
    }

    public get(field: string): any {
        return getter(this._state, field)
    }

    public set(field: string, value: any): void {
        this.state = this._schema.parseState(setter(this._state, field, value))
    }
}

export default Model
