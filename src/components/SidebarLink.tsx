"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoading } from "./LoadingProvider";
import { ReactNode, MouseEvent } from "react";

interface SidebarLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const SidebarLink = ({
  href,
  className,
  children,
  onClick,
}: SidebarLinkProps) => {
  const router = useRouter();
  const { startLoading } = useLoading();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Close mobile menu if onClick is provided
    if (onClick) {
      onClick();
    }

    // Start loading for the content area
    startLoading();

    // Navigate to the new page
    router.push(href);
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default SidebarLink;
