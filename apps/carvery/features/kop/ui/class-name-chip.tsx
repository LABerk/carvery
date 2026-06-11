"use client";

import { useState } from "react";

interface ClassNameChipProps {
  value: string;
}

export const ClassNameChip = ({ value }: ClassNameChipProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      title="Click to copy"
      className="rounded-md bg-surface border border-border px-2 py-0.5 font-mono text-xs text-foreground hover:bg-muted transition-colors"
    >
      {copied ? "Copied!" : value}
    </button>
  );
};
