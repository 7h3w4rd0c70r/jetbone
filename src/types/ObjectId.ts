
import DataType from './DataType'

class ObjectIdType extends DataType<string|number> {
    public readonly _name: string = 'ObjectId'

    protected _default: string|number = this._null ? null : ''
    protected _value: string|number = this._default
    protected _ref: string = null

    constructor(params?: { default?: string|number, null?: boolean, ref?: string }) {
        super(params)

        if (params.default !== undefined) {
            if (this.validate(params.default)) {
                this._default = params.default
            } else {
                throw new Error('Invalid default value for StringType. Expected string, but got ' + typeof params.default)
            }
        }

        if (params.ref !== undefined) {
            if (typeof params.ref === 'string' || params.ref === null) {
                this._ref = params.ref
            } else {
                throw new Error('ObjectId.ref expects a string or null')
            }
        }

        this._value = this._default
    }

    parse(value): string|number {
        value = super.parse(value)
        if (value === undefined) {
            return this._default
        } else {
            if (typeof value === 'number') {
                return value
            } else {
                return String(value)
            }
        }
    }

    validate(value): boolean {
        return super.validate(value) ? (value === null || typeof value === 'string' || typeof value === 'number' ? true : false) : false
    }
}

export default ObjectIdType
