import { useCallback, useState } from "react";

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const onChange = useCallback((state: boolean) => setIsOpen(state), []);

  return {
    onChange,
    isOpen,
    open,
    close,
    toggle
  };
};
