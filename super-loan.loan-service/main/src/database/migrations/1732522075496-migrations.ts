import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732522075496 implements MigrationInterface {
  name = 'Migrations1732522075496';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "seen"`);
    await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "receiver_id"`);
    await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "receiver_type"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" ADD "receiver_type" character varying`);
    await queryRunner.query(`ALTER TABLE "notifications" ADD "receiver_id" character varying`);
    await queryRunner.query(`ALTER TABLE "notifications" ADD "seen" boolean NOT NULL DEFAULT false`);
  }
}
