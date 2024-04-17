import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_} from "typeorm"
import * as marshal from "./marshal"
import {Transfer} from "./transfer.model"
import {DIDCreation} from "./_didCreation"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    balance!: bigint

    @Column_("int4", {nullable: false})
    nonce!: number

    @OneToMany_(() => Transfer, e => e.from)
    outgoingTransfers!: Transfer[]

    @OneToMany_(() => Transfer, e => e.to)
    incomingTransfers!: Transfer[]

    @Column_("jsonb", {transformer: {to: obj => obj == null ? undefined : obj.map((val: any) => val.toJSON()), from: obj => obj == null ? undefined : marshal.fromList(obj, val => new DIDCreation(undefined, marshal.nonNull(val)))}, nullable: true})
    didCreations!: (DIDCreation)[] | undefined | null
}
