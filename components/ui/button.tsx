import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"
import styles from "./Button.module.css"

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
type ButtonSize = "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg"

const buttonVariants = {
  variant: {
    default: styles.variantDefault,
    destructive: styles.variantDestructive,
    outline: styles.variantOutline,
    secondary: styles.variantSecondary,
    ghost: styles.variantGhost,
    link: styles.variantLink,
  },
  size: {
    default: styles.sizeDefault,
    sm: styles.sizeSm,
    lg: styles.sizeLg,
    icon: styles.sizeIcon,
    "icon-sm": styles.sizeIconSm,
    "icon-lg": styles.sizeIconLg,
  },
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(
        styles.button,
        buttonVariants.variant[variant || "default"],
        buttonVariants.size[size || "default"],
        className
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }
