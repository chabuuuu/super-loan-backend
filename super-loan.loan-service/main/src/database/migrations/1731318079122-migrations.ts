import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731318079122 implements MigrationInterface {
  name = 'Migrations1731318079122';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notifications" RENAME COLUMN "object_receive_notices" TO "object_receive_notice"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notifications" RENAME COLUMN "object_receive_notice" TO "object_receive_notices"`
    );
  }
}
