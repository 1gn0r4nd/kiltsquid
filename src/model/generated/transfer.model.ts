import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, ManyToOne as ManyToOne_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Account} from "./account.model"
import {Extrinsic} from "./_extrinsic"

@Entity_()
export class Transfer {
    constructor(props?: Partial<Transfer>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    from!: Account

    @Index_()
    @ManyToOne_(() => Account, {nullable: true})
    to!: Account

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    value!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    fee!: bigint

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    blockNumber!: bigint

    @Column_("jsonb", {transformer: {to: obj => obj.toJSON(), from: obj => obj == null ? undefined : new Extrinsic(undefined, obj)}, nullable: false})
    extrinsic!: Extrinsic

    @Index_()
    @Column_("text", {nullable: true})
    extrinsicHash!: string | undefined | null

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date
}
