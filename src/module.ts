
import Waiter from './core/waiter'
import JetBone from './jetbone'
import Model from './model'

class Module extends Waiter {
    public readonly __type: string = 'module'
    public name: string = null

    private readonly _parent: JetBone
    private _state: object = {
        
    }

    private _models: object = {

    }

    constructor(_parent: JetBone, name: string) {
        super()

        this._parent = _parent
        this.name = name
    }

    public createModel(modelName: string, schema: object) {
        if (Model.validateSchema(schema)) {
            const model = new Model(this, modelName, schema)
            model.listen({
                onChange: this.dispatchChange,
                onLoading: this.dispatchLoading
            })
            this._models[modelName] = model
        } else {
            throw Error('Model ' + modelName + ' has an invalid schema')
        }
    }

    public createActions(modelName: string, actions) {

    }

    public createResolver(modelName: string, resolver) {

    }
}

export default Module
