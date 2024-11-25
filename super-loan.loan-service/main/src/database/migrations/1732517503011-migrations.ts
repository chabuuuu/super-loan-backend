import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1732517503011 implements MigrationInterface {
  name = 'Migrations1732517503011';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP CONSTRAINT "FK_aea5e02311334053366852e97bb"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP CONSTRAINT "PK_c7020014b96a86ab93f2446a1f0"`);
    await queryRunner.query(
      `ALTER TABLE "version_loan_packages" ADD CONSTRAINT "PK_fb0d80403d7aca57d8bd3d13d76" PRIMARY KEY ("version")`
    );
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP COLUMN "loan_package_id"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" ADD "loan_package_id" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP CONSTRAINT "PK_fb0d80403d7aca57d8bd3d13d76"`);
    await queryRunner.query(
      `ALTER TABLE "version_loan_packages" ADD CONSTRAINT "PK_c7020014b96a86ab93f2446a1f0" PRIMARY KEY ("version", "loan_package_id")`
    );
    await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_e33b1f7a1624ba01ded8517197c"`);
    await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "loan_package_id"`);
    await queryRunner.query(`ALTER TABLE "contracts" ADD "loan_package_id" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "loan_requests" DROP CONSTRAINT "FK_50fc456c1c2601a506464f95052"`);
    await queryRunner.query(`ALTER TABLE "loan_packages" DROP CONSTRAINT "PK_94c377fbd9a3227df147bad11c2"`);
    await queryRunner.query(`ALTER TABLE "loan_packages" DROP COLUMN "loan_package_id"`);
    await queryRunner.query(`ALTER TABLE "loan_packages" ADD "loan_package_id" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "loan_packages" ADD CONSTRAINT "PK_94c377fbd9a3227df147bad11c2" PRIMARY KEY ("loan_package_id")`
    );
    await queryRunner.query(`ALTER TABLE "loan_requests" DROP COLUMN "loan_package_id"`);
    await queryRunner.query(`ALTER TABLE "loan_requests" ADD "loan_package_id" character varying`);
    await queryRunner.query(
      `ALTER TABLE "version_loan_packages" ADD CONSTRAINT "FK_aea5e02311334053366852e97bb" FOREIGN KEY ("loan_package_id") REFERENCES "loan_packages"("loan_package_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD CONSTRAINT "FK_e33b1f7a1624ba01ded8517197c" FOREIGN KEY ("loan_package_id") REFERENCES "loan_packages"("loan_package_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "loan_requests" ADD CONSTRAINT "FK_50fc456c1c2601a506464f95052" FOREIGN KEY ("loan_package_id") REFERENCES "loan_packages"("loan_package_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "loan_requests" DROP CONSTRAINT "FK_50fc456c1c2601a506464f95052"`);
    await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_e33b1f7a1624ba01ded8517197c"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP CONSTRAINT "FK_aea5e02311334053366852e97bb"`);
    await queryRunner.query(`ALTER TABLE "loan_requests" DROP COLUMN "loan_package_id"`);
    await queryRunner.query(`ALTER TABLE "loan_requests" ADD "loan_package_id" uuid`);
    await queryRunner.query(`ALTER TABLE "loan_packages" DROP CONSTRAINT "PK_94c377fbd9a3227df147bad11c2"`);
    await queryRunner.query(`ALTER TABLE "loan_packages" DROP COLUMN "loan_package_id"`);
    await queryRunner.query(
      `ALTER TABLE "loan_packages" ADD "loan_package_id" uuid NOT NULL DEFAULT uuid_generate_v4()`
    );
    await queryRunner.query(
      `ALTER TABLE "loan_packages" ADD CONSTRAINT "PK_94c377fbd9a3227df147bad11c2" PRIMARY KEY ("loan_package_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "loan_requests" ADD CONSTRAINT "FK_50fc456c1c2601a506464f95052" FOREIGN KEY ("loan_package_id") REFERENCES "loan_packages"("loan_package_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "loan_package_id"`);
    await queryRunner.query(`ALTER TABLE "contracts" ADD "loan_package_id" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD CONSTRAINT "FK_e33b1f7a1624ba01ded8517197c" FOREIGN KEY ("loan_package_id") REFERENCES "loan_packages"("loan_package_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP CONSTRAINT "PK_c7020014b96a86ab93f2446a1f0"`);
    await queryRunner.query(
      `ALTER TABLE "version_loan_packages" ADD CONSTRAINT "PK_fb0d80403d7aca57d8bd3d13d76" PRIMARY KEY ("version")`
    );
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP COLUMN "loan_package_id"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" ADD "loan_package_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP CONSTRAINT "PK_fb0d80403d7aca57d8bd3d13d76"`);
    await queryRunner.query(
      `ALTER TABLE "version_loan_packages" ADD CONSTRAINT "PK_c7020014b96a86ab93f2446a1f0" PRIMARY KEY ("loan_package_id", "version")`
    );
    await queryRunner.query(
      `ALTER TABLE "version_loan_packages" ADD CONSTRAINT "FK_aea5e02311334053366852e97bb" FOREIGN KEY ("loan_package_id") REFERENCES "loan_packages"("loan_package_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
