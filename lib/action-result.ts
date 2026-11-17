// Shared shape + error mapping for admin server actions.
import { APIError } from 'better-auth/api';
import { z } from 'zod';

export type ActionResult<T = undefined> =
  | { ok: true; data?: T }
  | { ok: false; error: string };

const BETTER_AUTH_MESSAGES: Record<string, string> = {
  USER_ALREADY_EXISTS: 'Email sudah terdaftar.',
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: 'Email sudah terdaftar.',
  INVALID_EMAIL: 'Format email tidak valid.',
  PASSWORD_TOO_SHORT: 'Password terlalu pendek.',
  PASSWORD_TOO_LONG: 'Password terlalu panjang.',
  YOU_CANNOT_BAN_YOURSELF: 'Kamu tidak bisa memblokir akunmu sendiri.',
  YOU_CANNOT_REMOVE_YOURSELF: 'Kamu tidak bisa menghapus akunmu sendiri.',
};

/** Turn any thrown error into a message safe to show the super admin. */
export function toErrorMessage(err: unknown): string {
  if (err instanceof z.ZodError) {
    return err.issues[0]?.message ?? 'Input tidak valid.';
  }
  if (err instanceof APIError) {
    const code = (err.body as { code?: string } | undefined)?.code;
    return (code && BETTER_AUTH_MESSAGES[code]) || err.message;
  }
  // Postgres unique violation (directly or wrapped by Drizzle).
  const pgCode =
    (err as { code?: string })?.code ??
    (err as { cause?: { code?: string } })?.cause?.code;
  if (pgCode === '23505') return 'Nama sudah dipakai.';

  console.error(err);
  return 'Terjadi kesalahan. Coba lagi.';
}
