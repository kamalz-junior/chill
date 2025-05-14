import {
  Captions,
  Download,
  FlagOff,
  GalleryHorizontal,
  TabletSmartphone,
  TvMinimal,
} from "lucide-react";

export default function Features({ className }) {
  return (
    <div className={`grid grid-cols-2 gap-6 md:grid-cols-3 ${className}`}>
      {features.map((feature) => (
        <div key={feature.label} className="flex flex-col items-center gap-4">
          {feature.icon}
          <span className="text-center text-muted-foreground text-sm">
            {feature.label}
          </span>
        </div>
      ))}
    </div>
  );
}

const features = [
  { label: "Download Selected Content", icon: <Download /> },
  { label: "No ads", icon: <FlagOff /> },
  { label: "Watch All Content ", icon: <GalleryHorizontal /> },
  { label: "Maximum Quality Up to 4K", icon: <TvMinimal /> },
  {
    label: "Watch on TV, Tablet, Mobile, and Laptop",
    icon: <TabletSmartphone />,
  },
  { label: "Subtitles for Selected Content", icon: <Captions /> },
];
