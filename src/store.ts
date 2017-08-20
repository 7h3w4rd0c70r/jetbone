
import Waiter from './core/waiter'
import createActions from './core/createActions'
import Model from './model'

export default function (parent: Model, name: string, actions: any, resolver: any) {
    return class extends createActions(actions) {
        public readonly __type = 'model'
        public readonly name = name
        private _state: object = { }

        constructor() {
            super()
        }
    }
}
