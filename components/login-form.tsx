'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const { error } = await signIn.email({
      email: String(form.get('email')),
      password: String(form.get('password')),
    });
    setLoading(false);
    if (error) return setError('Invalid email or password');
    router.push('/');
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <FieldGroup>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>Login to your account</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor='email'>Email</FieldLabel>
          <Input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            placeholder='m@example.com'
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor='password'>Password</FieldLabel>
          <Input
            id='password'
            name='password'
            type='password'
            autoComplete='current-password'
            required
          />
        </Field>
        {error && <FieldError>{error}</FieldError>}
        <Field>
          <Button type='submit' disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </Button>
          <FieldDescription className='text-center'>
            Don&apos;t have an account?{' '}
            <Link href='/signup' className='underline underline-offset-4'>
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
