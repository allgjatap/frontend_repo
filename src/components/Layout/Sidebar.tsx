import { cn } from '@nextui-org/react';
import React from 'react';

export type SidebarProps = {
  className?: string;
  children: React.ReactNode;
};

export const Sidebar = ({ className, children }: SidebarProps) => {
  return (
    <div className={cn('flex h-auto w-full max-w-[295px] flex-col gap-[11px] bg-white p-8', className)}>{children}</div>
  );
};
