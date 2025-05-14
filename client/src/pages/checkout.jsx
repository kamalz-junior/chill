import { CreditCard } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import PlanCard from "~/components/plan-card";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";
import Radio from "~/components/ui/radio";
import { plans } from "~/constants/plans";
import { formatCurrency } from "~/lib/utils";

const ADMIN_FEE = 3000;

export default function Checkout() {
  const { checkoutId } = useParams();
  const navigate = useNavigate();

  const plan = plans.find((plan) => plan.id === checkoutId);

  const [checkout, setCheckout] = useState({
    checkoutId: `chk_${Date.now()}`,
    plan: plan,
    paymentMethod: "",
    adminFee: ADMIN_FEE,
    amount: plan.price.monthly + ADMIN_FEE,
    status: "pending",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    window.localStorage.setItem("checkout", JSON.stringify(checkout));

    navigate(`/checkout/${checkoutId}/pay`);
  };

  return (
    <main className="container space-y-8 py-8">
      <div className="grid gap-6 md:grid-cols-3">
        <PlanCard plan={plan} />
        <form
          action=""
          className="space-y-4 md:col-span-2"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-2">
            <label htmlFor="payment-method" className="font-medium">
              Metode Pembayaran
            </label>
            <div className="grid gap-2">
              <label className="flex items-center gap-4 rounded-md border p-4 font-medium text-sm has-checked:border-primary has-checked:bg-primary/10">
                <Radio
                  name="payment-method"
                  value="debit"
                  onChange={(e) =>
                    setCheckout({
                      ...checkout,
                      paymentMethod: e.target.value,
                    })
                  }
                  required
                />
                <CreditCard className="size-5" />
                Debit/Credit
              </label>
              <label className="flex items-center gap-4 rounded-md border p-4 font-medium text-sm has-checked:border-primary has-checked:bg-primary/10">
                <Radio
                  name="payment-method"
                  value="e-wallet"
                  onChange={(e) =>
                    setCheckout({
                      ...checkout,
                      paymentMethod: e.target.value,
                    })
                  }
                  required
                />
                <CreditCard className="size-5" />
                E-Wallet
              </label>
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="voucher">Kode Voucher</label>
            <div className="flex items-center gap-2">
              <Input name="voucher" placeholder="Masukan Kode Voucher" />
              <Button type="button" variant="secondary">
                Terapkan
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <label className="font-medium">Transaction summary</label>
            <div className="grid gap-2 *:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{plan.name} plan</span>
                <span className="justify-end">
                  {formatCurrency(plan.price.monthly, plan.price.currency)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Admin fee</span>
                <span className="justify-end">
                  {formatCurrency(ADMIN_FEE, plan.price.currency)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total payment</span>
                <span className="justify-end">
                  {formatCurrency(checkout.amount, plan.price.currency)}
                </span>
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Checkout
          </Button>
        </form>
      </div>
    </main>
  );
}
