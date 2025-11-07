"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLoading } from "./LoadingProvider";
import { ComponentProps } from "react";

interface LoadingLinkProps extends ComponentProps<typeof Link> {
  children: React.ReactNode;
}

const LoadingLink = ({
  children,
  href,
  onClick,
  ...props
}: LoadingLinkProps) => {
  const { startLoading } = useLoading();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Only trigger loading for internal navigation to different pages
    if (typeof href === "string" && href.startsWith("/") && href !== pathname) {
      startLoading();
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default LoadingLink;
