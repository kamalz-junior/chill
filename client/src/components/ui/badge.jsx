import { tv } from "tailwind-variants";

const badge = tv({
  base: "inline-flex w-fit cursor-default justify-center gap-2 rounded-md px-2 py-0.5 font-medium text-xs",
  variants: {
    variant: {
      primary:
        "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "border-transparent bg-muted hover:bg-muted/80",
      outline: "border bg-background hover:bg-muted/80",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export default function Badge({ variant, className, ...props }) {
  return <span className={badge({ variant, className })} {...props} />;
}
