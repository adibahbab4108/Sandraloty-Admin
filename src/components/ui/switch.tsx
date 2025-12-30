"use client";

import * as React from "react";
import { Toggle } from "@/components/ui/toggle";

/**
 * A tiny adapter that exposes a Switch-like API
 * (checked, onCheckedChange) but reuses the existing Toggle.
 */
type SwitchProps = Omit<
  React.ComponentProps<typeof Toggle>,
  "pressed" | "onPressedChange"
> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onCheckedChange, ...props }, ref) => {
    return (
      <Toggle
        ref={ref}
        pressed={checked}
        onPressedChange={(val) => onCheckedChange?.(val)}
        {...props}
      />
    );
  }
);

Switch.displayName = "Switch";

export { Switch };