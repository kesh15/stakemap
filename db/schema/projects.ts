import {
  doublePrecision,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import type { StakeholderRelation } from '@/types/project';
import type { StakeholderType } from '@/types/stakeholder';

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  nama_proyek: text('nama_proyek').notNull(),
  alamat_proyek: text('alamat_proyek').notNull(),
  koordinat: text('koordinat').notNull(),
  radius: doublePrecision('radius').notNull(),
  kategori_proyek: text('kategori_proyek').notNull(),
  stakeholder_terlibat: jsonb('stakeholder_terlibat')
    .$type<StakeholderType[]>()
    .default([])
    .notNull(),
  stakeholder_relations: jsonb('stakeholder_relations')
    .$type<StakeholderRelation[]>()
    .default([])
    .notNull(),
  tanggal_mulai: text('tanggal_mulai').notNull(),
  tanggal_selesai: text('tanggal_selesai').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
