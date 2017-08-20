
import Waiter from './core/waiter'
import Module from './module'

class JetBone extends Waiter {
    public static __type: string = 'JetBone'
    public readonly __type: string = 'jetbone'

    private _defaultModuleName: string = '__default_module_'
    private _state: object = { }

    private set state(value: object) {
        this._state = value
        this.dispatchChange()
    }

    constructor(options: { defaultModule?: string } = { }) {
        super()

        if (options.defaultModule) {
            this._defaultModuleName = String(this._defaultModuleName)
        }

        this.createModule(this._defaultModuleName)
    }

    public createModule(name: string, isDefault: boolean = false) {
        if (this._state[name]) {
            throw Error('Module ' + name + ' already exists')
        }

        const module = new Module(this, name)
        module.listen({
            onChange: this.dispatchChange,
            onLoading: this.dispatchLoading
        })
        this._defaultModuleName = String(name)
        this.state = Object.assign({ }, this._state, { [name]: module })
    }

    public getModule(moduleName): Module {
        if (this._state[moduleName]) {
            return this._state[moduleName]
        } else {
            throw Error('Module ' + moduleName + ' does not exist')
        }
    }
}

export default JetBone
