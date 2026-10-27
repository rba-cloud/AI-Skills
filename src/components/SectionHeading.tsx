import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, copy, align = "left" }: { eyebrow?: string; title: ReactNode; copy?: ReactNode; align?: "left" | "center" }) {
  return (
    <div className={`section-heading align-${align}`}>
      {eyebrow && <p className="eyebrow-label"><span />{eyebrow}</p>}
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}
