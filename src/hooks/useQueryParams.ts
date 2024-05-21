'use client';

import { useRouter } from 'next/router';

export default function useQueryParams() {
  const router = useRouter();
  const searchParams = router.query;
  const pathname = router.pathname;

  function setQueryParams(
    params: Record<string, string | number | boolean | undefined>,
    update = false,
    overridePath?: string,
  ) {
    Object.entries(params).forEach(([key, value]) => {
      value === undefined ? delete searchParams[key] : (searchParams[key] = String(value));
    });

    const search = Object.keys(searchParams).length > 0 ? searchParams.toString() : '';
    const query = search ? `?${search}` : '';

    if (update) {
      router.push(`${overridePath ?? pathname}${query}`);
    } else {
      router.replace(`${overridePath ?? pathname}${query}`);
    }
  }

  return {
    params: searchParams,
    setQueryParams,
  };
}
