import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StripeEmbeddedCheckoutPanel } from "./StripeEmbeddedCheckout";

export function CheckoutDialog({
  open,
  onOpenChange,
  title,
  fetchClientSecret,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  fetchClientSecret: (() => Promise<string>) | null;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-5 pt-5">
          <DialogTitle className="text-base">{title}</DialogTitle>
        </DialogHeader>
        <div className="p-2">
          {fetchClientSecret && (
            <StripeEmbeddedCheckoutPanel fetchClientSecret={fetchClientSecret} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}