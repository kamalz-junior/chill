import { Check } from "lucide-react";
import { Link } from "react-router";
import Badge from "~/components/ui/badge";
import { button } from "~/components/ui/button";
import { formatCurrency } from "~/lib/utils";

export default function PlanCard({ plan, className }) {
  return (
    <div
      className={`flex w-full flex-col gap-4 rounded-lg border p-6 ${className}`}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">{plan.name}</h3>
          {plan.name === "Duo" && <Badge>Popular</Badge>}
        </div>
        <div className="flex items-end gap-2 py-2">
          <span className="font-medium text-2xl">
            {formatCurrency(plan.price.monthly, plan.price.currency)}
          </span>
          <span className="text-muted-foreground">/ Month</span>
        </div>
        <p className="text-muted-foreground text-sm">{plan.description}</p>
      </div>
      <ul className="flex-1 space-y-2">
        {plan.features.map((feature, index) => (
          <li
            key={index}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <Check className="size-4" />
            <p className="text-sm">{feature}</p>
          </li>
        ))}
      </ul>
      <Link
        to={`/checkout/${plan.id}`}
        className={button({ className: "w-full" })}
      >
        Subscribe
      </Link>
    </div>
  );
}
