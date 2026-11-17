import Link from 'next/link';
import { ShieldX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ForbiddenPage() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center gap-4 p-6 text-center'>
      <ShieldX className='text-muted-foreground size-10' />
      <h1 className='text-2xl font-bold'>Akses ditolak</h1>
      <p className='text-muted-foreground max-w-sm text-sm'>
        Kamu tidak punya izin untuk membuka halaman ini. Hubungi super admin
        jika kamu memerlukan akses.
      </p>
      <Button asChild variant='outline'>
        <Link href='/'>Kembali ke beranda</Link>
      </Button>
    </div>
  );
}
