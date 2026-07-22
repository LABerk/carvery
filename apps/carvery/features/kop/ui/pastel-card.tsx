import { cn } from "@/aspects/utils/cn";
import Link from "next/link";
import { ReactNode } from "react";

export type PastelTone = "blush" | "lavender" | "sky" | "mint" | "lemon" | "peach";

const toneClasses: Record<PastelTone, string> = {
  blush: "bg-blush",
  lavender: "bg-lavender",
  sky: "bg-sky",
  mint: "bg-mint",
  lemon: "bg-lemon",
  peach: "bg-peach",
};

type PastelCardProps = {
  tone: PastelTone;
  children: ReactNode;
  className?: string;
  href?: string;
};

export const PastelCard = ({ tone, children, className, href }: PastelCardProps) => {
  return (
    <div className={cn("rounded-2xl px-6 py-5", toneClasses[tone], className)}>
      {href ? (
        <Link href={href}>
          {children}
        </Link>
      ) : (
        children
      )}
    </div>
  );
};
