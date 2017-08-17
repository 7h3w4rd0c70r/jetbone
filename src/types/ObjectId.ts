
import DataType from './DataType'

class ObjectIdType extends DataType<string|number> {
    public readonly _name: string = 'ObjectId'

    protected _default: string|number = this._null ? null : ''
    protected _value: string|number = this._default

    constructor(params: { default?: string|number, null?: boolean, ref?: string }) {
        super(params)
    }
}

export default ObjectIdType
