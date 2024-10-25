import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729743526999 implements MigrationInterface {
  name = 'Migrations1729743526999';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "borrower_profiles" DROP COLUMN "gender"`);
    await queryRunner.query(`CREATE TYPE "public"."borrower_profiles_gender_enum" AS ENUM('MALE', 'FEMALE')`);
    await queryRunner.query(
      `ALTER TABLE "borrower_profiles" ADD "gender" "public"."borrower_profiles_gender_enum" NOT NULL DEFAULT 'MALE'`
    );
    await queryRunner.query(`ALTER TABLE "borrowers" ALTER COLUMN "social_login_type" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "borrowers" ALTER COLUMN "status" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "borrowers" ALTER COLUMN "status" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "borrowers" ALTER COLUMN "social_login_type" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "borrower_profiles" DROP COLUMN "gender"`);
    await queryRunner.query(`DROP TYPE "public"."borrower_profiles_gender_enum"`);
    await queryRunner.query(`ALTER TABLE "borrower_profiles" ADD "gender" boolean NOT NULL`);
  }
}
