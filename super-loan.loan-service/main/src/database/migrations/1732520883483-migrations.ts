import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732520883483 implements MigrationInterface {
  name = 'Migrations1732520883483';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "receiver_type" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notifications" ALTER COLUMN "receiver_type" SET NOT NULL`);
  }
}
