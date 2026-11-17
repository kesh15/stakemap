// Single source of truth for app permissions.
// Roles are created in the DB by the super admin; this file defines which
// permissions exist. Add a resource/action here and it shows up in the role
// editor automatically. Safe to import on client and server (no DB access).
//
// User/role management is NOT listed here: that is super_admin only and is
// checked via user.role (see lib/dal.ts → requireSuperAdmin).

export const PERMISSION_GROUPS = {
  project: {
    label: 'Proyek',
    actions: {
      read: 'Lihat proyek',
      create: 'Tambah proyek',
      update: 'Ubah proyek',
      delete: 'Hapus proyek',
    },
  },
  stakeholder: {
    label: 'Stakeholder',
    actions: {
      read: 'Lihat stakeholder',
      create: 'Tambah stakeholder',
      update: 'Ubah stakeholder',
      delete: 'Hapus stakeholder',
    },
  },
} as const;

type Groups = typeof PERMISSION_GROUPS;

/** 'project:read' | 'project:create' | ... */
export type Permission = {
  [R in keyof Groups]: `${R & string}:${keyof Groups[R]['actions'] & string}`;
}[keyof Groups];

export const ALL_PERMISSIONS = Object.entries(PERMISSION_GROUPS).flatMap(
  ([resource, group]) =>
    Object.keys(group.actions).map(
      (action) => `${resource}:${action}` as Permission
    )
);

export function isPermission(value: string): value is Permission {
  return (ALL_PERMISSIONS as string[]).includes(value);
}
