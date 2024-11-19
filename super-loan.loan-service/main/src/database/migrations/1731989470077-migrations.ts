import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731989470077 implements MigrationInterface {
  name = 'Migrations1731989470077';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."asset_types_status_enum" AS ENUM('AVAILABLE', 'UNAVAILABLE')`);
    await queryRunner.query(
      `ALTER TABLE "asset_types" ADD "status" "public"."asset_types_status_enum" NOT NULL DEFAULT 'AVAILABLE'`
    );
    await queryRunner.query(`CREATE TYPE "public"."assets_status_enum" AS ENUM('AVAILABLE', 'UNAVAILABLE')`);
    await queryRunner.query(
      `ALTER TABLE "assets" ADD "status" "public"."assets_status_enum" NOT NULL DEFAULT 'AVAILABLE'`
    );
    await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_d43ed9e838f74bcc07b1266a8d6"`);
    await queryRunner.query(`ALTER TABLE "asset_types" DROP CONSTRAINT "PK_f201cc1c160363ea58f6e4427d6"`);
    await queryRunner.query(`ALTER TABLE "asset_types" DROP COLUMN "asset_type_id"`);
    await queryRunner.query(`ALTER TABLE "asset_types" ADD "asset_type_id" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "asset_types" ADD CONSTRAINT "PK_f201cc1c160363ea58f6e4427d6" PRIMARY KEY ("asset_type_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "loan_request_asset_details" DROP CONSTRAINT "FK_a8e25506f98e8ffa6c4fcbab64f"`
    );
    await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "PK_ba1dca7766f77b6c475091f860c"`);
    await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "asset_id"`);
    await queryRunner.query(`ALTER TABLE "assets" ADD "asset_id" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "PK_ba1dca7766f77b6c475091f860c" PRIMARY KEY ("asset_id")`
    );
    await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "asset_type_id"`);
    await queryRunner.query(`ALTER TABLE "assets" ADD "asset_type_id" character varying`);
    await queryRunner.query(`ALTER TABLE "loan_request_asset_details" DROP COLUMN "asset_id"`);
    await queryRunner.query(`ALTER TABLE "loan_request_asset_details" ADD "asset_id" character varying`);
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "FK_d43ed9e838f74bcc07b1266a8d6" FOREIGN KEY ("asset_type_id") REFERENCES "asset_types"("asset_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "loan_request_asset_details" ADD CONSTRAINT "FK_a8e25506f98e8ffa6c4fcbab64f" FOREIGN KEY ("asset_id") REFERENCES "assets"("asset_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "loan_request_asset_details" DROP CONSTRAINT "FK_a8e25506f98e8ffa6c4fcbab64f"`
    );
    await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_d43ed9e838f74bcc07b1266a8d6"`);
    await queryRunner.query(`ALTER TABLE "loan_request_asset_details" DROP COLUMN "asset_id"`);
    await queryRunner.query(`ALTER TABLE "loan_request_asset_details" ADD "asset_id" uuid`);
    await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "asset_type_id"`);
    await queryRunner.query(`ALTER TABLE "assets" ADD "asset_type_id" uuid`);
    await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "PK_ba1dca7766f77b6c475091f860c"`);
    await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "asset_id"`);
    await queryRunner.query(`ALTER TABLE "assets" ADD "asset_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "PK_ba1dca7766f77b6c475091f860c" PRIMARY KEY ("asset_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "loan_request_asset_details" ADD CONSTRAINT "FK_a8e25506f98e8ffa6c4fcbab64f" FOREIGN KEY ("asset_id") REFERENCES "assets"("asset_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "asset_types" DROP CONSTRAINT "PK_f201cc1c160363ea58f6e4427d6"`);
    await queryRunner.query(`ALTER TABLE "asset_types" DROP COLUMN "asset_type_id"`);
    await queryRunner.query(`ALTER TABLE "asset_types" ADD "asset_type_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
    await queryRunner.query(
      `ALTER TABLE "asset_types" ADD CONSTRAINT "PK_f201cc1c160363ea58f6e4427d6" PRIMARY KEY ("asset_type_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "FK_d43ed9e838f74bcc07b1266a8d6" FOREIGN KEY ("asset_type_id") REFERENCES "asset_types"("asset_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."assets_status_enum"`);
    await queryRunner.query(`ALTER TABLE "asset_types" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."asset_types_status_enum"`);
  }
}
