import { useCallback, useState } from "react";
import { useEscapeKey } from "./useEscapeKey";
import { useScrollLock } from "./useScrollLock";

export function useMobileNavState() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setOpenSection(null);
  }, []);

  const toggleMobile = useCallback(() => {
    setMobileOpen((previouslyOpen) => {
      if (previouslyOpen) {
        setOpenSection(null);
      }

      return !previouslyOpen;
    });
  }, []);

  const toggleSection = useCallback((value: string) => {
    setOpenSection((current) => (current === value ? null : value));
  }, []);

  useEscapeKey(mobileOpen, closeMobile);
  useScrollLock(mobileOpen);

  return {
    closeMobile,
    mobileOpen,
    openSection,
    toggleMobile,
    toggleSection,
  };
}
