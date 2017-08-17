
import * as ModelHelpers from './helpers/schema'

class Schema {
    private readonly schema: object

    constructor(schema: object) {
        this.schema = ModelHelpers.parseSchema(schema)
    }

    public getInitialState(): object {
        return ModelHelpers.createInitialState(this.schema)
    }

    public parseState(state: object): object {
        return ModelHelpers.parseState(this.schema, state)
    }
}

export default Schema
