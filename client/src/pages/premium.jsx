import Features from "~/components/features";
import PlanCard from "~/components/plan-card";
import { plans } from "~/constants/plans";

export default function Premium() {
  return (
    <main className="container space-y-8 py-8">
      <section className="space-y-6">
        <div className="space-y-2 py-4">
          <h1 className="text-center font-medium text-xl">Why Subscribe</h1>
        </div>
        <Features />
      </section>
      <section className="space-y-6">
        <div className="space-y-2 py-4">
          <h1 className="text-center font-medium text-xl">Choose your plan</h1>
          <p className="text-center text-muted-foreground">
            Find a plan that suits your needs.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </section>
    </main>
  );
}
