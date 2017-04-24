import {Map} from 'immutable'

export default class Store {
    store = null
    constructor () {
        this.store = Map()
    }

    set (key, val) {
        this.store = this.store.set(key, val)
    }

    get (key) {
        return this.store.get(key)
    }
}