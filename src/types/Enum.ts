
import DataType from './DataType'

class EnumType extends DataType<any> {
    public readonly _name: string = 'Enum'

    protected _default: any = this._null ? null : 0
    protected _value: any = this._default
    protected _enums: Array<any> = [ ]

    constructor(params?: { default?: any, null?: boolean, enums?: Array<any> }) {
        super(params)

        const enums = params.enums
        if (!(enums instanceof Array) || enums.length == 0) {
            throw new Error('Enum constructor expects an array of at least one enum (strings/numbers)')
        }
        
        const type = typeof enums[0]
        if (type !== 'string' && type !== 'number') {
            throw new Error('Enum value expects a string or a number, but got ' + type)
        }
        enums.map(en => {
            if (type !== typeof en)
                throw new Error('All enum values must be the same type, either strings or numbers')
        })
        this._enums = enums

        if (params.default !== undefined) {
            this._default = this.parse(params.default)
        }

        this._value = this._default
    }

    parse(value): any {
        value = super.parse(value)
        if (value === undefined) {
            if (this._null === false) {
                return this._enums[0]
            } else {
                return null
            }
        } else if (this._enums.indexOf(value) == -1) {
            throw new Error('Value ' + value + ' is not an enum.')
        } else {
            return value
        }
    }

    validate(value): boolean {
        return super.validate(value) ? (value === null || this._enums.indexOf(value) != -1 ? true : false) : false
    }
}

export default EnumType
