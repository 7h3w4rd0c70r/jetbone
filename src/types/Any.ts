
import DataType from './DataType'

class AnyType extends DataType<any> {
    public readonly _name: string = 'Any'

    protected _default: any = this._null ? null : { }
    protected _value: any = this._default

    constructor(params?: { default?: any, null?: boolean }) {
        super(params)

        if (params.default !== undefined) {
            this._default = this.parse(params.default)
        }

        this._value = this._default
    }

    parse(value): any {
        value = super.parse(value)
        return value
    }

    validate(value): boolean {
        return super.validate(value)
    }
}

export default AnyType
