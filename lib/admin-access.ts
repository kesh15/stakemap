// Account-level roles for the Better Auth admin plugin.
// Only two exist: `super_admin` (manages users) and `user` (everyone else).
// App permissions (project:read, ...) are NOT here — see lib/permissions.ts.
// Safe to import on client and server.
import { createAccessControl } from 'better-auth/plugins/access';
import {
  adminAc,
  defaultStatements,
  userAc,
} from 'better-auth/plugins/admin/access';

export const ac = createAccessControl(defaultStatements);

export const roles = {
  super_admin: ac.newRole(adminAc.statements),
  user: ac.newRole(userAc.statements),
};

export const SUPER_ADMIN = 'super_admin' as const;
