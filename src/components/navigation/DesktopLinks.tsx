import React from "react";
import { LinkType } from "./constants";

export const DesktopLinks = ({ links }: { links: LinkType[] }) => {
  return (
    <div className="ml-9 hidden md:block">
      <div className="flex gap-6">
        {links.map((l) => (
          <a
            key={l.title}
            href={l.href}
            className="cursor-pointer font-semibold text-zinc-950 transition-colors hover:text-orange-600"
          >
            {l.title}
          </a>
        ))}
      </div>
    </div>
  );
};
