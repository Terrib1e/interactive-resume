// src/components/animations/scale-in.tsx
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScaleInProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function ScaleIn({ children, className, delay = 0 }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut"
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}