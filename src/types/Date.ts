
import DataType from './DataType'

class DateType extends DataType<Date> {
    public readonly _name: string = 'Date'

    protected _default: Date = this._null ? null : new Date()
    protected _value: Date = this._default

    constructor(params?: { default?: Date, null?: boolean }) {
        super(params)

        if (params.default !== undefined) {
            this._default = this.parse(params.default)
        }

        this._value = this._default
    }

    parse(value): Date {
        value = super.parse(value)
        if (value) {
            if (value instanceof Date) {
                return value
            } else if (typeof value === 'string') {
                return new Date(value)
            } else if (!isNaN(value)) {
                return new Date(Number(value))
            } else {
                throw new Error('Cannot parse a value ' + value + '. Expected valid date, string, number or null.')
            }
        } else {
            return this._default
        }
    }

    validate(value): boolean {
        return super.validate(value) ? (value === null || value instanceof Date ? true : false) : false
    }
}

export default DateType
