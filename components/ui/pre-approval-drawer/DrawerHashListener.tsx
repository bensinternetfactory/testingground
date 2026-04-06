"use client";

import { useEffect, useEffectEvent } from "react";
import { preApprovalEntryHash } from "@/features/pre-approval/drawer/server";
import {
  createHashOpenPreApprovalTrigger,
  parsePreApprovalTriggerDataset,
  type NormalizedPreApprovalTrigger,
} from "@/features/pre-approval/drawer/runtime/parser";

function clearDrawerHash() {
  const { pathname, search } = window.location;
  history.replaceState(null, "", `${pathname}${search}`);
}

function isDrawerTarget(anchor: HTMLAnchorElement) {
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  const targetUrl = new URL(anchor.href, window.location.href);
  const currentUrl = new URL(window.location.href);

  return (
    targetUrl.origin === currentUrl.origin &&
    targetUrl.pathname === currentUrl.pathname &&
    targetUrl.hash === preApprovalEntryHash
  );
}

export function DrawerHashListener({
  open,
}: {
  open: (trigger?: NormalizedPreApprovalTrigger) => void;
}) {
  const openFromHash = useEffectEvent(() => {
    open(createHashOpenPreApprovalTrigger(window.location.pathname));
    clearDrawerHash();
  });

  const handleHashChange = useEffectEvent(() => {
    if (window.location.hash === preApprovalEntryHash) {
      openFromHash();
    }
  });

  const handleDocumentClick = useEffectEvent((event: MouseEvent) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>(
      "a[href]",
    );

    if (!anchor || !isDrawerTarget(anchor)) {
      return;
    }

    event.preventDefault();
    open(parsePreApprovalTriggerDataset(anchor.dataset) ?? createHashOpenPreApprovalTrigger(window.location.pathname));
  });

  useEffect(() => {
    handleHashChange();

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return null;
}
