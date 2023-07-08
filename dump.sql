--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts_user; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.accounts_user (
    id bigint NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    email character varying(254) NOT NULL,
    new_email character varying(254),
    phone_number character varying(128),
    token character varying(100),
    code character varying(100)
);


ALTER TABLE public.accounts_user OWNER TO satisfaction;

--
-- Name: accounts_user_groups; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.accounts_user_groups (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.accounts_user_groups OWNER TO satisfaction;

--
-- Name: accounts_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.accounts_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_user_groups_id_seq OWNER TO satisfaction;

--
-- Name: accounts_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.accounts_user_groups_id_seq OWNED BY public.accounts_user_groups.id;


--
-- Name: accounts_user_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.accounts_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_user_id_seq OWNER TO satisfaction;

--
-- Name: accounts_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.accounts_user_id_seq OWNED BY public.accounts_user.id;


--
-- Name: accounts_user_user_permissions; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.accounts_user_user_permissions (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.accounts_user_user_permissions OWNER TO satisfaction;

--
-- Name: accounts_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.accounts_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_user_user_permissions_id_seq OWNER TO satisfaction;

--
-- Name: accounts_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.accounts_user_user_permissions_id_seq OWNED BY public.accounts_user_user_permissions.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO satisfaction;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO satisfaction;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO satisfaction;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO satisfaction;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO satisfaction;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO satisfaction;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: category_category; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.category_category (
    id bigint NOT NULL,
    path character varying(255) NOT NULL,
    depth integer NOT NULL,
    numchild integer NOT NULL,
    preview character varying(100),
    alt character varying(50),
    name character varying(50) NOT NULL,
    slug character varying(50) NOT NULL,
    short_overview text,
    visibility boolean,
    CONSTRAINT category_category_depth_check CHECK ((depth >= 0)),
    CONSTRAINT category_category_numchild_check CHECK ((numchild >= 0))
);


ALTER TABLE public.category_category OWNER TO satisfaction;

--
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.category_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_category_id_seq OWNER TO satisfaction;

--
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category_category.id;


--
-- Name: contact_contact; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.contact_contact (
    id bigint NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(254) NOT NULL,
    message text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.contact_contact OWNER TO satisfaction;

--
-- Name: contact_contact_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.contact_contact_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contact_contact_id_seq OWNER TO satisfaction;

--
-- Name: contact_contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.contact_contact_id_seq OWNED BY public.contact_contact.id;


--
-- Name: des_dynamicemailconfiguration; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.des_dynamicemailconfiguration (
    id bigint NOT NULL,
    host character varying(256),
    port smallint,
    from_email character varying(256),
    username character varying(256),
    password character varying(256),
    use_tls boolean NOT NULL,
    use_ssl boolean NOT NULL,
    fail_silently boolean NOT NULL,
    timeout smallint
);


ALTER TABLE public.des_dynamicemailconfiguration OWNER TO satisfaction;

--
-- Name: des_dynamicemailconfiguration_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.des_dynamicemailconfiguration_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.des_dynamicemailconfiguration_id_seq OWNER TO satisfaction;

--
-- Name: des_dynamicemailconfiguration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.des_dynamicemailconfiguration_id_seq OWNED BY public.des_dynamicemailconfiguration.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO satisfaction;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO satisfaction;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO satisfaction;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO satisfaction;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO satisfaction;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO satisfaction;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO satisfaction;

--
-- Name: gallery_gallery; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.gallery_gallery (
    id bigint NOT NULL,
    preview character varying(100),
    alt character varying(50),
    title character varying(50),
    slug character varying(100)
);


ALTER TABLE public.gallery_gallery OWNER TO satisfaction;

--
-- Name: gallery_gallery_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.gallery_gallery_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gallery_gallery_id_seq OWNER TO satisfaction;

--
-- Name: gallery_gallery_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.gallery_gallery_id_seq OWNED BY public.gallery_gallery.id;


--
-- Name: gallery_image; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.gallery_image (
    id bigint NOT NULL,
    image character varying(100),
    alt character varying(50),
    my_order integer NOT NULL,
    gallery_id bigint,
    CONSTRAINT gallery_image_my_order_check CHECK ((my_order >= 0))
);


ALTER TABLE public.gallery_image OWNER TO satisfaction;

--
-- Name: gallery_image_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.gallery_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gallery_image_id_seq OWNER TO satisfaction;

--
-- Name: gallery_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.gallery_image_id_seq OWNED BY public.gallery_image.id;


--
-- Name: jet_bookmark; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.jet_bookmark (
    id bigint NOT NULL,
    url character varying(200) NOT NULL,
    title character varying(255) NOT NULL,
    "user" integer NOT NULL,
    date_add timestamp with time zone NOT NULL,
    CONSTRAINT jet_bookmark_user_check CHECK (("user" >= 0))
);


ALTER TABLE public.jet_bookmark OWNER TO satisfaction;

--
-- Name: jet_bookmark_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.jet_bookmark_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jet_bookmark_id_seq OWNER TO satisfaction;

--
-- Name: jet_bookmark_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.jet_bookmark_id_seq OWNED BY public.jet_bookmark.id;


--
-- Name: jet_pinnedapplication; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.jet_pinnedapplication (
    id bigint NOT NULL,
    app_label character varying(255) NOT NULL,
    "user" integer NOT NULL,
    date_add timestamp with time zone NOT NULL,
    CONSTRAINT jet_pinnedapplication_user_check CHECK (("user" >= 0))
);


ALTER TABLE public.jet_pinnedapplication OWNER TO satisfaction;

--
-- Name: jet_pinnedapplication_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.jet_pinnedapplication_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.jet_pinnedapplication_id_seq OWNER TO satisfaction;

--
-- Name: jet_pinnedapplication_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.jet_pinnedapplication_id_seq OWNED BY public.jet_pinnedapplication.id;


--
-- Name: organization_commoninfo; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.organization_commoninfo (
    id bigint NOT NULL,
    name character varying(200) NOT NULL,
    privacy_notice character varying(1000) NOT NULL,
    conditions_of_use character varying(1000) NOT NULL,
    country character varying(50) NOT NULL,
    city character varying(50) NOT NULL,
    post_index character varying(20) NOT NULL,
    address character varying(100) NOT NULL,
    google_link character varying(300) NOT NULL
);


ALTER TABLE public.organization_commoninfo OWNER TO satisfaction;

--
-- Name: organization_commoninfo_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.organization_commoninfo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organization_commoninfo_id_seq OWNER TO satisfaction;

--
-- Name: organization_commoninfo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.organization_commoninfo_id_seq OWNED BY public.organization_commoninfo.id;


--
-- Name: organization_email; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.organization_email (
    id bigint NOT NULL,
    email_main boolean NOT NULL,
    email_active boolean NOT NULL,
    email_address character varying(254) NOT NULL,
    my_order integer NOT NULL,
    common_id bigint NOT NULL,
    CONSTRAINT organization_email_my_order_check CHECK ((my_order >= 0))
);


ALTER TABLE public.organization_email OWNER TO satisfaction;

--
-- Name: organization_email_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.organization_email_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organization_email_id_seq OWNER TO satisfaction;

--
-- Name: organization_email_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.organization_email_id_seq OWNED BY public.organization_email.id;


--
-- Name: organization_phone; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.organization_phone (
    id bigint NOT NULL,
    phone_main boolean NOT NULL,
    phone_active boolean NOT NULL,
    phone_number character varying(128) NOT NULL,
    my_order integer NOT NULL,
    common_id bigint NOT NULL,
    CONSTRAINT organization_phone_my_order_check CHECK ((my_order >= 0))
);


ALTER TABLE public.organization_phone OWNER TO satisfaction;

--
-- Name: organization_phone_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.organization_phone_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organization_phone_id_seq OWNER TO satisfaction;

--
-- Name: organization_phone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.organization_phone_id_seq OWNED BY public.organization_phone.id;


--
-- Name: organization_socialmedia; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.organization_socialmedia (
    id bigint NOT NULL,
    social_media_main boolean NOT NULL,
    social_media_active boolean NOT NULL,
    social_media_title character varying(200) NOT NULL,
    social_media_url character varying(100) NOT NULL,
    social_media_picture character varying(100) NOT NULL,
    social_media_alt character varying(50) NOT NULL,
    my_order integer NOT NULL,
    common_id bigint NOT NULL,
    CONSTRAINT organization_socialmedia_my_order_check CHECK ((my_order >= 0))
);


ALTER TABLE public.organization_socialmedia OWNER TO satisfaction;

--
-- Name: organization_socialmedia_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.organization_socialmedia_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organization_socialmedia_id_seq OWNER TO satisfaction;

--
-- Name: organization_socialmedia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.organization_socialmedia_id_seq OWNED BY public.organization_socialmedia.id;


--
-- Name: product_product; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.product_product (
    id bigint NOT NULL,
    preview character varying(100),
    img_alt character varying(25),
    name character varying(100) NOT NULL,
    slug character varying(100),
    price integer NOT NULL,
    old_price integer,
    overview text,
    new_product boolean,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    my_order integer NOT NULL,
    category_id bigint,
    CONSTRAINT product_product_my_order_check CHECK ((my_order >= 0)),
    CONSTRAINT product_product_old_price_check CHECK ((old_price >= 0)),
    CONSTRAINT product_product_price_check CHECK ((price >= 0))
);


ALTER TABLE public.product_product OWNER TO satisfaction;

--
-- Name: product_product_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.product_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_product_id_seq OWNER TO satisfaction;

--
-- Name: product_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.product_product_id_seq OWNED BY public.product_product.id;


--
-- Name: product_product_related_products; Type: TABLE; Schema: public; Owner: satisfaction
--

CREATE TABLE public.product_product_related_products (
    id bigint NOT NULL,
    from_product_id bigint NOT NULL,
    to_product_id bigint NOT NULL
);


ALTER TABLE public.product_product_related_products OWNER TO satisfaction;

--
-- Name: product_product_related_products_id_seq; Type: SEQUENCE; Schema: public; Owner: satisfaction
--

CREATE SEQUENCE public.product_product_related_products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_product_related_products_id_seq OWNER TO satisfaction;

--
-- Name: product_product_related_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: satisfaction
--

ALTER SEQUENCE public.product_product_related_products_id_seq OWNED BY public.product_product_related_products.id;


--
-- Name: accounts_user id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.accounts_user ALTER COLUMN id SET DEFAULT nextval('public.accounts_user_id_seq'::regclass);


--
-- Name: accounts_user_groups id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.accounts_user_groups ALTER COLUMN id SET DEFAULT nextval('public.accounts_user_groups_id_seq'::regclass);


--
-- Name: accounts_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.accounts_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.accounts_user_user_permissions_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: category_category id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.category_category ALTER COLUMN id SET DEFAULT nextval('public.category_category_id_seq'::regclass);


--
-- Name: contact_contact id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.contact_contact ALTER COLUMN id SET DEFAULT nextval('public.contact_contact_id_seq'::regclass);


--
-- Name: des_dynamicemailconfiguration id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.des_dynamicemailconfiguration ALTER COLUMN id SET DEFAULT nextval('public.des_dynamicemailconfiguration_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: gallery_gallery id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.gallery_gallery ALTER COLUMN id SET DEFAULT nextval('public.gallery_gallery_id_seq'::regclass);


--
-- Name: gallery_image id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.gallery_image ALTER COLUMN id SET DEFAULT nextval('public.gallery_image_id_seq'::regclass);


--
-- Name: jet_bookmark id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.jet_bookmark ALTER COLUMN id SET DEFAULT nextval('public.jet_bookmark_id_seq'::regclass);


--
-- Name: jet_pinnedapplication id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.jet_pinnedapplication ALTER COLUMN id SET DEFAULT nextval('public.jet_pinnedapplication_id_seq'::regclass);


--
-- Name: organization_commoninfo id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.organization_commoninfo ALTER COLUMN id SET DEFAULT nextval('public.organization_commoninfo_id_seq'::regclass);


--
-- Name: organization_email id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.organization_email ALTER COLUMN id SET DEFAULT nextval('public.organization_email_id_seq'::regclass);


--
-- Name: organization_phone id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.organization_phone ALTER COLUMN id SET DEFAULT nextval('public.organization_phone_id_seq'::regclass);


--
-- Name: organization_socialmedia id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.organization_socialmedia ALTER COLUMN id SET DEFAULT nextval('public.organization_socialmedia_id_seq'::regclass);


--
-- Name: product_product id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.product_product ALTER COLUMN id SET DEFAULT nextval('public.product_product_id_seq'::regclass);


--
-- Name: product_product_related_products id; Type: DEFAULT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.product_product_related_products ALTER COLUMN id SET DEFAULT nextval('public.product_product_related_products_id_seq'::regclass);


--
-- Data for Name: accounts_user; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.accounts_user (id, password, last_login, is_superuser, first_name, last_name, is_staff, is_active, date_joined, email, new_email, phone_number, token, code) FROM stdin;
1	pbkdf2_sha256$260000$LTQSGEWLKkZsLaz8tCN0BB$7t6bZ8fdqLRtjKggPBYj9ed+HBBy31CjxSF4x9EEp4I=	2023-06-27 13:39:04.437291+00	t			t	t	2023-06-27 13:38:58.701132+00	admin@admin.com	\N	\N	2c290da5-d733-4fb7-a64d-71ca3a0d56d5	\N
\.


--
-- Data for Name: accounts_user_groups; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.accounts_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: accounts_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.accounts_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add bookmark	1	add_bookmark
2	Can change bookmark	1	change_bookmark
3	Can delete bookmark	1	delete_bookmark
4	Can view bookmark	1	view_bookmark
5	Can add pinned application	2	add_pinnedapplication
6	Can change pinned application	2	change_pinnedapplication
7	Can delete pinned application	2	delete_pinnedapplication
8	Can view pinned application	2	view_pinnedapplication
9	Can add Email Configuration	3	add_dynamicemailconfiguration
10	Can change Email Configuration	3	change_dynamicemailconfiguration
11	Can delete Email Configuration	3	delete_dynamicemailconfiguration
12	Can view Email Configuration	3	view_dynamicemailconfiguration
13	Can add log entry	4	add_logentry
14	Can change log entry	4	change_logentry
15	Can delete log entry	4	delete_logentry
16	Can view log entry	4	view_logentry
17	Can add permission	5	add_permission
18	Can change permission	5	change_permission
19	Can delete permission	5	delete_permission
20	Can view permission	5	view_permission
21	Can add group	6	add_group
22	Can change group	6	change_group
23	Can delete group	6	delete_group
24	Can view group	6	view_group
25	Can add content type	7	add_contenttype
26	Can change content type	7	change_contenttype
27	Can delete content type	7	delete_contenttype
28	Can view content type	7	view_contenttype
29	Can add session	8	add_session
30	Can change session	8	change_session
31	Can delete session	8	delete_session
32	Can view session	8	view_session
33	Can add user	9	add_user
34	Can change user	9	change_user
35	Can delete user	9	delete_user
36	Can view user	9	view_user
37	Can add contact	10	add_contact
38	Can change contact	10	change_contact
39	Can delete contact	10	delete_contact
40	Can view contact	10	view_contact
41	Can add product	11	add_product
42	Can change product	11	change_product
43	Can delete product	11	delete_product
44	Can view product	11	view_product
45	Can add gallery	12	add_gallery
46	Can change gallery	12	change_gallery
47	Can delete gallery	12	delete_gallery
48	Can view gallery	12	view_gallery
49	Can add image	13	add_image
50	Can change image	13	change_image
51	Can delete image	13	delete_image
52	Can view image	13	view_image
53	Can add common info	14	add_commoninfo
54	Can change common info	14	change_commoninfo
55	Can delete common info	14	delete_commoninfo
56	Can view common info	14	view_commoninfo
57	Can add social media	15	add_socialmedia
58	Can change social media	15	change_socialmedia
59	Can delete social media	15	delete_socialmedia
60	Can view social media	15	view_socialmedia
61	Can add phone	16	add_phone
62	Can change phone	16	change_phone
63	Can delete phone	16	delete_phone
64	Can view phone	16	view_phone
65	Can add email	17	add_email
66	Can change email	17	change_email
67	Can delete email	17	delete_email
68	Can view email	17	view_email
69	Can add category	18	add_category
70	Can change category	18	change_category
71	Can delete category	18	delete_category
72	Can view category	18	view_category
\.


--
-- Data for Name: category_category; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.category_category (id, path, depth, numchild, preview, alt, name, slug, short_overview, visibility) FROM stdin;
\.


--
-- Data for Name: contact_contact; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.contact_contact (id, name, email, message, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: des_dynamicemailconfiguration; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.des_dynamicemailconfiguration (id, host, port, from_email, username, password, use_tls, use_ssl, fail_silently, timeout) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2023-06-27 13:39:42.847544+00	1	adfgafg	1	[{"added": {}}, {"added": {"name": "image", "object": "adfgdafg"}}, {"added": {"name": "image", "object": "adfgadfg"}}, {"added": {"name": "image", "object": "adfgadfg"}}]	12	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	jet	bookmark
2	jet	pinnedapplication
3	des	dynamicemailconfiguration
4	admin	logentry
5	auth	permission
6	auth	group
7	contenttypes	contenttype
8	sessions	session
9	accounts	user
10	contact	contact
11	product	product
12	gallery	gallery
13	gallery	image
14	organization	commoninfo
15	organization	socialmedia
16	organization	phone
17	organization	email
18	category	category
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2023-06-25 17:14:12.4506+00
2	contenttypes	0002_remove_content_type_name	2023-06-25 17:14:12.460116+00
3	auth	0001_initial	2023-06-25 17:14:12.548707+00
4	auth	0002_alter_permission_name_max_length	2023-06-25 17:14:12.5561+00
5	auth	0003_alter_user_email_max_length	2023-06-25 17:14:12.564923+00
6	auth	0004_alter_user_username_opts	2023-06-25 17:14:12.575226+00
7	auth	0005_alter_user_last_login_null	2023-06-25 17:14:12.587762+00
8	auth	0006_require_contenttypes_0002	2023-06-25 17:14:12.591357+00
9	auth	0007_alter_validators_add_error_messages	2023-06-25 17:14:12.607016+00
10	auth	0008_alter_user_username_max_length	2023-06-25 17:14:12.619702+00
11	auth	0009_alter_user_last_name_max_length	2023-06-25 17:14:12.626182+00
12	auth	0010_alter_group_name_max_length	2023-06-25 17:14:12.63588+00
13	auth	0011_update_proxy_permissions	2023-06-25 17:14:12.642462+00
14	auth	0012_alter_user_first_name_max_length	2023-06-25 17:14:12.649939+00
15	accounts	0001_initial	2023-06-25 17:14:12.716826+00
16	accounts	0002_user_code	2023-06-25 17:14:12.728608+00
17	admin	0001_initial	2023-06-25 17:14:12.762326+00
18	admin	0002_logentry_remove_auto_add	2023-06-25 17:14:12.77061+00
19	admin	0003_logentry_add_action_flag_choices	2023-06-25 17:14:12.778875+00
20	category	0001_initial	2023-06-25 17:14:12.797688+00
21	contact	0001_initial	2023-06-25 17:14:12.81848+00
22	contact	0002_contact_created_at_contact_updated_at	2023-06-25 17:14:12.830946+00
23	des	0001_initial	2023-06-25 17:14:12.851241+00
24	des	0002_alter_dynamicemailconfiguration_id	2023-06-25 17:14:12.86807+00
25	gallery	0001_initial	2023-06-25 17:14:12.890597+00
26	gallery	0002_gallery_title	2023-06-25 17:14:12.895066+00
27	gallery	0003_gallery_slug	2023-06-25 17:14:12.910593+00
28	gallery	0004_auto_20230620_1345	2023-06-25 17:14:12.919497+00
29	jet	0001_initial	2023-06-25 17:14:12.951865+00
30	jet	0002_delete_userdashboardmodule	2023-06-25 17:14:12.959459+00
31	jet	0003_auto_20230625_1714	2023-06-25 17:14:12.985318+00
32	organization	0001_initial	2023-06-25 17:14:13.05639+00
33	organization	0002_alter_commoninfo_name	2023-06-25 17:14:13.069267+00
34	product	0001_initial	2023-06-25 17:14:13.102488+00
35	product	0002_alter_product_preview	2023-06-25 17:14:13.111338+00
36	product	0003_alter_product_related_products	2023-06-25 17:14:13.119031+00
37	product	0004_alter_product_related_products	2023-06-25 17:14:13.125661+00
38	product	0005_product_category	2023-06-25 17:14:13.141151+00
39	product	0006_alter_product_category	2023-06-25 17:14:13.151361+00
40	product	0007_alter_product_related_products	2023-06-25 17:14:13.159055+00
41	product	0008_alter_product_preview	2023-06-25 17:14:13.16561+00
42	sessions	0001_initial	2023-06-25 17:14:13.179265+00
43	jet	0003_auto_20230627_1337	2023-06-27 13:37:07.220568+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
n7ypds531tqtsz36scgla70ev7fe9mdj	.eJxVjEEOwiAQRe_C2hDKwFRcuvcMZJhBqRpISrsy3l2bdKHb_977LxVpXUpce57jJOqkBnX43RLxI9cNyJ3qrWludZmnpDdF77TrS5P8PO_u30GhXr41EFhvfE7GERlgOJJjRgMyIlhk69AGRLkmtilnCo4ceEQ_JgjiB_X-ANBiN1w:1qE8uO:n3MgceC1tNBPw0zFNUoa52DJsmZUfRPd_WgSybf2n70	2023-07-11 13:39:04.442284+00
\.


--
-- Data for Name: gallery_gallery; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.gallery_gallery (id, preview, alt, title, slug) FROM stdin;
1	nike-sportwear-logo.png	adfgafg	ggfrsdfg	dafgadfg
\.


--
-- Data for Name: gallery_image; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.gallery_image (id, image, alt, my_order, gallery_id) FROM stdin;
1	brand_adidas.png	adfgdafg	0	1
2	Fila-Logo-Small.jpg	adfgadfg	0	1
3	underarmour.webp	adfgadfg	0	1
\.


--
-- Data for Name: jet_bookmark; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.jet_bookmark (id, url, title, "user", date_add) FROM stdin;
\.


--
-- Data for Name: jet_pinnedapplication; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.jet_pinnedapplication (id, app_label, "user", date_add) FROM stdin;
\.


--
-- Data for Name: organization_commoninfo; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.organization_commoninfo (id, name, privacy_notice, conditions_of_use, country, city, post_index, address, google_link) FROM stdin;
\.


--
-- Data for Name: organization_email; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.organization_email (id, email_main, email_active, email_address, my_order, common_id) FROM stdin;
\.


--
-- Data for Name: organization_phone; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.organization_phone (id, phone_main, phone_active, phone_number, my_order, common_id) FROM stdin;
\.


--
-- Data for Name: organization_socialmedia; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.organization_socialmedia (id, social_media_main, social_media_active, social_media_title, social_media_url, social_media_picture, social_media_alt, my_order, common_id) FROM stdin;
\.


--
-- Data for Name: product_product; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.product_product (id, preview, img_alt, name, slug, price, old_price, overview, new_product, created_at, updated_at, my_order, category_id) FROM stdin;
\.


--
-- Data for Name: product_product_related_products; Type: TABLE DATA; Schema: public; Owner: satisfaction
--

COPY public.product_product_related_products (id, from_product_id, to_product_id) FROM stdin;
\.


--
-- Name: accounts_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.accounts_user_groups_id_seq', 1, false);


--
-- Name: accounts_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.accounts_user_id_seq', 1, true);


--
-- Name: accounts_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.accounts_user_user_permissions_id_seq', 1, false);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 72, true);


--
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.category_category_id_seq', 1, false);


--
-- Name: contact_contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.contact_contact_id_seq', 1, false);


--
-- Name: des_dynamicemailconfiguration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.des_dynamicemailconfiguration_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 18, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 43, true);


--
-- Name: gallery_gallery_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.gallery_gallery_id_seq', 1, true);


--
-- Name: gallery_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.gallery_image_id_seq', 3, true);


--
-- Name: jet_bookmark_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.jet_bookmark_id_seq', 1, false);


--
-- Name: jet_pinnedapplication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.jet_pinnedapplication_id_seq', 1, false);


--
-- Name: organization_commoninfo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.organization_commoninfo_id_seq', 1, false);


--
-- Name: organization_email_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.organization_email_id_seq', 1, false);


--
-- Name: organization_phone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.organization_phone_id_seq', 1, false);


--
-- Name: organization_socialmedia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.organization_socialmedia_id_seq', 1, false);


--
-- Name: product_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.product_product_id_seq', 1, false);


--
-- Name: product_product_related_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: satisfaction
--

SELECT pg_catalog.setval('public.product_product_related_products_id_seq', 1, false);


--
-- Name: accounts_user accounts_user_email_key; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.accounts_user
    ADD CONSTRAINT accounts_user_email_key UNIQUE (email);


--
-- Name: accounts_user_groups accounts_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.accounts_user_groups
    ADD CONSTRAINT accounts_user_groups_pkey PRIMARY KEY (id);


--
-- Name: accounts_user_groups accounts_user_groups_user_id_group_id_59c0b32f_uniq; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.accounts_user_groups
    ADD CONSTRAINT accounts_user_groups_user_id_group_id_59c0b32f_uniq UNIQUE (user_id, group_id);


--
-- Name: accounts_user accounts_user_new_email_key; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.accounts_user
    ADD CONSTRAINT accounts_user_new_email_key UNIQUE (new_email);


--
-- Name: accounts_user accounts_user_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.accounts_user
    ADD CONSTRAINT accounts_user_pkey PRIMARY KEY (id);


--
-- Name: accounts_user_user_permissions accounts_user_user_permi_user_id_permission_id_2ab516c2_uniq; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.accounts_user_user_permissions
    ADD CONSTRAINT accounts_user_user_permi_user_id_permission_id_2ab516c2_uniq UNIQUE (user_id, permission_id);


--
-- Name: accounts_user_user_permissions accounts_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.accounts_user_user_permissions
    ADD CONSTRAINT accounts_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: category_category category_category_path_key; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.category_category
    ADD CONSTRAINT category_category_path_key UNIQUE (path);


--
-- Name: category_category category_category_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.category_category
    ADD CONSTRAINT category_category_pkey PRIMARY KEY (id);


--
-- Name: contact_contact contact_contact_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.contact_contact
    ADD CONSTRAINT contact_contact_pkey PRIMARY KEY (id);


--
-- Name: des_dynamicemailconfiguration des_dynamicemailconfiguration_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.des_dynamicemailconfiguration
    ADD CONSTRAINT des_dynamicemailconfiguration_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: gallery_gallery gallery_gallery_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.gallery_gallery
    ADD CONSTRAINT gallery_gallery_pkey PRIMARY KEY (id);


--
-- Name: gallery_gallery gallery_gallery_slug_key; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.gallery_gallery
    ADD CONSTRAINT gallery_gallery_slug_key UNIQUE (slug);


--
-- Name: gallery_image gallery_image_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.gallery_image
    ADD CONSTRAINT gallery_image_pkey PRIMARY KEY (id);


--
-- Name: jet_bookmark jet_bookmark_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.jet_bookmark
    ADD CONSTRAINT jet_bookmark_pkey PRIMARY KEY (id);


--
-- Name: jet_pinnedapplication jet_pinnedapplication_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.jet_pinnedapplication
    ADD CONSTRAINT jet_pinnedapplication_pkey PRIMARY KEY (id);


--
-- Name: organization_commoninfo organization_commoninfo_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.organization_commoninfo
    ADD CONSTRAINT organization_commoninfo_pkey PRIMARY KEY (id);


--
-- Name: organization_email organization_email_email_address_key; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.organization_email
    ADD CONSTRAINT organization_email_email_address_key UNIQUE (email_address);


--
-- Name: organization_email organization_email_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.organization_email
    ADD CONSTRAINT organization_email_pkey PRIMARY KEY (id);


--
-- Name: organization_phone organization_phone_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.organization_phone
    ADD CONSTRAINT organization_phone_phone_number_key UNIQUE (phone_number);


--
-- Name: organization_phone organization_phone_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.organization_phone
    ADD CONSTRAINT organization_phone_pkey PRIMARY KEY (id);


--
-- Name: organization_socialmedia organization_socialmedia_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.organization_socialmedia
    ADD CONSTRAINT organization_socialmedia_pkey PRIMARY KEY (id);


--
-- Name: product_product product_product_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.product_product
    ADD CONSTRAINT product_product_pkey PRIMARY KEY (id);


--
-- Name: product_product_related_products product_product_related__from_product_id_to_produ_b37afbff_uniq; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.product_product_related_products
    ADD CONSTRAINT product_product_related__from_product_id_to_produ_b37afbff_uniq UNIQUE (from_product_id, to_product_id);


--
-- Name: product_product_related_products product_product_related_products_pkey; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.product_product_related_products
    ADD CONSTRAINT product_product_related_products_pkey PRIMARY KEY (id);


--
-- Name: product_product product_product_slug_key; Type: CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.product_product
    ADD CONSTRAINT product_product_slug_key UNIQUE (slug);


--
-- Name: accounts_user_email_b2644a56_like; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX accounts_user_email_b2644a56_like ON public.accounts_user USING btree (email varchar_pattern_ops);


--
-- Name: accounts_user_groups_group_id_bd11a704; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX accounts_user_groups_group_id_bd11a704 ON public.accounts_user_groups USING btree (group_id);


--
-- Name: accounts_user_groups_user_id_52b62117; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX accounts_user_groups_user_id_52b62117 ON public.accounts_user_groups USING btree (user_id);


--
-- Name: accounts_user_new_email_7545fb92_like; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX accounts_user_new_email_7545fb92_like ON public.accounts_user USING btree (new_email varchar_pattern_ops);


--
-- Name: accounts_user_user_permissions_permission_id_113bb443; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX accounts_user_user_permissions_permission_id_113bb443 ON public.accounts_user_user_permissions USING btree (permission_id);


--
-- Name: accounts_user_user_permissions_user_id_e4f0a161; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX accounts_user_user_permissions_user_id_e4f0a161 ON public.accounts_user_user_permissions USING btree (user_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: category_category_path_b2fe7279_like; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX category_category_path_b2fe7279_like ON public.category_category USING btree (path varchar_pattern_ops);


--
-- Name: category_category_slug_4f83d5f6; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX category_category_slug_4f83d5f6 ON public.category_category USING btree (slug);


--
-- Name: category_category_slug_4f83d5f6_like; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX category_category_slug_4f83d5f6_like ON public.category_category USING btree (slug varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: gallery_gallery_slug_7f00eb51_like; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX gallery_gallery_slug_7f00eb51_like ON public.gallery_gallery USING btree (slug varchar_pattern_ops);


--
-- Name: gallery_image_gallery_id_491b0492; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX gallery_image_gallery_id_491b0492 ON public.gallery_image USING btree (gallery_id);


--
-- Name: organization_email_common_id_3f9d159a; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX organization_email_common_id_3f9d159a ON public.organization_email USING btree (common_id);


--
-- Name: organization_email_email_address_007e71fc_like; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX organization_email_email_address_007e71fc_like ON public.organization_email USING btree (email_address varchar_pattern_ops);


--
-- Name: organization_phone_common_id_145bd254; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX organization_phone_common_id_145bd254 ON public.organization_phone USING btree (common_id);


--
-- Name: organization_phone_phone_number_5b14e514_like; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX organization_phone_phone_number_5b14e514_like ON public.organization_phone USING btree (phone_number varchar_pattern_ops);


--
-- Name: organization_socialmedia_common_id_3901446a; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX organization_socialmedia_common_id_3901446a ON public.organization_socialmedia USING btree (common_id);


--
-- Name: product_product_category_id_0c725779; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX product_product_category_id_0c725779 ON public.product_product USING btree (category_id);


--
-- Name: product_product_related_products_from_product_id_c95cd017; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX product_product_related_products_from_product_id_c95cd017 ON public.product_product_related_products USING btree (from_product_id);


--
-- Name: product_product_related_products_to_product_id_8465c1e8; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX product_product_related_products_to_product_id_8465c1e8 ON public.product_product_related_products USING btree (to_product_id);


--
-- Name: product_product_slug_76cde0ae_like; Type: INDEX; Schema: public; Owner: satisfaction
--

CREATE INDEX product_product_slug_76cde0ae_like ON public.product_product USING btree (slug varchar_pattern_ops);


--
-- Name: accounts_user_groups accounts_user_groups_group_id_bd11a704_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.accounts_user_groups
    ADD CONSTRAINT accounts_user_groups_group_id_bd11a704_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: accounts_user_groups accounts_user_groups_user_id_52b62117_fk_accounts_user_id; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.accounts_user_groups
    ADD CONSTRAINT accounts_user_groups_user_id_52b62117_fk_accounts_user_id FOREIGN KEY (user_id) REFERENCES public.accounts_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: accounts_user_user_permissions accounts_user_user_p_permission_id_113bb443_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.accounts_user_user_permissions
    ADD CONSTRAINT accounts_user_user_p_permission_id_113bb443_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: accounts_user_user_permissions accounts_user_user_p_user_id_e4f0a161_fk_accounts_; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.accounts_user_user_permissions
    ADD CONSTRAINT accounts_user_user_p_user_id_e4f0a161_fk_accounts_ FOREIGN KEY (user_id) REFERENCES public.accounts_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_accounts_user_id; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_accounts_user_id FOREIGN KEY (user_id) REFERENCES public.accounts_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: gallery_image gallery_image_gallery_id_491b0492_fk_gallery_gallery_id; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.gallery_image
    ADD CONSTRAINT gallery_image_gallery_id_491b0492_fk_gallery_gallery_id FOREIGN KEY (gallery_id) REFERENCES public.gallery_gallery(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: organization_email organization_email_common_id_3f9d159a_fk_organizat; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.organization_email
    ADD CONSTRAINT organization_email_common_id_3f9d159a_fk_organizat FOREIGN KEY (common_id) REFERENCES public.organization_commoninfo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: organization_phone organization_phone_common_id_145bd254_fk_organizat; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.organization_phone
    ADD CONSTRAINT organization_phone_common_id_145bd254_fk_organizat FOREIGN KEY (common_id) REFERENCES public.organization_commoninfo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: organization_socialmedia organization_socialm_common_id_3901446a_fk_organizat; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.organization_socialmedia
    ADD CONSTRAINT organization_socialm_common_id_3901446a_fk_organizat FOREIGN KEY (common_id) REFERENCES public.organization_commoninfo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_product product_product_category_id_0c725779_fk_category_category_id; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.product_product
    ADD CONSTRAINT product_product_category_id_0c725779_fk_category_category_id FOREIGN KEY (category_id) REFERENCES public.category_category(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_product_related_products product_product_rela_from_product_id_c95cd017_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.product_product_related_products
    ADD CONSTRAINT product_product_rela_from_product_id_c95cd017_fk_product_p FOREIGN KEY (from_product_id) REFERENCES public.product_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: product_product_related_products product_product_rela_to_product_id_8465c1e8_fk_product_p; Type: FK CONSTRAINT; Schema: public; Owner: satisfaction
--

ALTER TABLE ONLY public.product_product_related_products
    ADD CONSTRAINT product_product_rela_to_product_id_8465c1e8_fk_product_p FOREIGN KEY (to_product_id) REFERENCES public.product_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

