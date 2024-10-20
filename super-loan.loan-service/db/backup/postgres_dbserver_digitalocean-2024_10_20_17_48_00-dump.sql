--
-- PostgreSQL database dump
--

-- Dumped from database version 15.7 (Debian 15.7-1.pgdg120+1)
-- Dumped by pg_dump version 15.8 (Debian 15.8-0+deb12u1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appraisal_details; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.appraisal_details (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    detail_appraisal_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    appraisal_amount numeric(15,2) NOT NULL,
    surveyor character varying(255),
    notes text,
    appraisal_id uuid,
    loan_request_asset_detail_id uuid
);


ALTER TABLE public.appraisal_details OWNER TO super_loan_dev;

--
-- Name: appraisals; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.appraisals (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    appraisal_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    proof_document text,
    total_amount numeric(15,2) NOT NULL,
    status character varying(50) NOT NULL,
    loan_request_id uuid,
    appraisal_staff_id uuid
);


ALTER TABLE public.appraisals OWNER TO super_loan_dev;

--
-- Name: asset_types; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.asset_types (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    asset_type_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    asset_type_name character varying(255) NOT NULL,
    description text
);


ALTER TABLE public.asset_types OWNER TO super_loan_dev;

--
-- Name: assets; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.assets (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    asset_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    asset_name character varying(255) NOT NULL,
    description text,
    asset_type_id uuid
);


ALTER TABLE public.assets OWNER TO super_loan_dev;

--
-- Name: borrower_profiles; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.borrower_profiles (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    borrower_id uuid NOT NULL,
    fullname character varying(100) NOT NULL,
    avatar text NOT NULL,
    emails text NOT NULL,
    phone_number text NOT NULL,
    job_tittle character varying(100) NOT NULL,
    income numeric(10,2) NOT NULL,
    identify_card_number character varying(50) NOT NULL,
    identify_card_issued_date date NOT NULL,
    identify_card_issued_place character varying(255) NOT NULL,
    borrower_income_proof_documents text,
    home_address character varying(255) NOT NULL,
    work_address character varying(255),
    birthday date NOT NULL,
    gender character varying(10) NOT NULL,
    social_link character varying(255),
    bank_accounts jsonb,
    sign_attachments character varying(255)
);


ALTER TABLE public.borrower_profiles OWNER TO super_loan_dev;

--
-- Name: borrowers; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.borrowers (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    borrower_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(100) NOT NULL,
    phone_number character varying(15) NOT NULL,
    password character varying(100) NOT NULL,
    social_login_type character varying(20) NOT NULL,
    social_uid character varying(255),
    status character varying(20) NOT NULL
);


ALTER TABLE public.borrowers OWNER TO super_loan_dev;

--
-- Name: contracts; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.contracts (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    contract_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    contract_status character varying(50) NOT NULL,
    borrower_fullname character varying(255) NOT NULL,
    borrower_avatar character varying(255),
    borrower_address character varying(255) NOT NULL,
    borrower_phone_number character varying(20) NOT NULL,
    borrower_birthday date NOT NULL,
    borrower_sign character varying(255) NOT NULL,
    borrower_identify_card_number character varying(50) NOT NULL,
    lender_fullname character varying(255) NOT NULL,
    lender_address character varying(255) NOT NULL,
    lender_phone_number character varying(20) NOT NULL,
    lender_sign character varying(255) NOT NULL,
    payment_method character varying(50) NOT NULL,
    borrower_bank_account_name character varying(255),
    borrower_bank_account_number character varying(50),
    receive_money_address character varying(255),
    attachments text,
    loan_amount numeric(15,2) NOT NULL,
    loan_type character varying(50) NOT NULL,
    loan_package_name character varying(255) NOT NULL,
    loan_purpose character varying(255) NOT NULL,
    loan_term integer NOT NULL,
    loan_interest_rate numeric(5,2) NOT NULL,
    contract_type character varying(50) NOT NULL,
    hard_contract_document text,
    loan_request_id uuid NOT NULL,
    borrower_id uuid NOT NULL,
    lender_id uuid NOT NULL,
    loan_package_id uuid NOT NULL
);


ALTER TABLE public.contracts OWNER TO super_loan_dev;

--
-- Name: disbursement_plans; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.disbursement_plans (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    propose_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    disbursement_installment integer NOT NULL,
    percentage_of_total numeric(5,2) NOT NULL,
    amount numeric(15,2) NOT NULL,
    disburse_at date NOT NULL,
    contract_id uuid NOT NULL
);


ALTER TABLE public.disbursement_plans OWNER TO super_loan_dev;

--
-- Name: employee_profiles; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.employee_profiles (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    employee_id uuid NOT NULL,
    avatar text NOT NULL,
    emails text NOT NULL,
    phone_numbers text NOT NULL,
    fullname character varying(100) NOT NULL,
    identify_card_number character varying(50) NOT NULL,
    home_address character varying(255) NOT NULL,
    birthday date NOT NULL,
    gender character varying(10) NOT NULL,
    social_link character varying(255) NOT NULL,
    sign_attachments text NOT NULL
);


ALTER TABLE public.employee_profiles OWNER TO super_loan_dev;

--
-- Name: employees; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.employees (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    employee_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(30) NOT NULL,
    phone_number character varying(15) NOT NULL,
    password character varying(100) NOT NULL,
    status character varying(30) NOT NULL,
    "roleRoleId" character varying(70)
);


ALTER TABLE public.employees OWNER TO super_loan_dev;

--
-- Name: lender_profiles; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.lender_profiles (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    lender_id uuid NOT NULL,
    fullname character varying(255) NOT NULL,
    avatar character varying(255),
    job_title character varying(100),
    emails text,
    phone_numbers text,
    company_name character varying(255),
    company_address character varying(255),
    company_tax_code character varying(50),
    bank_accounts json,
    description text,
    social_link character varying(255),
    sign text
);


ALTER TABLE public.lender_profiles OWNER TO super_loan_dev;

--
-- Name: lenders; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.lenders (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    lender_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(255) NOT NULL,
    phone_number character varying(15) NOT NULL,
    password character varying(255) NOT NULL,
    social_login_type character varying(50),
    social_uid character varying(255),
    status character varying(50) NOT NULL
);


ALTER TABLE public.lenders OWNER TO super_loan_dev;

--
-- Name: loan_packages; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.loan_packages (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    loan_package_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    loan_package_name character varying(255) NOT NULL,
    interest_rate numeric(5,2) NOT NULL,
    loan_type character varying(50) NOT NULL,
    limit_amount numeric(15,2) NOT NULL,
    loan_term_limit integer NOT NULL,
    preference text,
    terms text NOT NULL,
    description text
);


ALTER TABLE public.loan_packages OWNER TO super_loan_dev;

--
-- Name: loan_request_asset_details; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.loan_request_asset_details (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    loan_request_asset_detail_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    proof_document text,
    legal_ownership text,
    description text,
    loan_request_id uuid,
    asset_id uuid
);


ALTER TABLE public.loan_request_asset_details OWNER TO super_loan_dev;

--
-- Name: loan_requests; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.loan_requests (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    loan_request_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    borrower_fullname character varying(255) NOT NULL,
    borrower_avatar character varying(255),
    borrower_phone_number character varying(15) NOT NULL,
    borrower_email character varying(255) NOT NULL,
    borrower_identify_card_number character varying(20) NOT NULL,
    borrower_home_address character varying(255) NOT NULL,
    borrower_job_title character varying(100) NOT NULL,
    borrower_income numeric(15,2) NOT NULL,
    borrower_income_proof_documents text,
    loan_package_name character varying(255) NOT NULL,
    loan_amount numeric(15,2) NOT NULL,
    loan_purpose text NOT NULL,
    request_status character varying(50) NOT NULL,
    loan_type character varying(50) NOT NULL,
    interest_rate numeric(5,2) NOT NULL,
    loan_term integer NOT NULL,
    loan_request_form text,
    borrower_id uuid,
    loan_package_id uuid
);


ALTER TABLE public.loan_requests OWNER TO super_loan_dev;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO super_loan_dev;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: super_loan_dev
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO super_loan_dev;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: super_loan_dev
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.notifications (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    notification_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    propose_id character varying NOT NULL,
    object_receive_notices json NOT NULL,
    title_name character varying(255) NOT NULL,
    noti_type character varying(50) NOT NULL,
    subject_send_notice uuid
);


ALTER TABLE public.notifications OWNER TO super_loan_dev;

--
-- Name: payment_installments; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.payment_installments (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    payment_installment_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    payment_installment integer NOT NULL,
    percentage_of_total numeric(5,2) NOT NULL,
    payment_method character varying(50) NOT NULL,
    notes text,
    payment_status character varying(50) NOT NULL,
    contract_id uuid NOT NULL,
    customer_id uuid NOT NULL
);


ALTER TABLE public.payment_installments OWNER TO super_loan_dev;

--
-- Name: payment_plans; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.payment_plans (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    propose_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    payment_installment integer NOT NULL,
    percentage_of_total numeric(5,2) NOT NULL,
    amount numeric(15,2) NOT NULL,
    start_pay_at date NOT NULL,
    end_pay_at date NOT NULL,
    days integer NOT NULL,
    contract_id uuid NOT NULL
);


ALTER TABLE public.payment_plans OWNER TO super_loan_dev;

--
-- Name: payment_slips; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.payment_slips (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    payment_slip_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    propose_id character varying NOT NULL,
    propose_type character varying(50) NOT NULL,
    content text NOT NULL,
    amount numeric(15,2) NOT NULL,
    payment_method character varying(50) NOT NULL,
    receiver_bank_account_name character varying(255),
    receiver_bank_account_number character varying(50),
    pay_address character varying(255),
    object_slip character varying NOT NULL,
    object_type character varying NOT NULL,
    date_slip date NOT NULL,
    attachments text
);


ALTER TABLE public.payment_slips OWNER TO super_loan_dev;

--
-- Name: permission_specifics; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.permission_specifics (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    "user" uuid NOT NULL,
    permission uuid NOT NULL,
    user_type character varying(50) NOT NULL,
    notes text,
    user_id uuid NOT NULL,
    permission_id character varying NOT NULL
);


ALTER TABLE public.permission_specifics OWNER TO super_loan_dev;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.permissions (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    permission_id character varying NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE public.permissions OWNER TO super_loan_dev;

--
-- Name: receipts; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.receipts (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    receipt_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    propose_id character varying NOT NULL,
    propose_type character varying(50) NOT NULL,
    content text NOT NULL,
    amount numeric(15,2) NOT NULL,
    payment_method character varying(50) NOT NULL,
    sender_bank_account_name character varying(255),
    sender_bank_account_number character varying(50),
    pay_address character varying(255),
    object_receipt_id character varying NOT NULL,
    object_type character varying NOT NULL,
    receipt_date date NOT NULL,
    attachments text
);


ALTER TABLE public.receipts OWNER TO super_loan_dev;

--
-- Name: role_permissions; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.role_permissions (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    role_id character varying NOT NULL,
    permission_id character varying NOT NULL
);


ALTER TABLE public.role_permissions OWNER TO super_loan_dev;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.roles (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    role_id character varying(70) NOT NULL,
    role_name character varying(90) NOT NULL
);


ALTER TABLE public.roles OWNER TO super_loan_dev;

--
-- Name: status_contracts; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.status_contracts (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    tracking_object_id character varying NOT NULL,
    status character varying(50) NOT NULL,
    employee_change uuid NOT NULL
);


ALTER TABLE public.status_contracts OWNER TO super_loan_dev;

--
-- Name: tracking_contract_informations; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.tracking_contract_informations (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    contract_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    loan_request_id character varying NOT NULL,
    contract_status character varying(50) NOT NULL,
    borrower_fullname character varying(255) NOT NULL,
    borrower_avatar character varying NOT NULL,
    borrower_address character varying(255) NOT NULL,
    borrower_phone_number character varying(15) NOT NULL,
    borrower_birthday date NOT NULL,
    borrower_sign text NOT NULL,
    borrower_identify_card_number character varying(20) NOT NULL,
    lender_fullname character varying(255) NOT NULL,
    lender_address character varying(255) NOT NULL,
    lender_phone_number character varying(15) NOT NULL,
    lender_sign text NOT NULL,
    payment_method character varying(50) NOT NULL,
    borrower_bank_account_name character varying(255),
    borrower_bank_account_number character varying(50),
    receive_money_address character varying(255),
    attachments text,
    loan_amount numeric(15,2) NOT NULL,
    loan_type character varying(50) NOT NULL,
    loan_package_id character varying NOT NULL,
    loan_package_name character varying(255) NOT NULL,
    loan_purpose text NOT NULL,
    loan_term integer NOT NULL,
    loan_interest_rate numeric(5,2) NOT NULL,
    contract_type character varying(50) NOT NULL,
    hard_contract_document character varying,
    "contractIdContractId" uuid
);


ALTER TABLE public.tracking_contract_informations OWNER TO super_loan_dev;

--
-- Name: vaults; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.vaults (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    vault_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    vault_name character varying(255) NOT NULL,
    cash_amount numeric(15,2) NOT NULL,
    account_amount numeric(15,2) NOT NULL,
    description text
);


ALTER TABLE public.vaults OWNER TO super_loan_dev;

--
-- Name: version_loan_packages; Type: TABLE; Schema: public; Owner: super_loan_dev
--

CREATE TABLE public.version_loan_packages (
    create_at timestamp without time zone DEFAULT now() NOT NULL,
    update_at timestamp without time zone DEFAULT now() NOT NULL,
    create_by character varying,
    update_by character varying,
    delete_at timestamp without time zone,
    loan_package_id uuid NOT NULL,
    version integer NOT NULL,
    loan_package_name character varying(255) NOT NULL,
    interest_rate numeric(5,2) NOT NULL,
    loan_type character varying(50) NOT NULL,
    limit_amount numeric(15,2) NOT NULL,
    loan_term_limit integer NOT NULL,
    preference text,
    terms text NOT NULL,
    description text
);


ALTER TABLE public.version_loan_packages OWNER TO super_loan_dev;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: appraisal_details; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.appraisal_details (create_at, update_at, create_by, update_by, delete_at, detail_appraisal_id, appraisal_amount, surveyor, notes, appraisal_id, loan_request_asset_detail_id) FROM stdin;
\.


--
-- Data for Name: appraisals; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.appraisals (create_at, update_at, create_by, update_by, delete_at, appraisal_id, proof_document, total_amount, status, loan_request_id, appraisal_staff_id) FROM stdin;
\.


--
-- Data for Name: asset_types; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.asset_types (create_at, update_at, create_by, update_by, delete_at, asset_type_id, asset_type_name, description) FROM stdin;
\.


--
-- Data for Name: assets; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.assets (create_at, update_at, create_by, update_by, delete_at, asset_id, asset_name, description, asset_type_id) FROM stdin;
\.


--
-- Data for Name: borrower_profiles; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.borrower_profiles (create_at, update_at, create_by, update_by, delete_at, borrower_id, fullname, avatar, emails, phone_number, job_tittle, income, identify_card_number, identify_card_issued_date, identify_card_issued_place, borrower_income_proof_documents, home_address, work_address, birthday, gender, social_link, bank_accounts, sign_attachments) FROM stdin;
\.


--
-- Data for Name: borrowers; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.borrowers (create_at, update_at, create_by, update_by, delete_at, borrower_id, email, phone_number, password, social_login_type, social_uid, status) FROM stdin;
\.


--
-- Data for Name: contracts; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.contracts (create_at, update_at, create_by, update_by, delete_at, contract_id, contract_status, borrower_fullname, borrower_avatar, borrower_address, borrower_phone_number, borrower_birthday, borrower_sign, borrower_identify_card_number, lender_fullname, lender_address, lender_phone_number, lender_sign, payment_method, borrower_bank_account_name, borrower_bank_account_number, receive_money_address, attachments, loan_amount, loan_type, loan_package_name, loan_purpose, loan_term, loan_interest_rate, contract_type, hard_contract_document, loan_request_id, borrower_id, lender_id, loan_package_id) FROM stdin;
\.


--
-- Data for Name: disbursement_plans; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.disbursement_plans (create_at, update_at, create_by, update_by, delete_at, propose_id, disbursement_installment, percentage_of_total, amount, disburse_at, contract_id) FROM stdin;
\.


--
-- Data for Name: employee_profiles; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.employee_profiles (create_at, update_at, create_by, update_by, delete_at, employee_id, avatar, emails, phone_numbers, fullname, identify_card_number, home_address, birthday, gender, social_link, sign_attachments) FROM stdin;
\.


--
-- Data for Name: employees; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.employees (create_at, update_at, create_by, update_by, delete_at, employee_id, email, phone_number, password, status, "roleRoleId") FROM stdin;
\.


--
-- Data for Name: lender_profiles; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.lender_profiles (create_at, update_at, create_by, update_by, delete_at, lender_id, fullname, avatar, job_title, emails, phone_numbers, company_name, company_address, company_tax_code, bank_accounts, description, social_link, sign) FROM stdin;
\.


--
-- Data for Name: lenders; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.lenders (create_at, update_at, create_by, update_by, delete_at, lender_id, email, phone_number, password, social_login_type, social_uid, status) FROM stdin;
\.


--
-- Data for Name: loan_packages; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.loan_packages (create_at, update_at, create_by, update_by, delete_at, loan_package_id, loan_package_name, interest_rate, loan_type, limit_amount, loan_term_limit, preference, terms, description) FROM stdin;
\.


--
-- Data for Name: loan_request_asset_details; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.loan_request_asset_details (create_at, update_at, create_by, update_by, delete_at, loan_request_asset_detail_id, proof_document, legal_ownership, description, loan_request_id, asset_id) FROM stdin;
\.


--
-- Data for Name: loan_requests; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.loan_requests (create_at, update_at, create_by, update_by, delete_at, loan_request_id, borrower_fullname, borrower_avatar, borrower_phone_number, borrower_email, borrower_identify_card_number, borrower_home_address, borrower_job_title, borrower_income, borrower_income_proof_documents, loan_package_name, loan_amount, loan_purpose, request_status, loan_type, interest_rate, loan_term, loan_request_form, borrower_id, loan_package_id) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1729421017027	Migrations1729421017027
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.notifications (create_at, update_at, create_by, update_by, delete_at, notification_id, propose_id, object_receive_notices, title_name, noti_type, subject_send_notice) FROM stdin;
\.


--
-- Data for Name: payment_installments; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.payment_installments (create_at, update_at, create_by, update_by, delete_at, payment_installment_id, payment_installment, percentage_of_total, payment_method, notes, payment_status, contract_id, customer_id) FROM stdin;
\.


--
-- Data for Name: payment_plans; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.payment_plans (create_at, update_at, create_by, update_by, delete_at, propose_id, payment_installment, percentage_of_total, amount, start_pay_at, end_pay_at, days, contract_id) FROM stdin;
\.


--
-- Data for Name: payment_slips; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.payment_slips (create_at, update_at, create_by, update_by, delete_at, payment_slip_id, propose_id, propose_type, content, amount, payment_method, receiver_bank_account_name, receiver_bank_account_number, pay_address, object_slip, object_type, date_slip, attachments) FROM stdin;
\.


--
-- Data for Name: permission_specifics; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.permission_specifics (create_at, update_at, create_by, update_by, delete_at, "user", permission, user_type, notes, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.permissions (create_at, update_at, create_by, update_by, delete_at, permission_id, description) FROM stdin;
\.


--
-- Data for Name: receipts; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.receipts (create_at, update_at, create_by, update_by, delete_at, receipt_id, propose_id, propose_type, content, amount, payment_method, sender_bank_account_name, sender_bank_account_number, pay_address, object_receipt_id, object_type, receipt_date, attachments) FROM stdin;
\.


--
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.role_permissions (create_at, update_at, create_by, update_by, delete_at, role_id, permission_id) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.roles (create_at, update_at, create_by, update_by, delete_at, role_id, role_name) FROM stdin;
\.


--
-- Data for Name: status_contracts; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.status_contracts (create_at, update_at, create_by, update_by, delete_at, tracking_object_id, status, employee_change) FROM stdin;
\.


--
-- Data for Name: tracking_contract_informations; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.tracking_contract_informations (create_at, update_at, create_by, update_by, delete_at, contract_id, loan_request_id, contract_status, borrower_fullname, borrower_avatar, borrower_address, borrower_phone_number, borrower_birthday, borrower_sign, borrower_identify_card_number, lender_fullname, lender_address, lender_phone_number, lender_sign, payment_method, borrower_bank_account_name, borrower_bank_account_number, receive_money_address, attachments, loan_amount, loan_type, loan_package_id, loan_package_name, loan_purpose, loan_term, loan_interest_rate, contract_type, hard_contract_document, "contractIdContractId") FROM stdin;
\.


--
-- Data for Name: vaults; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.vaults (create_at, update_at, create_by, update_by, delete_at, vault_id, vault_name, cash_amount, account_amount, description) FROM stdin;
\.


--
-- Data for Name: version_loan_packages; Type: TABLE DATA; Schema: public; Owner: super_loan_dev
--

COPY public.version_loan_packages (create_at, update_at, create_by, update_by, delete_at, loan_package_id, version, loan_package_name, interest_rate, loan_type, limit_amount, loan_term_limit, preference, terms, description) FROM stdin;
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: super_loan_dev
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- Name: roles PK_09f4c8130b54f35925588a37b6a; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_09f4c8130b54f35925588a37b6a" PRIMARY KEY (role_id);


--
-- Name: status_contracts PK_15e0eab8590307108758c5ee032; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.status_contracts
    ADD CONSTRAINT "PK_15e0eab8590307108758c5ee032" PRIMARY KEY (tracking_object_id, status);


--
-- Name: permissions PK_1717db2235a5b169822e7f753b1; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT "PK_1717db2235a5b169822e7f753b1" PRIMARY KEY (permission_id);


--
-- Name: tracking_contract_informations PK_24877221bea42fa552143bbc5a3; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.tracking_contract_informations
    ADD CONSTRAINT "PK_24877221bea42fa552143bbc5a3" PRIMARY KEY (contract_id);


--
-- Name: role_permissions PK_25d24010f53bb80b78e412c9656; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT "PK_25d24010f53bb80b78e412c9656" PRIMARY KEY (role_id, permission_id);


--
-- Name: lenders PK_4783e7d44effdc02a9aa0c5e979; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.lenders
    ADD CONSTRAINT "PK_4783e7d44effdc02a9aa0c5e979" PRIMARY KEY (lender_id);


--
-- Name: appraisals PK_4b6616b4941c54b0d52c3e6e557; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.appraisals
    ADD CONSTRAINT "PK_4b6616b4941c54b0d52c3e6e557" PRIMARY KEY (appraisal_id);


--
-- Name: borrowers PK_5eae4c8cadc0ccc9a45c618b823; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.borrowers
    ADD CONSTRAINT "PK_5eae4c8cadc0ccc9a45c618b823" PRIMARY KEY (borrower_id);


--
-- Name: vaults PK_5f8f26ca47de86c9d41093c3eca; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.vaults
    ADD CONSTRAINT "PK_5f8f26ca47de86c9d41093c3eca" PRIMARY KEY (vault_id);


--
-- Name: borrower_profiles PK_60e6b18c40776c1c40415dd7bc9; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.borrower_profiles
    ADD CONSTRAINT "PK_60e6b18c40776c1c40415dd7bc9" PRIMARY KEY (borrower_id);


--
-- Name: payment_installments PK_62bbc4ebfe60f304fb34fd61504; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.payment_installments
    ADD CONSTRAINT "PK_62bbc4ebfe60f304fb34fd61504" PRIMARY KEY (payment_installment_id);


--
-- Name: receipts PK_8613250be825686eb9bf90189b7; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.receipts
    ADD CONSTRAINT "PK_8613250be825686eb9bf90189b7" PRIMARY KEY (receipt_id);


--
-- Name: payment_slips PK_89f1a565ed17c1657750ad14856; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.payment_slips
    ADD CONSTRAINT "PK_89f1a565ed17c1657750ad14856" PRIMARY KEY (payment_slip_id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: loan_packages PK_94c377fbd9a3227df147bad11c2; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.loan_packages
    ADD CONSTRAINT "PK_94c377fbd9a3227df147bad11c2" PRIMARY KEY (loan_package_id);


--
-- Name: loan_request_asset_details PK_9d41e6fa2670b83d089dadacdb9; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.loan_request_asset_details
    ADD CONSTRAINT "PK_9d41e6fa2670b83d089dadacdb9" PRIMARY KEY (loan_request_asset_detail_id);


--
-- Name: permission_specifics PK_a6da6d648e7c3f46ddfc3e53e78; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.permission_specifics
    ADD CONSTRAINT "PK_a6da6d648e7c3f46ddfc3e53e78" PRIMARY KEY ("user", permission);


--
-- Name: lender_profiles PK_a93495f947747e4b1ac16004ee9; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.lender_profiles
    ADD CONSTRAINT "PK_a93495f947747e4b1ac16004ee9" PRIMARY KEY (lender_id);


--
-- Name: employee_profiles PK_af55fd0477e7792007d7d2135aa; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.employee_profiles
    ADD CONSTRAINT "PK_af55fd0477e7792007d7d2135aa" PRIMARY KEY (employee_id);


--
-- Name: assets PK_ba1dca7766f77b6c475091f860c; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT "PK_ba1dca7766f77b6c475091f860c" PRIMARY KEY (asset_id);


--
-- Name: disbursement_plans PK_bc75d64a82481fdf0dbbdf5ed3e; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.disbursement_plans
    ADD CONSTRAINT "PK_bc75d64a82481fdf0dbbdf5ed3e" PRIMARY KEY (propose_id);


--
-- Name: payment_plans PK_c11cc424c80b86b98383b7287e1; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.payment_plans
    ADD CONSTRAINT "PK_c11cc424c80b86b98383b7287e1" PRIMARY KEY (propose_id);


--
-- Name: version_loan_packages PK_c7020014b96a86ab93f2446a1f0; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.version_loan_packages
    ADD CONSTRAINT "PK_c7020014b96a86ab93f2446a1f0" PRIMARY KEY (loan_package_id, version);


--
-- Name: employees PK_c9a09b8e6588fb4d3c9051c8937; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "PK_c9a09b8e6588fb4d3c9051c8937" PRIMARY KEY (employee_id);


--
-- Name: contracts PK_d4c091e72433a7125d9158170e7; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT "PK_d4c091e72433a7125d9158170e7" PRIMARY KEY (contract_id);


--
-- Name: appraisal_details PK_d5c2ff354fb26c9e466779313ef; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.appraisal_details
    ADD CONSTRAINT "PK_d5c2ff354fb26c9e466779313ef" PRIMARY KEY (detail_appraisal_id);


--
-- Name: notifications PK_eaedfe19f0f765d26afafa85956; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "PK_eaedfe19f0f765d26afafa85956" PRIMARY KEY (notification_id);


--
-- Name: asset_types PK_f201cc1c160363ea58f6e4427d6; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.asset_types
    ADD CONSTRAINT "PK_f201cc1c160363ea58f6e4427d6" PRIMARY KEY (asset_type_id);


--
-- Name: loan_requests PK_fe0efe7456b045ec73083485562; Type: CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.loan_requests
    ADD CONSTRAINT "PK_fe0efe7456b045ec73083485562" PRIMARY KEY (loan_request_id);


--
-- Name: IDX_027a331b2053bb37f39fb2704f; Type: INDEX; Schema: public; Owner: super_loan_dev
--

CREATE UNIQUE INDEX "IDX_027a331b2053bb37f39fb2704f" ON public.employees USING btree (phone_number);


--
-- Name: IDX_65c564167cd3f45352d5be48ba; Type: INDEX; Schema: public; Owner: super_loan_dev
--

CREATE UNIQUE INDEX "IDX_65c564167cd3f45352d5be48ba" ON public.borrowers USING btree (phone_number);


--
-- Name: IDX_765bc1ac8967533a04c74a9f6a; Type: INDEX; Schema: public; Owner: super_loan_dev
--

CREATE UNIQUE INDEX "IDX_765bc1ac8967533a04c74a9f6a" ON public.employees USING btree (email);


--
-- Name: IDX_9714fe82510c5c6d237eb7421f; Type: INDEX; Schema: public; Owner: super_loan_dev
--

CREATE UNIQUE INDEX "IDX_9714fe82510c5c6d237eb7421f" ON public.borrowers USING btree (email);


--
-- Name: role_permissions FK_17022daf3f885f7d35423e9971e; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY (permission_id) REFERENCES public.permissions(permission_id);


--
-- Name: role_permissions FK_178199805b901ccd220ab7740ec; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT "FK_178199805b901ccd220ab7740ec" FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


--
-- Name: payment_plans FK_3538045545680e3c0cc44545804; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.payment_plans
    ADD CONSTRAINT "FK_3538045545680e3c0cc44545804" FOREIGN KEY (contract_id) REFERENCES public.contracts(contract_id);


--
-- Name: tracking_contract_informations FK_4c9ff9b1a2278ed1c4d827023e9; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.tracking_contract_informations
    ADD CONSTRAINT "FK_4c9ff9b1a2278ed1c4d827023e9" FOREIGN KEY ("contractIdContractId") REFERENCES public.contracts(contract_id);


--
-- Name: loan_requests FK_50fc456c1c2601a506464f95052; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.loan_requests
    ADD CONSTRAINT "FK_50fc456c1c2601a506464f95052" FOREIGN KEY (loan_package_id) REFERENCES public.loan_packages(loan_package_id);


--
-- Name: borrower_profiles FK_60e6b18c40776c1c40415dd7bc9; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.borrower_profiles
    ADD CONSTRAINT "FK_60e6b18c40776c1c40415dd7bc9" FOREIGN KEY (borrower_id) REFERENCES public.borrowers(borrower_id) ON DELETE CASCADE;


--
-- Name: payment_installments FK_6cd3d7d0a60a8ba59b768467aad; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.payment_installments
    ADD CONSTRAINT "FK_6cd3d7d0a60a8ba59b768467aad" FOREIGN KEY (customer_id) REFERENCES public.borrowers(borrower_id);


--
-- Name: employees FK_71642e62cc87d68843badb5e7fc; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.employees
    ADD CONSTRAINT "FK_71642e62cc87d68843badb5e7fc" FOREIGN KEY ("roleRoleId") REFERENCES public.roles(role_id) ON DELETE CASCADE;


--
-- Name: disbursement_plans FK_8edc244ee9fd528bb995c70d9dd; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.disbursement_plans
    ADD CONSTRAINT "FK_8edc244ee9fd528bb995c70d9dd" FOREIGN KEY (contract_id) REFERENCES public.contracts(contract_id);


--
-- Name: loan_request_asset_details FK_8ef7b1cc7cd64ced7a0c5a5aae6; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.loan_request_asset_details
    ADD CONSTRAINT "FK_8ef7b1cc7cd64ced7a0c5a5aae6" FOREIGN KEY (loan_request_id) REFERENCES public.loan_requests(loan_request_id);


--
-- Name: permission_specifics FK_9323bf7413dd1191ed48c408246; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.permission_specifics
    ADD CONSTRAINT "FK_9323bf7413dd1191ed48c408246" FOREIGN KEY (user_id) REFERENCES public.employees(employee_id);


--
-- Name: appraisals FK_9db426fef0772ae2c3c4de3f856; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.appraisals
    ADD CONSTRAINT "FK_9db426fef0772ae2c3c4de3f856" FOREIGN KEY (appraisal_staff_id) REFERENCES public.employees(employee_id);


--
-- Name: notifications FK_9e27cda04b2e3b6ce014d5aa58a; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "FK_9e27cda04b2e3b6ce014d5aa58a" FOREIGN KEY (subject_send_notice) REFERENCES public.employees(employee_id) ON DELETE CASCADE;


--
-- Name: loan_request_asset_details FK_a8e25506f98e8ffa6c4fcbab64f; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.loan_request_asset_details
    ADD CONSTRAINT "FK_a8e25506f98e8ffa6c4fcbab64f" FOREIGN KEY (asset_id) REFERENCES public.assets(asset_id);


--
-- Name: lender_profiles FK_a93495f947747e4b1ac16004ee9; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.lender_profiles
    ADD CONSTRAINT "FK_a93495f947747e4b1ac16004ee9" FOREIGN KEY (lender_id) REFERENCES public.lenders(lender_id) ON DELETE CASCADE;


--
-- Name: version_loan_packages FK_aea5e02311334053366852e97bb; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.version_loan_packages
    ADD CONSTRAINT "FK_aea5e02311334053366852e97bb" FOREIGN KEY (loan_package_id) REFERENCES public.loan_packages(loan_package_id) ON DELETE CASCADE;


--
-- Name: loan_requests FK_aec634ccd19e42612dc7a8f8a8f; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.loan_requests
    ADD CONSTRAINT "FK_aec634ccd19e42612dc7a8f8a8f" FOREIGN KEY (borrower_id) REFERENCES public.borrowers(borrower_id) ON DELETE CASCADE;


--
-- Name: employee_profiles FK_af55fd0477e7792007d7d2135aa; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.employee_profiles
    ADD CONSTRAINT "FK_af55fd0477e7792007d7d2135aa" FOREIGN KEY (employee_id) REFERENCES public.employees(employee_id) ON DELETE CASCADE;


--
-- Name: appraisal_details FK_b15bcf3b03cfcfdea61863e1e34; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.appraisal_details
    ADD CONSTRAINT "FK_b15bcf3b03cfcfdea61863e1e34" FOREIGN KEY (appraisal_id) REFERENCES public.appraisals(appraisal_id);


--
-- Name: contracts FK_c247e72d61d7604780f1aa08d0f; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT "FK_c247e72d61d7604780f1aa08d0f" FOREIGN KEY (borrower_id) REFERENCES public.borrowers(borrower_id);


--
-- Name: permission_specifics FK_d37d9220f3345d87f99b5612c28; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.permission_specifics
    ADD CONSTRAINT "FK_d37d9220f3345d87f99b5612c28" FOREIGN KEY (permission_id) REFERENCES public.permissions(permission_id);


--
-- Name: assets FK_d43ed9e838f74bcc07b1266a8d6; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT "FK_d43ed9e838f74bcc07b1266a8d6" FOREIGN KEY (asset_type_id) REFERENCES public.asset_types(asset_type_id);


--
-- Name: status_contracts FK_d7f5b2f82851eaa63e15364ddd6; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.status_contracts
    ADD CONSTRAINT "FK_d7f5b2f82851eaa63e15364ddd6" FOREIGN KEY (employee_change) REFERENCES public.employees(employee_id);


--
-- Name: contracts FK_e33b1f7a1624ba01ded8517197c; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT "FK_e33b1f7a1624ba01ded8517197c" FOREIGN KEY (loan_package_id) REFERENCES public.loan_packages(loan_package_id);


--
-- Name: appraisals FK_e44e7a15daae28f776c3c4169b4; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.appraisals
    ADD CONSTRAINT "FK_e44e7a15daae28f776c3c4169b4" FOREIGN KEY (loan_request_id) REFERENCES public.loan_requests(loan_request_id);


--
-- Name: payment_installments FK_edc29d6e88c9b9acd0dee37a6a0; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.payment_installments
    ADD CONSTRAINT "FK_edc29d6e88c9b9acd0dee37a6a0" FOREIGN KEY (contract_id) REFERENCES public.contracts(contract_id);


--
-- Name: contracts FK_f83067a8edaa2748fe92af3f089; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT "FK_f83067a8edaa2748fe92af3f089" FOREIGN KEY (loan_request_id) REFERENCES public.loan_requests(loan_request_id);


--
-- Name: appraisal_details FK_f997d976cb8762252a977718208; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.appraisal_details
    ADD CONSTRAINT "FK_f997d976cb8762252a977718208" FOREIGN KEY (loan_request_asset_detail_id) REFERENCES public.loan_request_asset_details(loan_request_asset_detail_id);


--
-- Name: contracts FK_ff3123f395b0641452548aba38e; Type: FK CONSTRAINT; Schema: public; Owner: super_loan_dev
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT "FK_ff3123f395b0641452548aba38e" FOREIGN KEY (lender_id) REFERENCES public.lenders(lender_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO super_loan_dev;


--
-- PostgreSQL database dump complete
--

