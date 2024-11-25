import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732180028941 implements MigrationInterface {
  name = 'Migrations1732180028941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP CONSTRAINT "PK_c7020014b96a86ab93f2446a1f0"`);
    await queryRunner.query(
      `ALTER TABLE "version_loan_packages" ADD CONSTRAINT "PK_aea5e02311334053366852e97bb" PRIMARY KEY ("loan_package_id")`
    );
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP COLUMN "version"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" ADD "version" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP CONSTRAINT "PK_aea5e02311334053366852e97bb"`);
    await queryRunner.query(
      `ALTER TABLE "version_loan_packages" ADD CONSTRAINT "PK_c7020014b96a86ab93f2446a1f0" PRIMARY KEY ("loan_package_id", "version")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP CONSTRAINT "PK_c7020014b96a86ab93f2446a1f0"`);
    await queryRunner.query(
      `ALTER TABLE "version_loan_packages" ADD CONSTRAINT "PK_aea5e02311334053366852e97bb" PRIMARY KEY ("loan_package_id")`
    );
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP COLUMN "version"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" ADD "version" character varying(255) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP CONSTRAINT "PK_aea5e02311334053366852e97bb"`);
    await queryRunner.query(
      `ALTER TABLE "version_loan_packages" ADD CONSTRAINT "PK_c7020014b96a86ab93f2446a1f0" PRIMARY KEY ("loan_package_id", "version")`
    );
  }
}
