import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731316415638 implements MigrationInterface {
  name = 'Migrations1731316415638';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" ADD "content" text`);
    await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "propose_id" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "object_receive_notices" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "object_receive_notices" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "propose_id" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "content"`);
  }
}
