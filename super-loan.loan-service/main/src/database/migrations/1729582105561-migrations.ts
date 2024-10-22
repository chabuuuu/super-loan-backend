import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729582105561 implements MigrationInterface {
  name = 'Migrations1729582105561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "borrower_profiles" DROP COLUMN "gender"`);
    await queryRunner.query(`ALTER TABLE "borrower_profiles" ADD "gender" boolean NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "borrower_profiles" DROP COLUMN "gender"`);
    await queryRunner.query(`ALTER TABLE "borrower_profiles" ADD "gender" character varying(10) NOT NULL`);
  }
}
