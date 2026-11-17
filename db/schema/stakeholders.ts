import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const stakeholders = pgTable('stakeholders', {
  id: uuid('id').defaultRandom().primaryKey(),
  nama_stakeholder: text('nama_stakeholder').notNull(),
  kontak_stakeholder: text('kontak_stakeholder').notNull(),
  alamat_stakeholder: text('alamat_stakeholder').notNull(),
  kelurahan: text('kelurahan').notNull(),
  kecamatan: text('kecamatan').notNull(),
  skoring_power_stakeholder: integer('skoring_power_stakeholder').notNull(),
  skoring_interest_stakeholder: integer(
    'skoring_interest_stakeholder'
  ).notNull(),
  kegiatan_stakeholder: text('kegiatan_stakeholder').notNull(),
  tindak_lanjut_stakeholder: text('tindak_lanjut_stakeholder').notNull(),
  kriteria_interest_stakeholder: text('kriteria_interest_stakeholder'),
  kategori_stakeholder: text('kategori_stakeholder'),
  strategi_stakeholder: text('strategi_stakeholder'),
  kriteria_influence_stakeholder: text('kriteria_influence_stakeholder'),
  kriteria_involvement_stakeholder: text('kriteria_involvement_stakeholder'),
  keterikatan_stakeholder: text('keterikatan_stakeholder'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export type Stakeholder = typeof stakeholders.$inferSelect;
export type NewStakeholder = typeof stakeholders.$inferInsert;
