import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Button from "~/components/ui/button";

export default function Input({ type, className, ...props }) {
  const [typeState, setTypeState] = useState(type);

  return (
    <div className="relative w-full">
      <input
        type={typeState}
        className={`w-full rounded-md border px-4 py-2 text-sm outline-hidden focus-visible:ring-3 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
      {type === "password" ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => {
            setTypeState(typeState === "password" ? "text" : "password");
          }}
          className="absolute top-0 right-0 hover:bg-transparent"
        >
          {typeState === "password" ? (
            <Eye className="size-4" />
          ) : (
            <EyeOff className="size-4" />
          )}
        </Button>
      ) : null}
    </div>
  );
}
