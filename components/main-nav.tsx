"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const MainNav = ({
  className,
  ...pops
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const parms = useParams();

  const route = [
    {
      href: `/${parms.storeId}`,
      label: "Overview",
      active: pathname === `/${parms.storeId}`,
    },
    {
      href: `/${parms.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${parms.storeId}/settings`,
    },
  ];

  return (
    <nav
      className={cn("flex items-center justify-between gap-3", className)}
      {...pops}
    >
      {route.map((route) => (
        <Link
          href={route.href}
          key={route.href}
          className={cn(
            "text-sm font-medium transition-colors space-x-4 hover:text-primary",
            route.active
              ? "text-black dark:text-white underline"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
