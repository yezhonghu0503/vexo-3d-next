import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import styles from "./Badge.module.css"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

const badgeVariants = {
  variant: {
    default: styles.variantDefault,
    secondary: styles.variantSecondary,
    destructive: styles.variantDestructive,
    outline: styles.variantOutline,
  },
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<"span">> & {
  variant?: BadgeVariant
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(
        styles.badge,
        badgeVariants.variant[variant || "default"],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { Badge, badgeVariants }
