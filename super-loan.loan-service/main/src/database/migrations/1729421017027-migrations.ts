import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1729421017027 implements MigrationInterface {
  name = 'Migrations1729421017027';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "employee_profiles" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "employee_id" uuid NOT NULL, "avatar" text NOT NULL, "emails" text NOT NULL, "phone_numbers" text NOT NULL, "fullname" character varying(100) NOT NULL, "identify_card_number" character varying(50) NOT NULL, "home_address" character varying(255) NOT NULL, "birthday" date NOT NULL, "gender" character varying(10) NOT NULL, "social_link" character varying(255) NOT NULL, "sign_attachments" text NOT NULL, CONSTRAINT "PK_af55fd0477e7792007d7d2135aa" PRIMARY KEY ("employee_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "version_loan_packages" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "loan_package_id" uuid NOT NULL, "version" integer NOT NULL, "loan_package_name" character varying(255) NOT NULL, "interest_rate" numeric(5,2) NOT NULL, "loan_type" character varying(50) NOT NULL, "limit_amount" numeric(15,2) NOT NULL, "loan_term_limit" integer NOT NULL, "preference" text, "terms" text NOT NULL, "description" text, CONSTRAINT "PK_c7020014b96a86ab93f2446a1f0" PRIMARY KEY ("loan_package_id", "version"))`
    );
    await queryRunner.query(
      `CREATE TABLE "borrower_profiles" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "borrower_id" uuid NOT NULL, "fullname" character varying(100) NOT NULL, "avatar" text NOT NULL, "emails" text NOT NULL, "phone_number" text NOT NULL, "job_tittle" character varying(100) NOT NULL, "income" numeric(10,2) NOT NULL, "identify_card_number" character varying(50) NOT NULL, "identify_card_issued_date" date NOT NULL, "identify_card_issued_place" character varying(255) NOT NULL, "borrower_income_proof_documents" text, "home_address" character varying(255) NOT NULL, "work_address" character varying(255), "birthday" date NOT NULL, "gender" character varying(10) NOT NULL, "social_link" character varying(255), "bank_accounts" jsonb, "sign_attachments" character varying(255), CONSTRAINT "PK_60e6b18c40776c1c40415dd7bc9" PRIMARY KEY ("borrower_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "payment_installments" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "payment_installment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payment_installment" integer NOT NULL, "percentage_of_total" numeric(5,2) NOT NULL, "payment_method" character varying(50) NOT NULL, "notes" text, "payment_status" character varying(50) NOT NULL, "contract_id" uuid NOT NULL, "customer_id" uuid NOT NULL, CONSTRAINT "PK_62bbc4ebfe60f304fb34fd61504" PRIMARY KEY ("payment_installment_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "notifications" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "notification_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "propose_id" character varying NOT NULL, "object_receive_notices" json NOT NULL, "title_name" character varying(255) NOT NULL, "noti_type" character varying(50) NOT NULL, "subject_send_notice" uuid, CONSTRAINT "PK_eaedfe19f0f765d26afafa85956" PRIMARY KEY ("notification_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "borrowers" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "borrower_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "phone_number" character varying(15) NOT NULL, "password" character varying(100) NOT NULL, "social_login_type" character varying(20) NOT NULL, "social_uid" character varying(255), "status" character varying(20) NOT NULL, CONSTRAINT "PK_5eae4c8cadc0ccc9a45c618b823" PRIMARY KEY ("borrower_id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_9714fe82510c5c6d237eb7421f" ON "borrowers" ("email") `);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_65c564167cd3f45352d5be48ba" ON "borrowers" ("phone_number") `);
    await queryRunner.query(
      `CREATE TABLE "lender_profiles" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "lender_id" uuid NOT NULL, "fullname" character varying(255) NOT NULL, "avatar" character varying(255), "job_title" character varying(100), "emails" text, "phone_numbers" text, "company_name" character varying(255), "company_address" character varying(255), "company_tax_code" character varying(50), "bank_accounts" json, "description" text, "social_link" character varying(255), "sign" text, CONSTRAINT "PK_a93495f947747e4b1ac16004ee9" PRIMARY KEY ("lender_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "lenders" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "lender_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "phone_number" character varying(15) NOT NULL, "password" character varying(255) NOT NULL, "social_login_type" character varying(50), "social_uid" character varying(255), "status" character varying(50) NOT NULL, CONSTRAINT "PK_4783e7d44effdc02a9aa0c5e979" PRIMARY KEY ("lender_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tracking_contract_informations" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "contract_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "loan_request_id" character varying NOT NULL, "contract_status" character varying(50) NOT NULL, "borrower_fullname" character varying(255) NOT NULL, "borrower_avatar" character varying NOT NULL, "borrower_address" character varying(255) NOT NULL, "borrower_phone_number" character varying(15) NOT NULL, "borrower_birthday" date NOT NULL, "borrower_sign" text NOT NULL, "borrower_identify_card_number" character varying(20) NOT NULL, "lender_fullname" character varying(255) NOT NULL, "lender_address" character varying(255) NOT NULL, "lender_phone_number" character varying(15) NOT NULL, "lender_sign" text NOT NULL, "payment_method" character varying(50) NOT NULL, "borrower_bank_account_name" character varying(255), "borrower_bank_account_number" character varying(50), "receive_money_address" character varying(255), "attachments" text, "loan_amount" numeric(15,2) NOT NULL, "loan_type" character varying(50) NOT NULL, "loan_package_id" character varying NOT NULL, "loan_package_name" character varying(255) NOT NULL, "loan_purpose" text NOT NULL, "loan_term" integer NOT NULL, "loan_interest_rate" numeric(5,2) NOT NULL, "contract_type" character varying(50) NOT NULL, "hard_contract_document" character varying, "contractIdContractId" uuid, CONSTRAINT "PK_24877221bea42fa552143bbc5a3" PRIMARY KEY ("contract_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "payment_plans" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "propose_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payment_installment" integer NOT NULL, "percentage_of_total" numeric(5,2) NOT NULL, "amount" numeric(15,2) NOT NULL, "start_pay_at" date NOT NULL, "end_pay_at" date NOT NULL, "days" integer NOT NULL, "contract_id" uuid NOT NULL, CONSTRAINT "PK_c11cc424c80b86b98383b7287e1" PRIMARY KEY ("propose_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "disbursement_plans" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "propose_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "disbursement_installment" integer NOT NULL, "percentage_of_total" numeric(5,2) NOT NULL, "amount" numeric(15,2) NOT NULL, "disburse_at" date NOT NULL, "contract_id" uuid NOT NULL, CONSTRAINT "PK_bc75d64a82481fdf0dbbdf5ed3e" PRIMARY KEY ("propose_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "contracts" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "contract_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "contract_status" character varying(50) NOT NULL, "borrower_fullname" character varying(255) NOT NULL, "borrower_avatar" character varying(255), "borrower_address" character varying(255) NOT NULL, "borrower_phone_number" character varying(20) NOT NULL, "borrower_birthday" date NOT NULL, "borrower_sign" character varying(255) NOT NULL, "borrower_identify_card_number" character varying(50) NOT NULL, "lender_fullname" character varying(255) NOT NULL, "lender_address" character varying(255) NOT NULL, "lender_phone_number" character varying(20) NOT NULL, "lender_sign" character varying(255) NOT NULL, "payment_method" character varying(50) NOT NULL, "borrower_bank_account_name" character varying(255), "borrower_bank_account_number" character varying(50), "receive_money_address" character varying(255), "attachments" text, "loan_amount" numeric(15,2) NOT NULL, "loan_type" character varying(50) NOT NULL, "loan_package_name" character varying(255) NOT NULL, "loan_purpose" character varying(255) NOT NULL, "loan_term" integer NOT NULL, "loan_interest_rate" numeric(5,2) NOT NULL, "contract_type" character varying(50) NOT NULL, "hard_contract_document" text, "loan_request_id" uuid NOT NULL, "borrower_id" uuid NOT NULL, "lender_id" uuid NOT NULL, "loan_package_id" uuid NOT NULL, CONSTRAINT "PK_d4c091e72433a7125d9158170e7" PRIMARY KEY ("contract_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "loan_packages" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "loan_package_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "loan_package_name" character varying(255) NOT NULL, "interest_rate" numeric(5,2) NOT NULL, "loan_type" character varying(50) NOT NULL, "limit_amount" numeric(15,2) NOT NULL, "loan_term_limit" integer NOT NULL, "preference" text, "terms" text NOT NULL, "description" text, CONSTRAINT "PK_94c377fbd9a3227df147bad11c2" PRIMARY KEY ("loan_package_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "asset_types" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "asset_type_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "asset_type_name" character varying(255) NOT NULL, "description" text, CONSTRAINT "PK_f201cc1c160363ea58f6e4427d6" PRIMARY KEY ("asset_type_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "assets" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "asset_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "asset_name" character varying(255) NOT NULL, "description" text, "asset_type_id" uuid, CONSTRAINT "PK_ba1dca7766f77b6c475091f860c" PRIMARY KEY ("asset_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "loan_request_asset_details" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "loan_request_asset_detail_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "proof_document" text, "legal_ownership" text, "description" text, "loan_request_id" uuid, "asset_id" uuid, CONSTRAINT "PK_9d41e6fa2670b83d089dadacdb9" PRIMARY KEY ("loan_request_asset_detail_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "loan_requests" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "loan_request_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "borrower_fullname" character varying(255) NOT NULL, "borrower_avatar" character varying(255), "borrower_phone_number" character varying(15) NOT NULL, "borrower_email" character varying(255) NOT NULL, "borrower_identify_card_number" character varying(20) NOT NULL, "borrower_home_address" character varying(255) NOT NULL, "borrower_job_title" character varying(100) NOT NULL, "borrower_income" numeric(15,2) NOT NULL, "borrower_income_proof_documents" text, "loan_package_name" character varying(255) NOT NULL, "loan_amount" numeric(15,2) NOT NULL, "loan_purpose" text NOT NULL, "request_status" character varying(50) NOT NULL, "loan_type" character varying(50) NOT NULL, "interest_rate" numeric(5,2) NOT NULL, "loan_term" integer NOT NULL, "loan_request_form" text, "borrower_id" uuid, "loan_package_id" uuid, CONSTRAINT "PK_fe0efe7456b045ec73083485562" PRIMARY KEY ("loan_request_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "appraisal_details" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "detail_appraisal_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "appraisal_amount" numeric(15,2) NOT NULL, "surveyor" character varying(255), "notes" text, "appraisal_id" uuid, "loan_request_asset_detail_id" uuid, CONSTRAINT "PK_d5c2ff354fb26c9e466779313ef" PRIMARY KEY ("detail_appraisal_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "appraisals" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "appraisal_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "proof_document" text, "total_amount" numeric(15,2) NOT NULL, "status" character varying(50) NOT NULL, "loan_request_id" uuid, "appraisal_staff_id" uuid, CONSTRAINT "PK_4b6616b4941c54b0d52c3e6e557" PRIMARY KEY ("appraisal_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "employees" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "employee_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(30) NOT NULL, "phone_number" character varying(15) NOT NULL, "password" character varying(100) NOT NULL, "status" character varying(30) NOT NULL, "roleRoleId" character varying(70), CONSTRAINT "PK_c9a09b8e6588fb4d3c9051c8937" PRIMARY KEY ("employee_id"))`
    );
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_765bc1ac8967533a04c74a9f6a" ON "employees" ("email") `);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_027a331b2053bb37f39fb2704f" ON "employees" ("phone_number") `);
    await queryRunner.query(
      `CREATE TABLE "permission_specifics" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "user" uuid NOT NULL, "permission" uuid NOT NULL, "user_type" character varying(50) NOT NULL, "notes" text, "user_id" uuid NOT NULL, "permission_id" character varying NOT NULL, CONSTRAINT "PK_a6da6d648e7c3f46ddfc3e53e78" PRIMARY KEY ("user", "permission"))`
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "permission_id" character varying NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_1717db2235a5b169822e7f753b1" PRIMARY KEY ("permission_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "role_permissions" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "role_id" character varying NOT NULL, "permission_id" character varying NOT NULL, CONSTRAINT "PK_25d24010f53bb80b78e412c9656" PRIMARY KEY ("role_id", "permission_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "role_id" character varying(70) NOT NULL, "role_name" character varying(90) NOT NULL, CONSTRAINT "PK_09f4c8130b54f35925588a37b6a" PRIMARY KEY ("role_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "payment_slips" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "payment_slip_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "propose_id" character varying NOT NULL, "propose_type" character varying(50) NOT NULL, "content" text NOT NULL, "amount" numeric(15,2) NOT NULL, "payment_method" character varying(50) NOT NULL, "receiver_bank_account_name" character varying(255), "receiver_bank_account_number" character varying(50), "pay_address" character varying(255), "object_slip" character varying NOT NULL, "object_type" character varying NOT NULL, "date_slip" date NOT NULL, "attachments" text, CONSTRAINT "PK_89f1a565ed17c1657750ad14856" PRIMARY KEY ("payment_slip_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "receipts" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "receipt_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "propose_id" character varying NOT NULL, "propose_type" character varying(50) NOT NULL, "content" text NOT NULL, "amount" numeric(15,2) NOT NULL, "payment_method" character varying(50) NOT NULL, "sender_bank_account_name" character varying(255), "sender_bank_account_number" character varying(50), "pay_address" character varying(255), "object_receipt_id" character varying NOT NULL, "object_type" character varying NOT NULL, "receipt_date" date NOT NULL, "attachments" text, CONSTRAINT "PK_8613250be825686eb9bf90189b7" PRIMARY KEY ("receipt_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "status_contracts" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "tracking_object_id" character varying NOT NULL, "status" character varying(50) NOT NULL, "employee_change" uuid NOT NULL, CONSTRAINT "PK_15e0eab8590307108758c5ee032" PRIMARY KEY ("tracking_object_id", "status"))`
    );
    await queryRunner.query(
      `CREATE TABLE "vaults" ("create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "create_by" character varying, "update_by" character varying, "delete_at" TIMESTAMP, "vault_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "vault_name" character varying(255) NOT NULL, "cash_amount" numeric(15,2) NOT NULL, "account_amount" numeric(15,2) NOT NULL, "description" text, CONSTRAINT "PK_5f8f26ca47de86c9d41093c3eca" PRIMARY KEY ("vault_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "employee_profiles" ADD CONSTRAINT "FK_af55fd0477e7792007d7d2135aa" FOREIGN KEY ("employee_id") REFERENCES "employees"("employee_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "version_loan_packages" ADD CONSTRAINT "FK_aea5e02311334053366852e97bb" FOREIGN KEY ("loan_package_id") REFERENCES "loan_packages"("loan_package_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "borrower_profiles" ADD CONSTRAINT "FK_60e6b18c40776c1c40415dd7bc9" FOREIGN KEY ("borrower_id") REFERENCES "borrowers"("borrower_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_installments" ADD CONSTRAINT "FK_edc29d6e88c9b9acd0dee37a6a0" FOREIGN KEY ("contract_id") REFERENCES "contracts"("contract_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_installments" ADD CONSTRAINT "FK_6cd3d7d0a60a8ba59b768467aad" FOREIGN KEY ("customer_id") REFERENCES "borrowers"("borrower_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "notifications" ADD CONSTRAINT "FK_9e27cda04b2e3b6ce014d5aa58a" FOREIGN KEY ("subject_send_notice") REFERENCES "employees"("employee_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "lender_profiles" ADD CONSTRAINT "FK_a93495f947747e4b1ac16004ee9" FOREIGN KEY ("lender_id") REFERENCES "lenders"("lender_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tracking_contract_informations" ADD CONSTRAINT "FK_4c9ff9b1a2278ed1c4d827023e9" FOREIGN KEY ("contractIdContractId") REFERENCES "contracts"("contract_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_plans" ADD CONSTRAINT "FK_3538045545680e3c0cc44545804" FOREIGN KEY ("contract_id") REFERENCES "contracts"("contract_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "disbursement_plans" ADD CONSTRAINT "FK_8edc244ee9fd528bb995c70d9dd" FOREIGN KEY ("contract_id") REFERENCES "contracts"("contract_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD CONSTRAINT "FK_f83067a8edaa2748fe92af3f089" FOREIGN KEY ("loan_request_id") REFERENCES "loan_requests"("loan_request_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD CONSTRAINT "FK_c247e72d61d7604780f1aa08d0f" FOREIGN KEY ("borrower_id") REFERENCES "borrowers"("borrower_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD CONSTRAINT "FK_ff3123f395b0641452548aba38e" FOREIGN KEY ("lender_id") REFERENCES "lenders"("lender_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "contracts" ADD CONSTRAINT "FK_e33b1f7a1624ba01ded8517197c" FOREIGN KEY ("loan_package_id") REFERENCES "loan_packages"("loan_package_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "assets" ADD CONSTRAINT "FK_d43ed9e838f74bcc07b1266a8d6" FOREIGN KEY ("asset_type_id") REFERENCES "asset_types"("asset_type_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "loan_request_asset_details" ADD CONSTRAINT "FK_8ef7b1cc7cd64ced7a0c5a5aae6" FOREIGN KEY ("loan_request_id") REFERENCES "loan_requests"("loan_request_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "loan_request_asset_details" ADD CONSTRAINT "FK_a8e25506f98e8ffa6c4fcbab64f" FOREIGN KEY ("asset_id") REFERENCES "assets"("asset_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "loan_requests" ADD CONSTRAINT "FK_aec634ccd19e42612dc7a8f8a8f" FOREIGN KEY ("borrower_id") REFERENCES "borrowers"("borrower_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "loan_requests" ADD CONSTRAINT "FK_50fc456c1c2601a506464f95052" FOREIGN KEY ("loan_package_id") REFERENCES "loan_packages"("loan_package_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "appraisal_details" ADD CONSTRAINT "FK_b15bcf3b03cfcfdea61863e1e34" FOREIGN KEY ("appraisal_id") REFERENCES "appraisals"("appraisal_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "appraisal_details" ADD CONSTRAINT "FK_f997d976cb8762252a977718208" FOREIGN KEY ("loan_request_asset_detail_id") REFERENCES "loan_request_asset_details"("loan_request_asset_detail_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "appraisals" ADD CONSTRAINT "FK_e44e7a15daae28f776c3c4169b4" FOREIGN KEY ("loan_request_id") REFERENCES "loan_requests"("loan_request_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "appraisals" ADD CONSTRAINT "FK_9db426fef0772ae2c3c4de3f856" FOREIGN KEY ("appraisal_staff_id") REFERENCES "employees"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_71642e62cc87d68843badb5e7fc" FOREIGN KEY ("roleRoleId") REFERENCES "roles"("role_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_specifics" ADD CONSTRAINT "FK_9323bf7413dd1191ed48c408246" FOREIGN KEY ("user_id") REFERENCES "employees"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "permission_specifics" ADD CONSTRAINT "FK_d37d9220f3345d87f99b5612c28" FOREIGN KEY ("permission_id") REFERENCES "permissions"("permission_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_178199805b901ccd220ab7740ec" FOREIGN KEY ("role_id") REFERENCES "roles"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY ("permission_id") REFERENCES "permissions"("permission_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "status_contracts" ADD CONSTRAINT "FK_d7f5b2f82851eaa63e15364ddd6" FOREIGN KEY ("employee_change") REFERENCES "employees"("employee_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "status_contracts" DROP CONSTRAINT "FK_d7f5b2f82851eaa63e15364ddd6"`);
    await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_17022daf3f885f7d35423e9971e"`);
    await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_178199805b901ccd220ab7740ec"`);
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP CONSTRAINT "FK_d37d9220f3345d87f99b5612c28"`);
    await queryRunner.query(`ALTER TABLE "permission_specifics" DROP CONSTRAINT "FK_9323bf7413dd1191ed48c408246"`);
    await queryRunner.query(`ALTER TABLE "employees" DROP CONSTRAINT "FK_71642e62cc87d68843badb5e7fc"`);
    await queryRunner.query(`ALTER TABLE "appraisals" DROP CONSTRAINT "FK_9db426fef0772ae2c3c4de3f856"`);
    await queryRunner.query(`ALTER TABLE "appraisals" DROP CONSTRAINT "FK_e44e7a15daae28f776c3c4169b4"`);
    await queryRunner.query(`ALTER TABLE "appraisal_details" DROP CONSTRAINT "FK_f997d976cb8762252a977718208"`);
    await queryRunner.query(`ALTER TABLE "appraisal_details" DROP CONSTRAINT "FK_b15bcf3b03cfcfdea61863e1e34"`);
    await queryRunner.query(`ALTER TABLE "loan_requests" DROP CONSTRAINT "FK_50fc456c1c2601a506464f95052"`);
    await queryRunner.query(`ALTER TABLE "loan_requests" DROP CONSTRAINT "FK_aec634ccd19e42612dc7a8f8a8f"`);
    await queryRunner.query(
      `ALTER TABLE "loan_request_asset_details" DROP CONSTRAINT "FK_a8e25506f98e8ffa6c4fcbab64f"`
    );
    await queryRunner.query(
      `ALTER TABLE "loan_request_asset_details" DROP CONSTRAINT "FK_8ef7b1cc7cd64ced7a0c5a5aae6"`
    );
    await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_d43ed9e838f74bcc07b1266a8d6"`);
    await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_e33b1f7a1624ba01ded8517197c"`);
    await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_ff3123f395b0641452548aba38e"`);
    await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_c247e72d61d7604780f1aa08d0f"`);
    await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_f83067a8edaa2748fe92af3f089"`);
    await queryRunner.query(`ALTER TABLE "disbursement_plans" DROP CONSTRAINT "FK_8edc244ee9fd528bb995c70d9dd"`);
    await queryRunner.query(`ALTER TABLE "payment_plans" DROP CONSTRAINT "FK_3538045545680e3c0cc44545804"`);
    await queryRunner.query(
      `ALTER TABLE "tracking_contract_informations" DROP CONSTRAINT "FK_4c9ff9b1a2278ed1c4d827023e9"`
    );
    await queryRunner.query(`ALTER TABLE "lender_profiles" DROP CONSTRAINT "FK_a93495f947747e4b1ac16004ee9"`);
    await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_9e27cda04b2e3b6ce014d5aa58a"`);
    await queryRunner.query(`ALTER TABLE "payment_installments" DROP CONSTRAINT "FK_6cd3d7d0a60a8ba59b768467aad"`);
    await queryRunner.query(`ALTER TABLE "payment_installments" DROP CONSTRAINT "FK_edc29d6e88c9b9acd0dee37a6a0"`);
    await queryRunner.query(`ALTER TABLE "borrower_profiles" DROP CONSTRAINT "FK_60e6b18c40776c1c40415dd7bc9"`);
    await queryRunner.query(`ALTER TABLE "version_loan_packages" DROP CONSTRAINT "FK_aea5e02311334053366852e97bb"`);
    await queryRunner.query(`ALTER TABLE "employee_profiles" DROP CONSTRAINT "FK_af55fd0477e7792007d7d2135aa"`);
    await queryRunner.query(`DROP TABLE "vaults"`);
    await queryRunner.query(`DROP TABLE "status_contracts"`);
    await queryRunner.query(`DROP TABLE "receipts"`);
    await queryRunner.query(`DROP TABLE "payment_slips"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "role_permissions"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TABLE "permission_specifics"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_027a331b2053bb37f39fb2704f"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_765bc1ac8967533a04c74a9f6a"`);
    await queryRunner.query(`DROP TABLE "employees"`);
    await queryRunner.query(`DROP TABLE "appraisals"`);
    await queryRunner.query(`DROP TABLE "appraisal_details"`);
    await queryRunner.query(`DROP TABLE "loan_requests"`);
    await queryRunner.query(`DROP TABLE "loan_request_asset_details"`);
    await queryRunner.query(`DROP TABLE "assets"`);
    await queryRunner.query(`DROP TABLE "asset_types"`);
    await queryRunner.query(`DROP TABLE "loan_packages"`);
    await queryRunner.query(`DROP TABLE "contracts"`);
    await queryRunner.query(`DROP TABLE "disbursement_plans"`);
    await queryRunner.query(`DROP TABLE "payment_plans"`);
    await queryRunner.query(`DROP TABLE "tracking_contract_informations"`);
    await queryRunner.query(`DROP TABLE "lenders"`);
    await queryRunner.query(`DROP TABLE "lender_profiles"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_65c564167cd3f45352d5be48ba"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_9714fe82510c5c6d237eb7421f"`);
    await queryRunner.query(`DROP TABLE "borrowers"`);
    await queryRunner.query(`DROP TABLE "notifications"`);
    await queryRunner.query(`DROP TABLE "payment_installments"`);
    await queryRunner.query(`DROP TABLE "borrower_profiles"`);
    await queryRunner.query(`DROP TABLE "version_loan_packages"`);
    await queryRunner.query(`DROP TABLE "employee_profiles"`);
  }
}
