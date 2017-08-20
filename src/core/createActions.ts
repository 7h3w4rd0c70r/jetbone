
import Waiter from './waiter'

export default function (Actions) {
    return class extends Waiter {
        private _queue: Array<any> = [ ]

        constructor() {
            super()

            this.listen({ onLoading: this._onThisLoadingChange })

            if (typeof Actions === 'function') {
                const actions = Object.getOwnPropertyNames(Actions.prototype)
                for (let key in actions) {
                    if (actions[key] !== 'constructor' && typeof Actions.prototype[actions[key]] === 'function') {
                        this[actions[key]] = async (...args) => {
                            if (this.isLoading) {
                                this._queue.push({
                                    action: actions[key],
                                    args: [...args]
                                })
                            } else {
                                this.dispatchLoading(true)
                                this._resolve(actions[key], await Actions.prototype[actions[key]](...args))
                            }
                        }
                    }
                }
            } else if (Actions instanceof Object) {
                for (let action in Actions) {
                    this[action] = async (...args) => {
                        if (this.isLoading) {
                            this._queue.push({
                                action: action,
                                args: [...args]
                            })
                        } else {
                            this.dispatchLoading(true)
                            this._resolve(
                                Actions[action].resolver ? Actions[action].resolver : action,
                                Actions[action](...args)
                            )
                        }
                    }
                }
            } else {
                throw new Error('Actions must be a class or an object. See to documentation for more details about how to write actions.')
            }
        }

        private _onThisLoadingChange() {
            if (!this.isLoading() && this._queue.length > 0) {
                const next = this._queue.shift()
                this[next.action](...(next.args))
            }
        }

        public clearPending(): void {
            this._queue = [ ]
            this.loading = false
        }
    }
}
