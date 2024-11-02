import cn from "@/shared/clsx"
import React, { forwardRef, useId, useState } from "react"
import { useController } from "react-hook-form"
import styles from "./index.module.scss"

const Input = forwardRef(function Input(
  {
    label,
    name,
    control,
    rules,
    defaultValue,
    className,
    parentClassName,
    onChange: propOnChange,
    ...props
  },
  ref
) {
  const id = useId()
  const {
    field: { onChange: rhfOnChange, ...field },
    fieldState,
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })
  const [value, setValue] = useState(defaultValue || "")

  function onChange(e) {
    typeof propOnChange === "function" && propOnChange(e)

    setValue(e.target.value)
    rhfOnChange(e.target.value)
  }

  return (
    <div className={cn(styles.container, parentClassName)}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        value={value}
        id={id}
        className={cn(
          styles.input,
          className,
          fieldState.error && styles.error
        )}
        onChange={onChange}
        ref={ref}
        {...field}
        {...props}
      />
      {fieldState.error && (
        <p className={styles.error}>{fieldState.error.message}</p>
      )}
    </div>
  )
})

export default Input
