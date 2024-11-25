import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732520405153 implements MigrationInterface {
  name = 'Migrations1732520405153';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" ADD "receivers" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "receivers"`);
  }
}
