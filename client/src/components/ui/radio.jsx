export default function Radio({ className, ...props }) {
  return (
    <input
      type="radio"
      className={`box-content size-2 appearance-none rounded-full border-4 border-transparent outline-hidden ring-1 ring-border checked:border-primary checked:ring-primary focus-visible:ring-4 focus-visible:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    />
  );
}
