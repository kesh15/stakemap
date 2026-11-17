'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth-client';
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

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const password = String(form.get('password'));
    if (password !== String(form.get('confirm-password'))) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    const { error } = await signUp.email({
      name: String(form.get('name')),
      email: String(form.get('email')),
      password,
    });
    setLoading(false);
    if (error) return setError(error.message ?? 'Could not create account');
    // Better Auth signs the user in right after sign-up by default.
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
          <h1 className='text-2xl font-bold'>Create your account</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor='name'>Full Name</FieldLabel>
          <Input
            id='name'
            name='name'
            type='text'
            autoComplete='name'
            placeholder='John Doe'
            required
          />
        </Field>
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
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor='password'>Password</FieldLabel>
          <Input
            id='password'
            name='password'
            type='password'
            autoComplete='new-password'
            minLength={8}
            required
          />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor='confirm-password'>Confirm Password</FieldLabel>
          <Input
            id='confirm-password'
            name='confirm-password'
            type='password'
            autoComplete='new-password'
            minLength={8}
            required
          />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        {error && <FieldError>{error}</FieldError>}
        <Field>
          <Button type='submit' disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </Button>
          <FieldDescription className='px-6 text-center'>
            Already have an account?{' '}
            <Link href='/login' className='underline underline-offset-4'>
              Sign in
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
