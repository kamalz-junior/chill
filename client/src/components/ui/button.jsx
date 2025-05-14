import { tv } from "tailwind-variants";

export const button = tv({
  base: "inline-flex items-center justify-center gap-2 rounded-md font-medium text-sm outline-hidden focus-visible:ring-3 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "bg-muted hover:bg-muted/80",
      outline: "border bg-background hover:bg-muted/80",
      ghost: "hover:bg-muted/80",
    },
    size: {
      sm: "px-3 py-1.5",
      md: "px-4 py-2",
      lg: "px-6 py-2.5",
      icon: "size-9",
      iconsm: "size-7",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export default function Button({ variant, size, className, ...props }) {
  return <button className={button({ variant, size, className })} {...props} />;
}
