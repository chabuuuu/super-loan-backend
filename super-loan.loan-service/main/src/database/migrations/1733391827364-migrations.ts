import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733391827364 implements MigrationInterface {
  name = 'Migrations1733391827364';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee_profiles" ALTER COLUMN "social_link" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "employee_profiles" ALTER COLUMN "sign_attachments" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee_profiles" ALTER COLUMN "sign_attachments" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "employee_profiles" ALTER COLUMN "social_link" SET NOT NULL`);
  }
}
