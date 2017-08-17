
import DataType from './DataType'

class NumberType extends DataType<number> {
    public readonly _name: string = 'Number'

    protected _default: number = this._null ? null : 0
    protected _value: number = this._default

    constructor(params?: { default?: number, null?: boolean }) {
        super(params)

        if (params.default !== undefined) {
            if (this.validate(params.default)) {
                this._default = params.default
            } else {
                throw new Error('Invalid default value for NumberType. Expected number or null, but got ' + typeof params.default)
            }
        }

        this._value = this._default
    }

    parse(value): number {
        value = super.parse(value)
        if (value === undefined) {
            return this._default
        } else if (isNaN(value)) {
            throw new Error('Cannot parse a value ' + value + '. Expected valid number, null (if not null) or undefined.')
        } else {
            return Number(value)
        }
    }

    validate(value): boolean {
        return super.validate(value) ? (value === null || typeof value === 'number' ? true : false) : false
    }
}

export default NumberType
