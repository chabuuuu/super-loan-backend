import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1730790935000 implements MigrationInterface {
  name = 'Migrations1730790935000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP CONSTRAINT "FK_9323bf7413dd1191ed48c408246"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_71642e62cc87d68843badb5e7fc"`);
    await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "roleRoleId" TO "role_id"`);
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP CONSTRAINT "PK_a6da6d648e7c3f46ddfc3e53e78"`);
    await queryRunner.query(
      `ALTER TABLE "permission_specifics" ADD CONSTRAINT "PK_4a36c85f5f1f390649b2ccb2ce5" PRIMARY KEY ("permission")`
    );
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP COLUMN "user"`);
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP CONSTRAINT "PK_4a36c85f5f1f390649b2ccb2ce5"`);
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP COLUMN "permission"`);
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP COLUMN "user_type"`);
    await queryRunner.query(
      `CREATE TYPE "public"."permission_specifics_usertype_enum" AS ENUM('BORROWER', 'EMPLOYEE', 'LENDER')`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_specifics" ADD "userType" "public"."permission_specifics_usertype_enum" NOT NULL DEFAULT 'EMPLOYEE'`
    );
    await queryRunner.query(`ALTER TABLE "lenders" ADD "role_id" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "borrowers" ADD "role_id" character varying`);
    await queryRunner.query(
      `ALTER TABLE "permission_specifics" ADD CONSTRAINT "PK_0712c767fcdec837292fbe7a2b6" PRIMARY KEY ("user_id", "permission_id")`
    );
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP CONSTRAINT "PK_0712c767fcdec837292fbe7a2b6"`);
    await queryRunner.query(
      `ALTER TABLE "permission_specifics" ADD CONSTRAINT "PK_d37d9220f3345d87f99b5612c28" PRIMARY KEY ("permission_id")`
    );
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "permission_specifics" ADD "user_id" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP CONSTRAINT "PK_d37d9220f3345d87f99b5612c28"`);
    await queryRunner.query(
      `ALTER TABLE "permission_specifics" ADD CONSTRAINT "PK_0712c767fcdec837292fbe7a2b6" PRIMARY KEY ("permission_id", "user_id")`
    );
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role_id"`);
    await queryRunner.query(`ALTER TABLE "employees" ADD "role_id" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "lenders" ADD CONSTRAINT "FK_40ced335ef64c25a3f0c1c3a095" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_727d9c30d77d3a253177b2e918f" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "borrowers" ADD CONSTRAINT "FK_b1dac564c8e268c8a7bc3899045" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "borrowers" DROP CONSTRAINT "FK_b1dac564c8e268c8a7bc3899045"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_727d9c30d77d3a253177b2e918f"`);
    await queryRunner.query(`ALTER TABLE "lenders" DROP CONSTRAINT "FK_40ced335ef64c25a3f0c1c3a095"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "role_id"`);
    await queryRunner.query(`ALTER TABLE "employees" ADD "role_id" character varying(70)`);
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP CONSTRAINT "PK_0712c767fcdec837292fbe7a2b6"`);
    await queryRunner.query(
      `ALTER TABLE "permission_specifics" ADD CONSTRAINT "PK_d37d9220f3345d87f99b5612c28" PRIMARY KEY ("permission_id")`
    );
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP COLUMN "user_id"`);
    await queryRunner.query(`ALTER TABLE "permission_specifics" ADD "user_id" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP CONSTRAINT "PK_d37d9220f3345d87f99b5612c28"`);
    await queryRunner.query(
      `ALTER TABLE "permission_specifics" ADD CONSTRAINT "PK_0712c767fcdec837292fbe7a2b6" PRIMARY KEY ("user_id", "permission_id")`
    );
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP CONSTRAINT "PK_0712c767fcdec837292fbe7a2b6"`);
    await queryRunner.query(`ALTER TABLE "borrowers" DROP COLUMN "role_id"`);
    await queryRunner.query(`ALTER TABLE "lenders" DROP COLUMN "role_id"`);
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP COLUMN "userType"`);
    await queryRunner.query(`DROP TYPE "public"."permission_specifics_usertype_enum"`);
    await queryRunner.query(`ALTER TABLE "permission_specifics" ADD "user_type" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "permission_specifics" ADD "permission" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "permission_specifics" ADD CONSTRAINT "PK_4a36c85f5f1f390649b2ccb2ce5" PRIMARY KEY ("permission")`
    );
    await queryRunner.query(`ALTER TABLE "permission_specifics" ADD "user" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP CONSTRAINT "PK_4a36c85f5f1f390649b2ccb2ce5"`);
    await queryRunner.query(
      `ALTER TABLE "permission_specifics" ADD CONSTRAINT "PK_a6da6d648e7c3f46ddfc3e53e78" PRIMARY KEY ("user", "permission")`
    );
    await queryRunner.query(`ALTER TABLE "employees" RENAME COLUMN "role_id" TO "roleRoleId"`);
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_71642e62cc87d68843badb5e7fc" FOREIGN KEY ("roleRoleId") REFERENCES "roles"("role_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_specifics" ADD CONSTRAINT "FK_9323bf7413dd1191ed48c408246" FOREIGN KEY ("user_id") REFERENCES "employees"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
