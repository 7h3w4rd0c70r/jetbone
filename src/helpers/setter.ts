
export default function setter(obj: object, fields: string|Array<any>, value: any): object {
    if (typeof fields === 'string') {
        fields = fields.split('.')
    }
    const updated: object = Object.assign({ }, obj)
    if (fields.length == 1) {
        updated[fields[0]] = value
    } else {
        updated[fields[0]] = setter(updated[fields[0]], fields.slice(1), value)
    }
    return updated
}
