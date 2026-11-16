CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_proyek" text NOT NULL,
	"alamat_proyek" text NOT NULL,
	"koordinat" text NOT NULL,
	"radius" double precision NOT NULL,
	"kategori_proyek" text NOT NULL,
	"stakeholder_terlibat" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"stakeholder_relations" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"tanggal_mulai" text NOT NULL,
	"tanggal_selesai" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stakeholders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama_stakeholder" text NOT NULL,
	"kontak_stakeholder" text NOT NULL,
	"alamat_stakeholder" text NOT NULL,
	"kelurahan" text NOT NULL,
	"kecamatan" text NOT NULL,
	"skoring_power_stakeholder" integer NOT NULL,
	"skoring_interest_stakeholder" integer NOT NULL,
	"kegiatan_stakeholder" text NOT NULL,
	"tindak_lanjut_stakeholder" text NOT NULL,
	"kriteria_interest_stakeholder" text,
	"kategori_stakeholder" text,
	"strategi_stakeholder" text,
	"kriteria_influence_stakeholder" text,
	"kriteria_involvement_stakeholder" text,
	"keterikatan_stakeholder" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
