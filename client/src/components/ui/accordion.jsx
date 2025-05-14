import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Accordion({ label, className, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-2">
      <h3>
        <button
          className={`flex w-full items-center justify-between font-medium text-sm ${className}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {label}
          <ChevronDown
            className={`${isOpen ? "rotate-180" : "rotate-0"} size-4 transition-transform`}
          />
        </button>
      </h3>
      {isOpen ? children : null}
    </div>
  );
}
