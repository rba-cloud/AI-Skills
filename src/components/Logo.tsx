import Link from "next/link";

export function Logo() {
  return (
    <Link className="brand-mark" href="/" aria-label="AI Skills Academy home">
      <span className="brand-orbit" aria-hidden="true"><i /><i /><i /></span>
      <span>AI Skills<br /><strong>Academy</strong></span>
    </Link>
  );
}
