import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732775811396 implements MigrationInterface {
  name = 'Migrations1732775811396';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."borrower_profiles_debt_status_enum" AS ENUM('BAD', 'GOOD', 'UNKNOWN')`
    );
    await queryRunner.query(
      `ALTER TABLE "borrower_profiles" ADD "debt_status" "public"."borrower_profiles_debt_status_enum" NOT NULL DEFAULT 'GOOD'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "borrower_profiles" DROP COLUMN "debt_status"`);
    await queryRunner.query(`DROP TYPE "public"."borrower_profiles_debt_status_enum"`);
  }
}
