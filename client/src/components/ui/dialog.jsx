import { X } from "lucide-react";
import Button from "~/components/ui/button";
import useClickOutside from "~/hooks/use-click-outside";

export default function Dialog({ children, isOpen, setIsOpen }) {
  const ref = useClickOutside(() => setIsOpen(false));

  return isOpen ? (
    <>
      <div
        ref={ref}
        role="dialog"
        className="-translate-1/2 fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-100px)] w-full max-w-3xl overflow-auto rounded-md border bg-card"
      >
        <Button
          variant="ghost"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-50 bg-transparent text-white text-xs hover:bg-transparent"
        >
          <X className="size-5" />{" "}
        </Button>
        {children}
      </div>
      <div className="fixed inset-0 z-40 bg-background/50" />
    </>
  ) : null;
}
