import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733989655754 implements MigrationInterface {
  name = 'Migrations1733989655754';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee_profiles" DROP COLUMN "home_address"`);
    await queryRunner.query(`ALTER TABLE "employee_profiles" ADD "home_address" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee_profiles" DROP COLUMN "home_address"`);
    await queryRunner.query(`ALTER TABLE "employee_profiles" ADD "home_address" character varying(255) NOT NULL`);
  }
}
