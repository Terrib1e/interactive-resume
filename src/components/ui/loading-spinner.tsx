// src/components/ui/loading-spinner.tsx
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <Loader2 className={cn("h-4 w-4 animate-spin", className)} />
  )
}
