
class DataType<T> {
    public __type = 'datatype'

    static __type = 'DataType'

    protected _null = true

    constructor(params: { default?: T, null?: boolean }) {
        if (params.null === false) {
            this._null = false
        } else if (params.null && params.null !== null && params.null !== true)  {
            throw new Error('Invalid value for datatype.null; Can be only true or false')
        }

        if (this._null === false && params.default === null) {
            throw new Error('Default value for DataType cannot be null when null is false')
        }
    }

    parse(unparsed: any): T {
        if (this._null === false && unparsed === null) {
            throw new Error('Cannot parse value null if propery is set to not null')
        }
        return unparsed
    }

    validate(value): boolean {
        if (this._null === false && value === null) {
            return false
        }
        return true
    }
}

export default DataType
