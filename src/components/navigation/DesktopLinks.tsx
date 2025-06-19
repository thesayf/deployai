import React from "react";
import { LinkType } from "./constants";

export const DesktopLinks = ({ links }: { links: LinkType[] }) => {
  return (
    <div className="ml-12 hidden md:block">
      <div className="flex items-center gap-8">
        {links.map((l) => (
          <a
            key={l.title}
            href={l.href}
            className="cursor-pointer text-sm font-medium text-zinc-700 transition-colors hover:text-orange-600"
          >
            {l.title}
          </a>
        ))}
      </div>
    </div>
  );
};
