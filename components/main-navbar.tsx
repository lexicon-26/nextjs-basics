import Link from "next/link";
import { buttonVariants } from "./ui/button";

const linkClassName = buttonVariants({
  variant: "default",
  size: "lg",
});

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Posts", href: "/posts" },
];

export default function MainNavbar() {
  return (
    <nav className="flex h-15 items-center gap-4 border-b-2 bg-slate-700 px-5">
      {links.map((link) => (
        <Link key={link.href} href={`${link.href}`} className={linkClassName}>
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
