"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// import logoSrc from "public/logo.png";
import { cx } from "@/lib/cx";

export const TopNavBar = () => {
  const pathName = usePathname();
  const isHomePage = pathName === "/";

  return (
    <header
      aria-label="Site Header"
      className={cx(
        "flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12",
        isHomePage && "bg-dot"
      )}
    >
      <div className="flex h-16 w-full items-center justify-between">
        <Link href="/">
          <span className="sr-only">KampKode</span>
          <Image
            src={'/logo.png'}
            alt="KampKode Logo"
            className="h-8 w-full"
            width={100}
            height={50}
            priority
          />
        </Link>
        <nav
          aria-label="Site Nav Bar"
          className="flex items-center gap-2 text-sm font-medium"
        >
          {[
            ["https://kampkode.tech/job-updates", "Job Updates"],
            ["https://kampkode.tech/internships", "Internships"]
          ].map(([href, text]) => (
            <Link
              key={text}
              className="rounded-md px-1.5 py-2 text-[#5d52d9] hover:bg-gray-100 focus-visible:bg-gray-100 lg:px-4"
              href={href}
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};