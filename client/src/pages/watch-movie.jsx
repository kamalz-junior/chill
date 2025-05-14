import {
  Captions,
  CirclePause,
  Gauge,
  List,
  Maximize,
  Play,
  SkipForward,
  StepBack,
  StepForward,
  Volume1,
} from "lucide-react";
import { useState } from "react";
import Features from "~/components/features";
import Button from "~/components/ui/button";
import useClickOutside from "~/hooks/use-click-outside";

export default function WatchMovie() {
  const [isOverlay, setIsOverlay] = useState(false);

  const ref = useClickOutside(() => setIsOverlay(false));

  return (
    <main className="container space-y-8 p-8">
      <section className="space-y-6">
        <div className="relative aspect-video overflow-hidden rounded-md border">
          <video
            className="size-full"
            src="videos/Ted-Lasso-Darts-Scene-Be-Curious-Not-Judgemental.webm"
            poster="images/watch-movies.png"
          ></video>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <CirclePause className="size-10" />
            <Button
              size="sm"
              className="absolute right-8 bottom-20"
              onClick={() => setIsOverlay(true)}
            >
              Skip intro
            </Button>
          </div>
          <div className="absolute bottom-0 flex w-full items-center justify-between bg-black/40 px-6 py-4">
            <div className="flex items-center gap-4">
              <Play className="size-5" />
              <StepBack className="size-5" />
              <StepForward className="size-5" />
              <Volume1 className="size-5" />
            </div>
            <h1 className="font-medium">Guardian of The Galaxy vol.3</h1>
            <div className="flex items-center gap-4">
              <SkipForward className="size-5" />
              <List className="size-5" />
              <Captions className="size-5" />
              <Gauge className="size-5" />
              <Maximize className="size-5" />
            </div>
          </div>
          {isOverlay && (
            <div
              ref={ref}
              className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/80"
            >
              <div className="space-y-2">
                <h1 className="text-center font-medium text-3xl">
                  Premium service
                </h1>
                <p className="text-center text-muted-foreground">
                  Upgrade your plan to get watching this video.
                </p>
              </div>
              <p className="text-lg">Why your must subscribe?</p>
              <Features />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
