'use client';

import { useState, useTransition } from 'react';
import { Plus, Trash2, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { PERMISSION_GROUPS } from '@/lib/permissions';
import {
  createRoleAction,
  deleteRoleAction,
  updateRoleAction,
} from './actions';

export type RoleRow = {
  id: string;
  name: string;
  description: string | null;
  userCount: number;
  permissions: string[];
};

export function RolesManager({ roles }: { roles: RoleRow[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(
    roles[0]?.id ?? null
  );
  const selected = roles.find((r) => r.id === selectedId) ?? roles[0];

  return (
    <div className='grid gap-4 md:grid-cols-[16rem_1fr]'>
      <div className='flex flex-col gap-2'>
        <CreateRoleDialog onCreated={setSelectedId} />
        {roles.length === 0 ? (
          <p className='text-muted-foreground rounded-md border p-3 text-sm'>
            Belum ada role.
          </p>
        ) : (
          <ul className='flex flex-col gap-1'>
            {roles.map((r) => (
              <li key={r.id}>
                <button
                  type='button'
                  onClick={() => setSelectedId(r.id)}
                  className={cn(
                    'hover:bg-accent flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm',
                    selected?.id === r.id && 'bg-accent font-medium'
                  )}
                >
                  <span className='truncate'>{r.name}</span>
                  <span className='text-muted-foreground flex items-center gap-1 text-xs'>
                    <Users className='size-3' />
                    {r.userCount}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected && (
        // key → editor state resets when switching roles or after save
        <RoleEditor
          key={`${selected.id}:${selected.name}:${selected.permissions.join()}`}
          role={selected}
          onDeleted={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}

function RoleEditor({
  role,
  onDeleted,
}: {
  role: RoleRow;
  onDeleted: () => void;
}) {
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description ?? '');
  const [checked, setChecked] = useState(() => new Set(role.permissions));
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pending, startTransition] = useTransition();

  function toggle(permission: string, on: boolean) {
    setSaved(false);
    setChecked((prev) => {
      const next = new Set(prev);
      if (on) next.add(permission);
      else next.delete(permission);
      return next;
    });
  }

  function save() {
    setError(null);
    startTransition(async () => {
      const result = await updateRoleAction(role.id, {
        name,
        description,
        permissions: [...checked],
      });
      if (!result.ok) return setError(result.error);
      setSaved(true);
    });
  }

  function remove() {
    setError(null);
    startTransition(async () => {
      const result = await deleteRoleAction(role.id);
      if (!result.ok) {
        setConfirmDelete(false);
        return setError(result.error);
      }
      onDeleted();
    });
  }

  return (
    <div className='flex flex-col gap-6 rounded-md border p-4'>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor='role-name'>Nama role</FieldLabel>
          <Input
            id='role-name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSaved(false);
            }}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor='role-description'>Deskripsi</FieldLabel>
          <Input
            id='role-description'
            value={description}
            placeholder='Opsional'
            onChange={(e) => {
              setDescription(e.target.value);
              setSaved(false);
            }}
          />
        </Field>
      </FieldGroup>

      <div className='flex flex-col gap-3'>
        <h2 className='font-medium'>Permission</h2>
        {Object.entries(PERMISSION_GROUPS).map(([resource, group]) => {
          const keys = Object.keys(group.actions).map(
            (a) => `${resource}:${a}`
          );
          const all = keys.every((k) => checked.has(k));
          return (
            <div key={resource} className='rounded-md border p-3'>
              <label className='mb-2 flex items-center gap-2 text-sm font-medium'>
                <Checkbox
                  checked={all}
                  onCheckedChange={(on) => keys.forEach((k) => toggle(k, !!on))}
                />
                {group.label}
              </label>
              <div className='grid grid-cols-2 gap-2 pl-6 sm:grid-cols-4'>
                {Object.entries(group.actions).map(([action, label]) => {
                  const key = `${resource}:${action}`;
                  return (
                    <label
                      key={key}
                      className='flex items-center gap-2 text-sm'
                    >
                      <Checkbox
                        checked={checked.has(key)}
                        onCheckedChange={(on) => toggle(key, !!on)}
                      />
                      {label}
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {error && <FieldError>{error}</FieldError>}

      <div className='flex flex-wrap items-center justify-between gap-2'>
        <Button
          variant='outline'
          className='text-destructive'
          onClick={() => setConfirmDelete(true)}
          disabled={pending}
        >
          <Trash2 />
          Hapus role
        </Button>
        <div className='flex items-center gap-3'>
          {saved && <Badge variant='secondary'>Tersimpan</Badge>}
          <Button onClick={save} disabled={pending}>
            {pending ? 'Menyimpan…' : 'Simpan perubahan'}
          </Button>
        </div>
      </div>

      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus role {role.name}?</DialogTitle>
            <DialogDescription>
              {role.userCount > 0
                ? `Role ini masih dipakai ${role.userCount} pengguna dan tidak bisa dihapus. Pindahkan mereka ke role lain dulu.`
                : 'Role dan semua permission-nya akan dihapus permanen.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setConfirmDelete(false)}>
              Batal
            </Button>
            <Button
              variant='destructive'
              onClick={remove}
              disabled={pending || role.userCount > 0}
            >
              Hapus permanen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CreateRoleDialog({ onCreated }: { onCreated: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const result = await createRoleAction({
        name: String(form.get('name')),
        description: String(form.get('description') ?? ''),
      });
      if (!result.ok) return setError(result.error);
      setOpen(false);
      if (result.data) onCreated(result.data.id);
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
        Tambah role
      </Button>
      <DialogContent>
        <form onSubmit={onSubmit} className='flex flex-col gap-6'>
          <DialogHeader>
            <DialogTitle>Tambah role</DialogTitle>
            <DialogDescription>
              Setelah dibuat, pilih permission untuk role ini.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='create-role-name'>Nama role</FieldLabel>
              <Input
                id='create-role-name'
                name='name'
                placeholder='mis. Surveyor'
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='create-role-description'>
                Deskripsi
              </FieldLabel>
              <Input
                id='create-role-description'
                name='description'
                placeholder='Opsional'
              />
            </Field>
            {error && <FieldError>{error}</FieldError>}
          </FieldGroup>
          <DialogFooter>
            <Button type='submit' disabled={pending}>
              {pending ? 'Menyimpan…' : 'Buat role'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
