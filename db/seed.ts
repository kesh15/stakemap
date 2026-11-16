import fs from 'fs';
import path from 'path';
import { db } from './index';
import { projects, stakeholders } from './schema';

async function seed() {
  console.log('🌱 Starting seed...');
  const dbJsonPath = path.resolve(process.cwd(), 'db.json');

  if (!fs.existsSync(dbJsonPath)) {
    console.error('db.json not found!');
    return;
  }

  const rawData = fs.readFileSync(dbJsonPath, 'utf-8');
  const { stakeholders: rawStakeholders = [], projects: rawProjects = [] } =
    JSON.parse(rawData);

  if (rawStakeholders.length > 0) {
    console.log(`Inserting ${rawStakeholders.length} stakeholders...`);
    for (const s of rawStakeholders) {
      await db
        .insert(stakeholders)
        .values({
          id: s.id,
          nama_stakeholder: s.nama_stakeholder ?? '',
          kontak_stakeholder: s.kontak_stakeholder ?? '',
          alamat_stakeholder: s.alamat_stakeholder ?? '',
          kelurahan: s.kelurahan ?? '',
          kecamatan: s.kecamatan ?? '',
          skoring_power_stakeholder: Number(s.skoring_power_stakeholder) || 0,
          skoring_interest_stakeholder: Number(s.skoring_interest_stakeholder) || 0,
          kegiatan_stakeholder: s.kegiatan_stakeholder ?? '',
          tindak_lanjut_stakeholder: s.tindak_lanjut_stakeholder ?? '',
          kriteria_interest_stakeholder: s.kriteria_interest_stakeholder ?? null,
          kategori_stakeholder: s.kategori_stakeholder ?? null,
          strategi_stakeholder: s.strategi_stakeholder ?? null,
          kriteria_influence_stakeholder: s.kriteria_influence_stakeholder ?? null,
          kriteria_involvement_stakeholder: s.kriteria_involvement_stakeholder ?? null,
          keterikatan_stakeholder: s.keterikatan_stakeholder ?? null,
        })
        .onConflictDoNothing();
    }
  }

  if (rawProjects.length > 0) {
    console.log(`Inserting ${rawProjects.length} projects...`);
    for (const p of rawProjects) {
      await db
        .insert(projects)
        .values({
          id: p.id,
          nama_proyek: p.nama_proyek ?? '',
          alamat_proyek: p.alamat_proyek ?? '',
          koordinat: p.koordinat ?? '',
          radius: Number(p.radius) || 0,
          kategori_proyek: p.kategori_proyek ?? '',
          stakeholder_terlibat: p.stakeholder_terlibat ?? [],
          stakeholder_relations: p.stakeholder_relations ?? [],
          tanggal_mulai: p.tanggal_mulai ?? '',
          tanggal_selesai: p.tanggal_selesai ?? '',
        })
        .onConflictDoNothing();
    }
  }

  console.log('✅ Seed finished successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
