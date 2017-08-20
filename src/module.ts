
import Waiter from './core/waiter'
import JetBone from './jetbone'
import Model from './model'

class Module extends Waiter {
    public static __type: string = 'Module'
    public readonly __type: string = 'module'
    public name: string = null

    private readonly _parent: JetBone
    private _state: object = { }
    private _models: object = { }
    private _actions: object = { }
    private _resolvers: object = { }

    private set state(value) {
        this._state = value
        this.dispatchChange()
    }

    constructor(_parent: JetBone, name: string) {
        super()

        this._parent = _parent
        this.name = name
    }

    public createModel(modelName: string, schema: object) {
        const model = new Model(this, modelName, schema)
        this._models[modelName] = model
        this.state = Object.assign({ }, this._state, { [modelName]: [ ] })
    }

    public createActions(modelName: string, actions) {
        this._actions[modelName] = actions
    }

    public createResolver(modelName: string, resolver) {
        this._resolvers[modelName] = resolver
    }

    public model(modelName: string): any {
        if (this._models[modelName]) {
            const model = new this._models[modelName]()
            model.listen({
                onChange: this.dispatchChange,
                onLoading: this.dispatchLoading
            })
            this.state[modelName].push(model)
            this.dispatchChange()
            return model
        } else {
            throw Error('Model ' + modelName + ' does not exist on module ' + this.name)
        }
    }
}

export default Module
