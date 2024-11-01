import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1730445264899 implements MigrationInterface {
  name = 'Migrations1730445264899';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "borrower_profiles" ALTER COLUMN "avatar" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "borrower_profiles" ALTER COLUMN "job_tittle" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "borrower_profiles" ALTER COLUMN "income" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "borrower_profiles" ALTER COLUMN "identify_card_number" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "borrower_profiles" ALTER COLUMN "identify_card_issued_date" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "borrower_profiles" ALTER COLUMN "identify_card_issued_place" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "borrower_profiles" ALTER COLUMN "identify_card_issued_place" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "borrower_profiles" ALTER COLUMN "identify_card_issued_date" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "borrower_profiles" ALTER COLUMN "identify_card_number" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "borrower_profiles" ALTER COLUMN "income" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "borrower_profiles" ALTER COLUMN "job_tittle" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "borrower_profiles" ALTER COLUMN "avatar" SET NOT NULL`);
  }
}
