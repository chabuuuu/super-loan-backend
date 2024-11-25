import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732516757890 implements MigrationInterface {
  name = 'Migrations1732516757890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP COLUMN "terms"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" ADD "terms" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "loan_packages" DROP COLUMN "terms"`);
    await queryRunner.query(`ALTER TABLE "loan_packages" ADD "terms" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "loan_packages" DROP COLUMN "terms"`);
    await queryRunner.query(`ALTER TABLE "loan_packages" ADD "terms" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP COLUMN "terms"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" ADD "terms" integer NOT NULL`);
  }
}
