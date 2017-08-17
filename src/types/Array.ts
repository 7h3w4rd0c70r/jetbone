
import DataType from './DataType'

import StringType  from './String'
import NumberType  from './Number'
import BooleanType from './Boolean'
import DateType    from './Date'
import AnyType     from './Any'

class ArrayType extends DataType<Array<any>> {
    public readonly _name: string = 'Array'

    protected _default: Array<any> = this._null ? null : [ ]
    protected _value: Array<any> = this._default

    protected _arraytype = null

    constructor(params?: { default?: any, null?: boolean, arraytype: any }) {
        super(params)

        if (params.arraytype) {
            if (typeof params.arraytype === 'string') {
                const type = params.arraytype.toLowerCase()
                if (type === 'string') this._arraytype = new StringType()
                else if (type === 'number') this._arraytype = new NumberType()
                else if (type === 'boolean' || type === 'bool') this._arraytype = new BooleanType()
                else if (type === 'date') this._arraytype = new DateType()
                else if (type === 'mixed' || type === 'any') this._arraytype = new AnyType()
                else throw new Error('Invalid string used as arraytype')
            } else if (typeof params.arraytype === 'function') {
                if (params.arraytype.name === 'String') this._arraytype = new StringType()
                else if (params.arraytype.name === 'Number') this._arraytype = new NumberType()
                else if (params.arraytype.name === 'Date') this._arraytype = new DateType()
                else if (params.arraytype.name === 'Boolean') this._arraytype = new BooleanType()
                else throw new Error('Invalid function used as arraytype')
            } else {
                throw new Error('Invalid arraytype passed to ArrayType arguments. Expected function (String, Number, Date or Boolean), string or DataType, but got ' + params.arraytype)
            }
        } else {
            this._arraytype = new AnyType()
        }

        if (params.default !== undefined) {
            if (params.default instanceof Array || params.default === null) {
                this._default = this.parse(params.default)
            } else {
                throw new Error('Invalid default value for ArrayType. Expected array (or null, if notnull), but got ' + typeof params.default)
            }
        }

        this._value = this._default
    }

    parse(value): Array<any> {
        value = super.parse(value)
        if (!(value instanceof Array))
            throw new Error('ArrayType.parseArray expects an array')
        const parsed = [ ]
        for (let i in value) {
            parsed.push(this._arraytype.parse(value[i]))
        }
        return parsed
    }

    validate(value): boolean {
        return super.validate(value) ? (value === null || value instanceof Array ? true : false) : false
    }
}

export default ArrayType
