
import jSignal from 'jsignal'

class Waiter {
    private _onChange = new jSignal()
    private _onLoading = new jSignal()
    private _onDestroy = new jSignal()

    private _loading: boolean = false
    
    public isLoading(): boolean {
        return this._loading
    }

    public listen(listeners: { onChange?: Function, onLoading?: Function, onDestroy?: Function }): void;
    public listen(onChange: Function, onLoading?: Function, onDestroy?: Function): void;
    public listen(listenersOrOnChange: { onChange?: Function, onLoading?: Function, onDestroy?: Function } | Function, onLoading?: Function, onDestroy?: Function) {
        if (typeof listenersOrOnChange === 'function') {
            this._onChange.listen(listenersOrOnChange)
        }
        if (typeof onLoading === 'function') {
            this._onLoading.listen(onLoading)
        }
        if (typeof onDestroy === 'function') {
            this._onDestroy.listen(onDestroy)
        }

        if (typeof listenersOrOnChange === 'object') {
            if (typeof listenersOrOnChange.onChange === 'function') {
                this._onChange.listen(listenersOrOnChange.onChange)
            }
            if (typeof listenersOrOnChange.onLoading === 'function') {
                this._onLoading.listen(listenersOrOnChange.onLoading)
            }
            if (typeof listenersOrOnChange.onDestroy === 'function') {
                this._onDestroy.listen(listenersOrOnChange.onDestroy)
            }
        }
    }

    public unlisten(listeners: { onChange?: Function, onLoading?: Function, onDestroy?: Function }): void;
    public unlisten(onChange: Function, onLoading?: Function, onDestroy?: Function): void;
    public unlisten(listenersOrOnChange: { onChange?: Function, onLoading?: Function, onDestroy?: Function } | Function, onLoading?: Function, onDestroy?: Function): void {
        if (typeof listenersOrOnChange === 'function') {
            this._onChange.unlisten(listenersOrOnChange)
        }
        if (typeof onLoading === 'function') {
            this._onLoading.unlisten(onLoading)
        }
        if (typeof onDestroy === 'function') {
            this._onDestroy.unlisten(onDestroy)
        }

        if (typeof listenersOrOnChange === 'object') {
            if (typeof listenersOrOnChange.onChange === 'function') {
                this._onChange.unlisten(listenersOrOnChange.onChange)
            }
            if (typeof listenersOrOnChange.onLoading === 'function') {
                this._onLoading.unlisten(listenersOrOnChange.onLoading)
            }
            if (typeof listenersOrOnChange.onDestroy === 'function') {
                this._onDestroy.unlisten(listenersOrOnChange.onDestroy)
            }
        }
    }

    public dispatchChange(...args): void {
        this._onChange.dispatch()
    }

    public dispatchLoading(...args): void {
        this._onLoading.dispatch()
    }

    public dispatchDestroy(...args): void {
        this._onDestroy.dispatch(...args)
    }
}

export default Waiter
