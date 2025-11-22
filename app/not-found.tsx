import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <div className='bg-secondary fixed inset-0 flex h-screen w-screen flex-col items-center justify-center'>
      <div className='mx-auto max-w-md text-center'>
        <div className='text-primary mx-auto h-12 w-12' />
        <h1 className='text-foreground mt-4 text-6xl font-bold tracking-tight sm:text-7xl'>
          404
        </h1>
        <p className='text-muted-foreground mt-4 text-lg'>
          Oops, it looks like the page you&apos;re looking for doesn&apos;t
          exist.
        </p>
        <div className='mt-6'>
          <Link
            href='/'
            className='bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none'
            prefetch={false}
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
