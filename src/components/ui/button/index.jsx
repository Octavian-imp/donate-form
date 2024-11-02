import React from "react"
import cn from "../../../shared/clsx"
import styles from "./index.module.scss"
const Button = ({ className, children, variant, ...props }) => {
  switch (variant) {
    case "secondary":
      return (
        <button
          className={cn(styles.container, styles.secondary, className)}
          {...props}
        >
          {children}
        </button>
      )
    default:
      return (
        <button
          className={cn(styles.container, styles.primary, className)}
          {...props}
        >
          {children}
        </button>
      )
  }
}

export default Button
