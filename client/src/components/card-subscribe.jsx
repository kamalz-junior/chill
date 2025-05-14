import { Link } from "react-router";
import Badge from "./ui/badge";
import { button } from "./ui/button";

export default function CardSubscibe({ isPremium, name, date }) {
  return (
    <div
      className={`h-fit w-fit rounded-md border p-6 md:w-1/2 ${isPremium ? "bg-primary" : "bg-muted"}`}
    >
      <div className="flex items-center gap-4">
        <img src="images/Warning.png" alt="" className="size-22" />
        <div className="space-y-4">
          {isPremium && (
            <Badge className="bg-white px-4 py-1 text-muted text-xs hover:bg-white md:text-sm">
              Aktif
            </Badge>
          )}
          <div className="space-y-1">
            <h3 className="font-medium text-xs md:text-base">
              {isPremium ? `Premium ${name}✨` : "Subscription"}
            </h3>
            <p className="w-full text-xs md:text-base">
              {isPremium
                ? "You are currently using premium account access"
                : "Get Unlimited Access to Thousands of Your Favorite Movies and Series!"}
            </p>
          </div>
          {!isPremium ? (
            <Link
              to="/premium"
              className={button({
                variant: "primary",
              })}
            >
              Subscribe
            </Link>
          ) : (
            <p className="text-xs md:text-base">
              Berlaku hingga{" "}
              <span className="text-xs md:text-base">{date}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
