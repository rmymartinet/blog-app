"use client";

import Link from "next/link";
import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { animateLineNav } from "@/utils/Animations/NavAnimation";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

function Nav() {
  const pathname = usePathname();
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (lineRef.current) {
      animateLineNav(lineRef);
    }
  }, [pathname]);

  const links = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ];

  return (
    <section className="flex items-center justify-center gap-8 py-6">
      {links.map((link) => (
        <nav key={link.name}>
          <Link href={link.url} className="relative">
            <span className="text-xl">{link.name}</span>

            {pathname === link.url && (
              <div
                ref={lineRef}
                className="absolute w-full bg-white h-[1px]"
              ></div>
            )}
          </Link>
        </nav>
      ))}
    </section>
  );
}

export default Nav;
