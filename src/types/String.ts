
import DataType from './DataType'

class StringType extends DataType<string> {
    public readonly _name: string = 'String'

    protected _default: string = this._null ? null : ''
    protected _value: string = this._default

    constructor(params?: { default?: string, null?: boolean }) {
        super(params)

        if (params.default !== undefined) {
            if (this.validate(params.default)) {
                this._default = params.default
            } else {
                throw new Error('Invalid default value for StringType. Expected string or null, but got ' + typeof params.default)
            }
        }

        this._value = this._default
    }

    parse(value: any): string {
        value = super.parse(value)
        if (value === undefined) {
            return this._default
        } else {
            return String(value)
        }
    }

    validate(value): boolean {
        return super.validate(value) ? (value === null || typeof value === 'string' ? true : false) : false
    }
}

export default StringType