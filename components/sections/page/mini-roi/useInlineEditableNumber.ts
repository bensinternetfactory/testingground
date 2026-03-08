"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface UseInlineEditableNumberParams {
  value: number;
  onCommit: (value: number) => void;
  parse: (raw: string, fallback: number) => number;
}

export function useInlineEditableNumber({
  value,
  onCommit,
  parse,
}: UseInlineEditableNumberParams) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const committedRef = useRef(false);

  useEffect(() => {
    if (!editing || !inputRef.current) return;

    inputRef.current.focus();
    inputRef.current.select();
    committedRef.current = false;
  }, [editing]);

  const openEdit = useCallback(() => {
    setDraft(String(value));
    setEditing(true);
  }, [value]);

  const commitDraft = useCallback(() => {
    if (committedRef.current) return;

    committedRef.current = true;
    const liveValue = inputRef.current?.value ?? draft;
    const nextValue = parse(liveValue, value);
    onCommit(nextValue);
    setEditing(false);
  }, [draft, onCommit, parse, value]);

  const cancelEdit = useCallback(() => {
    committedRef.current = true;
    setEditing(false);
  }, []);

  return {
    editing,
    draft,
    inputRef,
    setDraft,
    openEdit,
    commitDraft,
    cancelEdit,
  };
}
