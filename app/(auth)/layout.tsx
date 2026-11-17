import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Map } from 'lucide-react';
import { auth } from '@/lib/auth';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Already signed in → no reason to see login/signup.
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect('/');

  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='flex items-center gap-2 font-medium'>
        <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
          <Map className='size-4' />
        </div>
        Stakemap
      </div>
      <div className='w-full max-w-xs'>{children}</div>
    </div>
  );
}
