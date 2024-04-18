import assert from "assert"
import * as marshal from "./marshal"

export class Extrinsic {
    private _id!: string
    private _index!: number
    private _hash!: string
    private _method!: string
    private _blockNumber!: number

    constructor(props?: Partial<Omit<Extrinsic, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._id = marshal.id.fromJSON(json.id)
            this._index = marshal.int.fromJSON(json.index)
            this._hash = marshal.string.fromJSON(json.hash)
            this._method = marshal.string.fromJSON(json.method)
            this._blockNumber = marshal.int.fromJSON(json.blockNumber)
        }
    }

    get id(): string {
        assert(this._id != null, 'uninitialized access')
        return this._id
    }

    set id(value: string) {
        this._id = value
    }

    get index(): number {
        assert(this._index != null, 'uninitialized access')
        return this._index
    }

    set index(value: number) {
        this._index = value
    }

    get hash(): string {
        assert(this._hash != null, 'uninitialized access')
        return this._hash
    }

    set hash(value: string) {
        this._hash = value
    }

    get method(): string {
        assert(this._method != null, 'uninitialized access')
        return this._method
    }

    set method(value: string) {
        this._method = value
    }

    get blockNumber(): number {
        assert(this._blockNumber != null, 'uninitialized access')
        return this._blockNumber
    }

    set blockNumber(value: number) {
        this._blockNumber = value
    }

    toJSON(): object {
        return {
            id: this.id,
            index: this.index,
            hash: this.hash,
            method: this.method,
            blockNumber: this.blockNumber,
        }
    }
}
