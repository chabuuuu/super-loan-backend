import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732179082818 implements MigrationInterface {
  name = 'Migrations1732179082818';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP CONSTRAINT "PK_c7020014b96a86ab93f2446a1f0"`);
    await queryRunner.query(
      `ALTER TABLE "version_loan_packages" ADD CONSTRAINT "PK_aea5e02311334053366852e97bb" PRIMARY KEY ("loan_package_id")`
    );
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP COLUMN "version"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" ADD "version" character varying(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP CONSTRAINT "PK_aea5e02311334053366852e97bb"`);
    await queryRunner.query(
      `ALTER TABLE "version_loan_packages" ADD CONSTRAINT "PK_c7020014b96a86ab93f2446a1f0" PRIMARY KEY ("loan_package_id", "version")`
    );
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP COLUMN "interest_rate"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" ADD "interest_rate" double precision NOT NULL`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP COLUMN "limit_amount"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" ADD "limit_amount" double precision NOT NULL`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP COLUMN "terms"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" ADD "terms" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "loan_packages" DROP COLUMN "interest_rate"`);
    await queryRunner.query(`ALTER TABLE "loan_packages" ADD "interest_rate" double precision NOT NULL`);
    await queryRunner.query(`ALTER TABLE "loan_packages" DROP COLUMN "loan_type"`);
    await queryRunner.query(
      `CREATE TYPE "public"."loan_packages_loan_type_enum" AS ENUM('UNSECURED_LOAN', 'MORTGAGE_LOAN')`
    );
    await queryRunner.query(
      `ALTER TABLE "loan_packages" ADD "loan_type" "public"."loan_packages_loan_type_enum" NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "loan_packages" DROP COLUMN "limit_amount"`);
    await queryRunner.query(`ALTER TABLE "loan_packages" ADD "limit_amount" double precision NOT NULL`);
    await queryRunner.query(`ALTER TABLE "loan_packages" DROP COLUMN "terms"`);
    await queryRunner.query(`ALTER TABLE "loan_packages" ADD "terms" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_d43ed9e838f74bcc07b1266a8d6"`);
    await queryRunner.query(`ALTER TABLE "assets" ALTER COLUMN "asset_type_id" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "FK_d43ed9e838f74bcc07b1266a8d6" FOREIGN KEY ("asset_type_id") REFERENCES "asset_types"("asset_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_d43ed9e838f74bcc07b1266a8d6"`);
    await queryRunner.query(`ALTER TABLE "assets" ALTER COLUMN "asset_type_id" DROP NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "FK_d43ed9e838f74bcc07b1266a8d6" FOREIGN KEY ("asset_type_id") REFERENCES "asset_types"("asset_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "loan_packages" DROP COLUMN "terms"`);
    await queryRunner.query(`ALTER TABLE "loan_packages" ADD "terms" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "loan_packages" DROP COLUMN "limit_amount"`);
    await queryRunner.query(`ALTER TABLE "loan_packages" ADD "limit_amount" numeric(15,2) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "loan_packages" DROP COLUMN "loan_type"`);
    await queryRunner.query(`DROP TYPE "public"."loan_packages_loan_type_enum"`);
    await queryRunner.query(`ALTER TABLE "loan_packages" ADD "loan_type" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "loan_packages" DROP COLUMN "interest_rate"`);
    await queryRunner.query(`ALTER TABLE "loan_packages" ADD "interest_rate" numeric(5,2) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP COLUMN "terms"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" ADD "terms" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP COLUMN "limit_amount"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" ADD "limit_amount" numeric(15,2) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP COLUMN "interest_rate"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" ADD "interest_rate" numeric(5,2) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP CONSTRAINT "PK_c7020014b96a86ab93f2446a1f0"`);
    await queryRunner.query(
      `ALTER TABLE "version_loan_packages" ADD CONSTRAINT "PK_aea5e02311334053366852e97bb" PRIMARY KEY ("loan_package_id")`
    );
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP COLUMN "version"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" ADD "version" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP CONSTRAINT "PK_aea5e02311334053366852e97bb"`);
    await queryRunner.query(
      `ALTER TABLE "version_loan_packages" ADD CONSTRAINT "PK_c7020014b96a86ab93f2446a1f0" PRIMARY KEY ("loan_package_id", "version")`
    );
  }
}
