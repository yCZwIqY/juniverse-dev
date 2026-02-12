import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useNavigationLoading } from '@/app/_components/navigation/NavigationLoadingProvider';

export const useUpdateSearchParams = (prefix?: string) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { startNavigation } = useNavigationLoading();

  return (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    startNavigation();
    router.push(`${prefix ?? pathname}` + '?' + params);
  };
};
