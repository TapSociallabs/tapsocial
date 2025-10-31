import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 py-10 text-center text-sm opacity-70">
      <p>© {new Date().getFullYear()} TapSocial — Your identity. One tap away.</p>
      <p className="mt-2">
        Reserve your handle: <a className="underline" href="/claim">/claim</a> · Try <Link className="underline" href="/zay">/zay</Link> · <Link className="underline" href="/mia">/mia</Link>
      </p>
    </footer>
  );
}
