'use client';

// Gives client components the current user + permissions, loaded on the
// server by app/(dashboard)/layout.tsx. Use it to HIDE UI only — the real
// checks are in lib/dal.ts (requirePermission / guardApi).
import { createContext, useContext } from 'react';
import type { Permission } from '@/lib/permissions';

export type AuthzUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
};

type Authz = {
  user: AuthzUser;
  isSuperAdmin: boolean;
  permissions: Permission[];
};

const AuthzContext = createContext<Authz | null>(null);

export function AuthzProvider({
  value,
  children,
}: {
  value: Authz;
  children: React.ReactNode;
}) {
  return (
    <AuthzContext.Provider value={value}>{children}</AuthzContext.Provider>
  );
}

export function useAuthz() {
  const ctx = useContext(AuthzContext);
  if (!ctx) throw new Error('useAuthz must be used inside <AuthzProvider>');
  return {
    ...ctx,
    can: (permission: Permission) => ctx.permissions.includes(permission),
  };
}
