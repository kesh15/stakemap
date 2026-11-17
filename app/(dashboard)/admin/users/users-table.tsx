'use client';

import { useState, useTransition } from 'react';
import {
  Ban,
  KeyRound,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Trash2,
  Undo2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ActionResult } from '@/lib/action-result';
import {
  banUserAction,
  createUserAction,
  deleteUserAction,
  resetPasswordAction,
  setUserRoleAction,
  unbanUserAction,
} from './actions';

export type UserRow = {
  id: string;
  name: string;
  email: string;
  isSuperAdmin: boolean;
  banned: boolean;
  roleId: string | null;
  roleName: string | null;
};

type RoleOption = { id: string; name: string };

// Radix Select can't use '' as a value.
const NO_ROLE = '__none__';

export function UsersTable({
  users,
  roles,
  currentUserId,
}: {
  users: UserRow[];
  roles: RoleOption[];
  currentUserId: string;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function run(action: () => Promise<ActionResult>) {
    setError(null);
    startTransition(async () => {
      const result = await action();
      if (!result.ok) setError(result.error);
    });
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center justify-between gap-2'>
        <p className='text-muted-foreground text-sm'>{users.length} pengguna</p>
        <CreateUserDialog roles={roles} />
      </div>

      {error && (
        <div
          role='alert'
          className='border-destructive/50 text-destructive rounded-md border px-3 py-2 text-sm'
        >
          {error}
        </div>
      )}
      {roles.length === 0 && (
        <p className='text-muted-foreground rounded-md border px-3 py-2 text-sm'>
          Belum ada role. Buat role di menu <b>Role &amp; Permission</b> agar
          pengguna bisa diberi akses.
        </p>
      )}

      <div className='overflow-x-auto rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className='w-12' />
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => {
              const locked = u.isSuperAdmin || u.id === currentUserId;
              return (
                <TableRow key={u.id}>
                  <TableCell className='font-medium'>
                    {u.name}
                    {u.id === currentUserId && (
                      <span className='text-muted-foreground'> (kamu)</span>
                    )}
                  </TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    {u.isSuperAdmin ? (
                      <Badge>
                        <ShieldCheck />
                        Super admin
                      </Badge>
                    ) : (
                      <Select
                        value={u.roleId ?? NO_ROLE}
                        disabled={pending}
                        onValueChange={(value) =>
                          run(() =>
                            setUserRoleAction(
                              u.id,
                              value === NO_ROLE ? null : value
                            )
                          )
                        }
                      >
                        <SelectTrigger size='sm' className='min-w-40'>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={NO_ROLE}>
                            — Tanpa role —
                          </SelectItem>
                          {roles.map((r) => (
                            <SelectItem key={r.id} value={r.id}>
                              {r.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </TableCell>
                  <TableCell>
                    {u.banned ? (
                      <Badge variant='destructive'>Diblokir</Badge>
                    ) : (
                      <Badge variant='secondary'>Aktif</Badge>
                    )}
                  </TableCell>
                  <TableCell>{!locked && <RowActions user={u} />}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function CreateUserDialog({ roles }: { roles: RoleOption[] }) {
  const [open, setOpen] = useState(false);
  const [roleId, setRoleId] = useState(NO_ROLE);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const result = await createUserAction({
        name: String(form.get('name')),
        email: String(form.get('email')),
        password: String(form.get('password')),
        roleId: roleId === NO_ROLE ? null : roleId,
      });
      if (!result.ok) return setError(result.error);
      setOpen(false);
      setRoleId(NO_ROLE);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        setError(null);
      }}
    >
      <Button onClick={() => setOpen(true)}>
        <Plus />
        Tambah pengguna
      </Button>
      <DialogContent>
        <form onSubmit={onSubmit} className='flex flex-col gap-6'>
          <DialogHeader>
            <DialogTitle>Tambah pengguna</DialogTitle>
            <DialogDescription>
              Berikan password sementara ini kepada pengguna. Mereka bisa
              menggantinya setelah login.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='new-name'>Nama</FieldLabel>
              <Input id='new-name' name='name' required />
            </Field>
            <Field>
              <FieldLabel htmlFor='new-email'>Email</FieldLabel>
              <Input id='new-email' name='email' type='email' required />
            </Field>
            <Field>
              <FieldLabel htmlFor='new-password'>Password sementara</FieldLabel>
              <Input
                id='new-password'
                name='password'
                type='text'
                autoComplete='off'
                minLength={8}
                required
              />
            </Field>
            <Field>
              <FieldLabel>Role</FieldLabel>
              <Select value={roleId} onValueChange={setRoleId}>
                <SelectTrigger className='w-full'>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NO_ROLE}>— Tanpa role —</SelectItem>
                  {roles.map((r) => (
                    <SelectItem key={r.id} value={r.id}>
                      {r.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            {error && <FieldError>{error}</FieldError>}
          </FieldGroup>
          <DialogFooter>
            <Button type='submit' disabled={pending}>
              {pending ? 'Menyimpan…' : 'Buat pengguna'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type Pending = 'reset' | 'ban' | 'unban' | 'delete' | null;

function RowActions({ user }: { user: UserRow }) {
  const [dialog, setDialog] = useState<Pending>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' aria-label='Aksi'>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onSelect={() => setDialog('reset')}>
            <KeyRound />
            Reset password
          </DropdownMenuItem>
          {user.banned ? (
            <DropdownMenuItem onSelect={() => setDialog('unban')}>
              <Undo2 />
              Buka blokir
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem onSelect={() => setDialog('ban')}>
              <Ban />
              Blokir
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant='destructive'
            onSelect={() => setDialog('delete')}
          >
            <Trash2 />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {dialog === 'reset' && (
        <ResetPasswordDialog user={user} onClose={() => setDialog(null)} />
      )}
      {dialog === 'ban' && (
        <ConfirmDialog
          title={`Blokir ${user.name}?`}
          description='Pengguna akan langsung keluar dan tidak bisa login sampai blokir dibuka.'
          confirmLabel='Blokir'
          withReason
          onConfirm={(reason) => banUserAction(user.id, reason)}
          onClose={() => setDialog(null)}
        />
      )}
      {dialog === 'unban' && (
        <ConfirmDialog
          title={`Buka blokir ${user.name}?`}
          description='Pengguna bisa login kembali.'
          confirmLabel='Buka blokir'
          onConfirm={() => unbanUserAction(user.id)}
          onClose={() => setDialog(null)}
        />
      )}
      {dialog === 'delete' && (
        <ConfirmDialog
          title={`Hapus ${user.name}?`}
          description='Akun, session, dan role pengguna ini akan dihapus permanen. Tindakan ini tidak bisa dibatalkan.'
          confirmLabel='Hapus permanen'
          onConfirm={() => deleteUserAction(user.id)}
          onClose={() => setDialog(null)}
        />
      )}
    </>
  );
}

function ConfirmDialog({
  title,
  description,
  confirmLabel,
  withReason,
  onConfirm,
  onClose,
}: {
  title: string;
  description: string;
  confirmLabel: string;
  withReason?: boolean;
  onConfirm: (reason?: string) => Promise<ActionResult>;
  onClose: () => void;
}) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function confirm() {
    setError(null);
    startTransition(async () => {
      const result = await onConfirm(reason);
      if (!result.ok) return setError(result.error);
      onClose();
    });
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {withReason && (
          <Field>
            <FieldLabel htmlFor='ban-reason'>Alasan (opsional)</FieldLabel>
            <Input
              id='ban-reason'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Field>
        )}
        {error && <FieldError>{error}</FieldError>}
        <DialogFooter>
          <Button variant='outline' onClick={onClose} disabled={pending}>
            Batal
          </Button>
          <Button variant='destructive' onClick={confirm} disabled={pending}>
            {pending ? 'Memproses…' : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ResetPasswordDialog({
  user,
  onClose,
}: {
  user: UserRow;
  onClose: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newPassword = String(new FormData(e.currentTarget).get('password'));
    setError(null);
    startTransition(async () => {
      const result = await resetPasswordAction(user.id, newPassword);
      if (!result.ok) return setError(result.error);
      onClose();
    });
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <form onSubmit={onSubmit} className='flex flex-col gap-6'>
          <DialogHeader>
            <DialogTitle>Reset password {user.name}</DialogTitle>
            <DialogDescription>
              Pengguna akan keluar dari semua perangkat dan harus login dengan
              password baru ini.
            </DialogDescription>
          </DialogHeader>
          <Field>
            <FieldLabel htmlFor='reset-password'>Password baru</FieldLabel>
            <Input
              id='reset-password'
              name='password'
              type='text'
              autoComplete='off'
              minLength={8}
              required
            />
          </Field>
          {error && <FieldError>{error}</FieldError>}
          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              disabled={pending}
            >
              Batal
            </Button>
            <Button type='submit' disabled={pending}>
              {pending ? 'Menyimpan…' : 'Simpan password'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
