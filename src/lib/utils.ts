import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatGameName(fileName: string): string {
  const withoutExt = fileName.replace(/\.(zip|cdi|ldb|easyrpg)$/i, '')
  return withoutExt
}

export function formatPlatformName(name: string): string {
  return name.replace(/\s*\([\d,~+]+\s*jogos?\)\s*$/, '').trim()
}
