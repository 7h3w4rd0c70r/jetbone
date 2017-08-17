
import DataType from './DataType'

class DateType extends DataType<Date> {
    _name = 'Date'
    _default = this._null ? null : new Date()
    _value = this._default

    constructor(params) {
        super(params)

        if (params.default !== undefined) {
            this._default = this.parse(params.default)
        }

        this._value = this._default
    }

    parse(value) {
        value = super.parse(value)
        if (value) {
            if (value instanceof Date) {
                return value
            } else if (typeof value === 'string') {
                return new Date(value)
            } else if (!isNaN(value)) {
                return new Date(Number(value))
            } else {
                throw new Error('Cannot parse a value ' + value + '. Expected valid date, string, number, null (if not null) or undefined.')
            }
        } else {
            return this._default
        }
    }

    validate(value) {
        return super.validate(value) ? (value === null || value instanceof Date ? true : false) : false
    }
}

export default DateType
