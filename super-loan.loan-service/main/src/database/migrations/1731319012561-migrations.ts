import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731319012561 implements MigrationInterface {
  name = 'Migrations1731319012561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "object_receive_notice"`);
    await queryRunner.query(`ALTER TABLE "notifications" ADD "receiver_id" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "notifications" ADD "seen" boolean NOT NULL DEFAULT false`);
    await queryRunner.query(`ALTER TABLE "notifications" ADD "receiver_type" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "receiver_type"`);
    await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "seen"`);
    await queryRunner.query(`ALTER TABLE "notifications" DROP COLUMN "receiver_id"`);
    await queryRunner.query(`ALTER TABLE "notifications" ADD "object_receive_notice" json NOT NULL`);
  }
}
