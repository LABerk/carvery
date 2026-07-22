import { cn } from "@/aspects/utils/cn";
import { ReactNode } from "react";
import { PastelCard, PastelTone } from "@/features/kop/ui/pastel-card";

type ListRowProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  tone?: PastelTone;
  className?: string;
  titleHref?: string;
};

export const ListRow = ({
  title,
  subtitle,
  trailing,
  tone = "peach",
  className,
}: ListRowProps) => {
  return (
    <PastelCard tone={tone} className={cn("flex items-center justify-between gap-4", className)}>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-foreground">{title}</div>
        {subtitle ? <div className="text-sm text-subtle mt-0.5">{subtitle}</div> : null}
      </div>
      {trailing ? <div className="flex items-center gap-2 shrink-0">{trailing}</div> : null}
    </PastelCard>
  );
};
