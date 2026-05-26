import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckoutDialog } from "./CheckoutDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createTipCheckout } from "@/lib/payments.functions";
import { getStripeEnvironment } from "@/lib/stripe";
import { Heart } from "lucide-react";

const PRESETS = [100, 300, 500, 1000, 2500];

export function TipDialog({
  open,
  onOpenChange,
  creatorId,
  creatorName,
  postId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  creatorId: string;
  creatorName: string;
  postId?: string;
}) {
  const checkoutFn = useServerFn(createTipCheckout);
  const [amount, setAmount] = useState<number>(500);
  const [custom, setCustom] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const start = () => {
    onOpenChange(false);
    setCheckoutOpen(true);
  };

  const fetchSecret = checkoutOpen ? async () => {
    const cents = custom ? Math.round(parseFloat(custom) * 100) : amount;
    const res = await checkoutFn({
      data: {
        creatorId,
        amountCents: cents,
        postId,
        environment: getStripeEnvironment(),
        returnUrl: `${window.location.origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      },
    });
    if ("error" in res) throw new Error(res.error);
    return res.clientSecret;
  } : null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Heart className="h-4 w-4 text-gold" /> Tip {creatorName}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-2 pt-2">
            {PRESETS.map((c) => (
              <button
                key={c}
                onClick={() => { setAmount(c); setCustom(""); }}
                className={`rounded-md border py-2 text-sm transition ${
                  !custom && amount === c
                    ? "border-gold/60 bg-gold/10 text-gold"
                    : "border-border"
                }`}
              >
                ${(c / 100).toFixed(c % 100 === 0 ? 0 : 2)}
              </button>
            ))}
          </div>
          <div className="relative pt-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pt-1 text-sm text-muted-foreground">$</span>
            <input
              type="number"
              min="1"
              max="500"
              step="0.01"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Custom amount"
              className="w-full rounded-md border border-border bg-card px-7 py-2 text-sm outline-none focus:border-gold/50"
            />
          </div>
          <p className="text-[11px] text-muted-foreground">
            95% goes to the creator. AlgoRhythm keeps a 5% platform fee.
          </p>
          <button
            onClick={start}
            disabled={!custom && !amount}
            className="mt-2 w-full rounded-md bg-gradient-gold py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            Continue to payment
          </button>
        </DialogContent>
      </Dialog>
      <CheckoutDialog
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        title={`Tip ${creatorName}`}
        fetchClientSecret={fetchSecret}
      />
    </>
  );
}