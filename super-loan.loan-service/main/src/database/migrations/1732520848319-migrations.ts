import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732520848319 implements MigrationInterface {
  name = 'Migrations1732520848319';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "receiver_id" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "receiver_id" SET NOT NULL`);
  }
}
