import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'gold' | 'cpo' | 'new' | 'sold' | 'reserved' | 'outline';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const base = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors';
  
  const variants = {
    default: 'bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200',
    gold: 'bg-amber-500/20 text-amber-500 dark:bg-amber-400/20 dark:text-amber-300 border border-amber-500/30',
    new: 'bg-emerald-500/20 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/30',
    cpo: 'bg-indigo-500/20 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300 border border-indigo-500/30',
    reserved: 'bg-orange-500/20 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300 border border-orange-500/30',
    sold: 'bg-zinc-500/20 text-zinc-500 dark:bg-zinc-700/50 dark:text-zinc-400 border border-zinc-500/30',
    outline: 'border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
};
