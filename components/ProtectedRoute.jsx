'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';

export default function ProtectedRoute({ children }) {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push('/login');
  }, [session]);

  return <>{children}</>;
}
