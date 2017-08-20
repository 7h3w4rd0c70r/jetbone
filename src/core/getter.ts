
export default function getter(obj: object, field: any): any {
    try {
        return (
            String(field)
                .split('.')
                .reduce((o, i) => o[i], obj)
        )
    } catch (ex) {
        return undefined
    }
}
