
import DataType from './DataType'

class BooleanType extends DataType<boolean> {
    public readonly _name: string = 'Boolean'

    protected _default: boolean = this._null ? null : false
    protected _value: boolean = this._default

    constructor(params) {
        super(params)

        if (params.default !== undefined) {
            if (params.default === null || params.default === false || params.default === true) {
                this._default = params.default
            } else {
                throw new Error('Invalid default value for BooleanType. Expected boolean or null, but got ' + typeof params.default)
            }
        }

        this._value = this._default
    }

    parse(value): boolean {
        value = super.parse(value)
        if (value === undefined) {
            return this._default
        } else {
            if (typeof value === 'string' && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
                if (value.toLowerCase() === 'true') {
                    return true
                }
                if (value.toLowerCase() === 'false') {
                    return false
                }
            }
            return isNaN(value) ? Boolean(value) : Boolean(Number(value))
        }
    }

    validate(value): boolean {
        return super.validate(value) ? (value === null || typeof value === 'boolean' ? true : false) : false
    }
}

export default BooleanType
