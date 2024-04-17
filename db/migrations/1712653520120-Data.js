module.exports = class Data1712653520120 {
    name = 'Data1712653520120'

    async up(db) {
        await db.query(`DROP INDEX "public"."IDX_be54ea276e0f665ffc38630fc0"`)
        await db.query(`DROP INDEX "public"."IDX_4cbc37e8c3b47ded161f44c24f"`)
        await db.query(`CREATE TABLE "account" ("id" character varying NOT NULL, "balance" numeric NOT NULL, "nonce" integer NOT NULL, "did_creations" jsonb, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`)
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "from"`)
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "to"`)
        await db.query(`ALTER TABLE "transfer" ADD "block_number" numeric NOT NULL`)
        await db.query(`ALTER TABLE "transfer" ADD "extrinsic" jsonb NOT NULL`)
        await db.query(`ALTER TABLE "transfer" ADD "timestamp" TIMESTAMP WITH TIME ZONE NOT NULL`)
        await db.query(`ALTER TABLE "transfer" ADD "from_id" character varying`)
        await db.query(`ALTER TABLE "transfer" ADD "to_id" character varying`)
        await db.query(`CREATE INDEX "IDX_76bdfed1a7eb27c6d8ecbb7349" ON "transfer" ("from_id") `)
        await db.query(`CREATE INDEX "IDX_0751309c66e97eac9ef1149362" ON "transfer" ("to_id") `)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496" FOREIGN KEY ("from_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "transfer" ADD CONSTRAINT "FK_0751309c66e97eac9ef11493623" FOREIGN KEY ("to_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`CREATE INDEX "IDX_be54ea276e0f665ffc38630fc0" ON "transfer" ("from") `)
        await db.query(`CREATE INDEX "IDX_4cbc37e8c3b47ded161f44c24f" ON "transfer" ("to") `)
        await db.query(`DROP TABLE "account"`)
        await db.query(`ALTER TABLE "transfer" ADD "from" text NOT NULL`)
        await db.query(`ALTER TABLE "transfer" ADD "to" text NOT NULL`)
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "block_number"`)
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "extrinsic"`)
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "timestamp"`)
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "from_id"`)
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "to_id"`)
        await db.query(`DROP INDEX "public"."IDX_76bdfed1a7eb27c6d8ecbb7349"`)
        await db.query(`DROP INDEX "public"."IDX_0751309c66e97eac9ef1149362"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_76bdfed1a7eb27c6d8ecbb73496"`)
        await db.query(`ALTER TABLE "transfer" DROP CONSTRAINT "FK_0751309c66e97eac9ef11493623"`)
    }
}
