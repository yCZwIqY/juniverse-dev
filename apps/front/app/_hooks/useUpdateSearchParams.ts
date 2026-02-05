import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useUpdateSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  return (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.push(pathname + '?' + params);
  };
};
