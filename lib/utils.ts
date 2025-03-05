import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return format(dateObj, "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })
}

