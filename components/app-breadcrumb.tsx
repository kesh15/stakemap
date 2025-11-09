"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export function AppBreadcrumb() {
  const pathnames = usePathname();
  const paths = pathnames.split("/").filter(Boolean);

  // Buat link akumulatif
  const breadLinks = paths.map((segment, idx) => ({
    name: segment.charAt(0).toUpperCase() + segment.slice(1),
    href: "/" + paths.slice(0, idx + 1).join("/"),
  }));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {breadLinks.map((p, i) => (
          <div key={i} className="flex items-center gap-1">
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              {i === breadLinks.length - 1 ? (
                <BreadcrumbPage>{p.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={p.href}>{p.name}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
