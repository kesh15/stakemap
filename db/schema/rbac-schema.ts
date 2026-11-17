import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { user } from './auth-schema';

export const role = pgTable('role', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at', {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),
});

export const rolePermission = pgTable(
  'role_permission',
  {
    roleId: text('role_id')
      .notNull()
      .references(() => role.id, {
        onDelete: 'cascade',
      }),

    permission: text('permission').notNull(),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permission] })]
);

export const userRole = pgTable('user_role', {
  userId: text('user_id')
    .primaryKey()
    .references(() => user.id, {
      onDelete: 'cascade',
    }),

  roleId: text('role_id')
    .notNull()
    .references(() => role.id),
});

export const roleRelations = relations(role, ({ many }) => ({
  permissions: many(rolePermission),
  users: many(userRole),
}));

export const rolePermissionRelations = relations(rolePermission, ({ one }) => ({
  role: one(role, {
    fields: [rolePermission.roleId],
    references: [role.id],
  }),
}));

export const userRoleRelations = relations(userRole, ({ one }) => ({
  role: one(role, {
    fields: [userRole.roleId],
    references: [role.id],
  }),

  user: one(user, {
    fields: [userRole.userId],
    references: [user.id],
  }),
}));
