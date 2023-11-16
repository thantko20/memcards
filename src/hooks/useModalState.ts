import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * A hook that manages the state of a modal
 * using URL query `modal` using NextJS's useRouter
 */
export const useModalState = (key: string) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onChange = useCallback(
    (state: boolean) => {
      const params = new URLSearchParams(searchParams);
      if (state) {
        params.set("modal", key);
      } else {
        params.delete("modal");
      }
      router.replace(`?${params.toString()}`);
    },
    [key, router, searchParams]
  );

  const open = () => onChange(true);
  const close = () => onChange(false);

  return {
    isOpen: searchParams.get("modal") === key,
    open,
    close,
    onChange
  };
};
