import assert from "assert"
import * as marshal from "./marshal"
import {Extrinsic} from "./_extrinsic"

export class DIDCreation {
    private _id!: string
    private _did!: string
    private _submitter!: string
    private _owner!: string
    private _publicKey!: string
    private _blockNumber!: bigint
    private _extrinsic!: Extrinsic
    private _timestamp!: Date

    constructor(props?: Partial<Omit<DIDCreation, 'toJSON'>>, json?: any) {
        Object.assign(this, props)
        if (json != null) {
            this._id = marshal.id.fromJSON(json.id)
            this._did = marshal.string.fromJSON(json.did)
            this._submitter = marshal.string.fromJSON(json.submitter)
            this._owner = marshal.string.fromJSON(json.owner)
            this._publicKey = marshal.string.fromJSON(json.publicKey)
            this._blockNumber = marshal.bigint.fromJSON(json.blockNumber)
            this._extrinsic = new Extrinsic(undefined, marshal.nonNull(json.extrinsic))
            this._timestamp = marshal.datetime.fromJSON(json.timestamp)
        }
    }

    get id(): string {
        assert(this._id != null, 'uninitialized access')
        return this._id
    }

    set id(value: string) {
        this._id = value
    }

    get did(): string {
        assert(this._did != null, 'uninitialized access')
        return this._did
    }

    set did(value: string) {
        this._did = value
    }

    get submitter(): string {
        assert(this._submitter != null, 'uninitialized access')
        return this._submitter
    }

    set submitter(value: string) {
        this._submitter = value
    }

    get owner(): string {
        assert(this._owner != null, 'uninitialized access')
        return this._owner
    }

    set owner(value: string) {
        this._owner = value
    }

    get publicKey(): string {
        assert(this._publicKey != null, 'uninitialized access')
        return this._publicKey
    }

    set publicKey(value: string) {
        this._publicKey = value
    }

    get blockNumber(): bigint {
        assert(this._blockNumber != null, 'uninitialized access')
        return this._blockNumber
    }

    set blockNumber(value: bigint) {
        this._blockNumber = value
    }

    get extrinsic(): Extrinsic {
        assert(this._extrinsic != null, 'uninitialized access')
        return this._extrinsic
    }

    set extrinsic(value: Extrinsic) {
        this._extrinsic = value
    }

    get timestamp(): Date {
        assert(this._timestamp != null, 'uninitialized access')
        return this._timestamp
    }

    set timestamp(value: Date) {
        this._timestamp = value
    }

    toJSON(): object {
        return {
            id: this.id,
            did: this.did,
            submitter: this.submitter,
            owner: this.owner,
            publicKey: this.publicKey,
            blockNumber: marshal.bigint.toJSON(this.blockNumber),
            extrinsic: this.extrinsic.toJSON(),
            timestamp: marshal.datetime.toJSON(this.timestamp),
        }
    }
}
