import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1731317687969 implements MigrationInterface {
  name = 'Migrations1731317687969';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "object_receive_notices" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "object_receive_notices" DROP NOT NULL`);
  }
}
