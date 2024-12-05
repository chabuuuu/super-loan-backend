import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1733391445540 implements MigrationInterface {
  name = 'Migrations1733391445540';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee_profiles" ALTER COLUMN "avatar" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "employee_profiles" ALTER COLUMN "avatar" SET NOT NULL`);
  }
}
