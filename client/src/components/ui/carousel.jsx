import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect } from "react";
import Button from "~/components/ui/button";

export default function Carousel({ children, controls }) {
  const [ref, api] = useEmblaCarousel({ align: "start" });

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  useEffect(() => {
    if (!api) return;
  }, [api]);

  return (
    <div className="group relative">
      <div ref={ref} className="md:overflow-hidden">
        <div className="-ml-4 flex items-center *:pl-4">{children}</div>
      </div>
      {controls ? (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollPrev()}
            className="-left-4 -translate-y-1/2 absolute top-1/2 z-10 hidden rounded-full group-hover:flex"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollNext()}
            className="-right-4 -translate-y-1/2 absolute top-1/2 z-10 hidden rounded-full group-hover:flex"
          >
            <ChevronRight className="size-5" />
          </Button>
        </>
      ) : null}
    </div>
  );
}
