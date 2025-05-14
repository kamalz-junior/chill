import { Check, Copy, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import PlanCard from "~/components/plan-card";
import Button from "~/components/ui/button";
import Radio from "~/components/ui/radio";
import { formatCurrency } from "~/lib/utils";

const COUNT_TIME = 1 * 3600;

export default function Payment() {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user")),
  );
  const [checkout, setCheckout] = useState(
    JSON.parse(window.localStorage.getItem("checkout")),
  );
  const [transaction, setTransaction] = useState({
    id: `txn_${Date.now()}`,
    status: checkout.status,
    breakdown: {
      price: checkout.plan.price.monthly,
      adminFee: checkout.adminFee,
      total: checkout.plan.amount,
    },
    date: checkout.date,
  });

  const adminFee = 3000;
  const total = checkout.plan.price.monthly + adminFee;

  const handleSubmit = (e) => {
    e.preventDefault();

    setCheckout({
      ...checkout,
      status: "completed",
    });
    setTransaction({
      ...transaction,
      date: new Date().toISOString().split("T")[0],
      status: "completed",
    });

    setUser({ ...user, isPremium: true });

    window.localStorage.setItem("checkout", JSON.stringify(checkout));
    window.localStorage.setItem("transactions", JSON.stringify(transaction));
  };

  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <main className="container space-y-8 py-8">
      {transaction.status === "completed" ? (
        <div className="flex items-center justify-center gap-2 rounded-md bg-muted p-6">
          <div className="flex size-6 items-center justify-center rounded-full border bg-green-500">
            <Check className="size-4" />
          </div>
          Payment Success
        </div>
      ) : (
        <>
          <div className="space-y-4 rounded-md bg-muted p-6">
            <p className="text-center font-medium">Make payment before</p>
            <CountDown time={COUNT_TIME} />
          </div>
          <h1 className="font-medium text-xl">Transaction Payment</h1>
          <div className="grid gap-6 md:grid-cols-3">
            <PlanCard plan={checkout.plan} />
            <form
              action=""
              className="space-y-4 md:col-span-2"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-2 *:text-sm">
                <label htmlFor="payment-method" className="font-medium">
                  Payment method
                </label>
                <label className="flex items-center gap-4 rounded-md border p-4 font-medium text-sm has-checked:border-primary has-checked:bg-primary/10">
                  <Radio
                    name="payment-method"
                    value={checkout.paymentMethod}
                    defaultChecked={!!checkout.paymentMethod}
                  />
                  <Wallet className="size-5" />
                  E-Wallet
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Buy Dates</span>
                  <span className="justify-end text-sm">{checkout.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Code Transactin</span>
                  <div className="flex items-center gap-1">
                    <span className="justify-end text-sm">
                      {transaction.id}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-sm"
                    >
                      <Copy className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <label className="font-medium">Transaction Summary</label>
                <div className="grid gap-2 *:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {checkout.plan.name} plan
                    </span>
                    <span className="justify-end">
                      {formatCurrency(
                        checkout.plan.price.monthly,
                        checkout.plan.price.currency,
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Admin fee</span>
                    <span className="justify-end">
                      {formatCurrency(adminFee, checkout.plan.price.currency)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Payment</span>
                    <span className="justify-end">
                      {formatCurrency(total, checkout.plan.price.currency)}
                    </span>
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Pay
              </Button>
            </form>
          </div>
        </>
      )}
    </main>
  );
}

function CountDown({ time }) {
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <span className="font-mono text-lg">
          {hours.toString().padStart(2, "0")}
        </span>
        <span className="text-muted-foreground">hours</span>
      </div>
      <span className="">:</span>
      <div className="flex items-center gap-2">
        <span className="font-mono text-lg">
          {minutes.toString().padStart(2, "0")}
        </span>
        <span className="text-muted-foreground">minutes</span>
      </div>
      <span className="">:</span>
      <div className="flex items-center gap-2">
        <span className="font-mono text-lg">
          {seconds.toString().padStart(2, "0")}
        </span>
        <span className="text-muted-foreground">seconds</span>
      </div>
    </div>
  );
}
