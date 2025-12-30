"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Loader2 } from "lucide-react";
import { useUpdateSubscriptionsMutation } from "@/redux/features/subscription/subscription.api";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

type PlanFromAPI = {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  duration_days: number;
  credits_per_cycle: string;
  is_highlighted: boolean;
  has_verified_badge: boolean;
  priority_listing: boolean;
  notification_delay_min: number;
  bid_discount_pct: string;
  can_view_premium_jobs: boolean;
  is_active: boolean;
  created_at: string;
  _count: { user_subscriptions: number };
};

type EditPlanDialogProps = {
  plan: PlanFromAPI;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EditPlanDialog({ plan, open, onOpenChange }: EditPlanDialogProps) {
  const [updateSubscription, { isLoading }] = useUpdateSubscriptionsMutation();

  // Initial form state from real API data
  const [formData, setFormData] = useState({
    name: plan.name || "",
    description: plan.description || "",
    price: parseFloat(plan.price) || 0,
    currency: plan.currency || "USD",
    duration_days: plan.duration_days || 30,
    credits_per_cycle: parseInt(plan.credits_per_cycle) || 0,
    is_highlighted: plan.is_highlighted || false,
    has_verified_badge: plan.has_verified_badge || false,
    priority_listing: plan.priority_listing || false,
    notification_delay_min: plan.notification_delay_min || 30,
    bid_discount_pct: parseInt(plan.bid_discount_pct) || 0,
    can_view_premium_jobs: plan.can_view_premium_jobs || false,
    is_active: plan.is_active,
  });

  const handleSubmit = async () => {
    try {
      await updateSubscription({
        id: plan.id,
        data: {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          currency: formData.currency,
          duration_days: formData.duration_days,
          credits_per_cycle: formData.credits_per_cycle,
          is_highlighted: formData.is_highlighted,
          has_verified_badge: formData.has_verified_badge,
          priority_listing: formData.priority_listing,
          notification_delay_min: formData.notification_delay_min,
          bid_discount_pct: formData.bid_discount_pct,
          can_view_premium_jobs: formData.can_view_premium_jobs,
          is_active: formData.is_active,
        },
      }).unwrap();

      toast.success("Subscription plan updated successfully.");
      onOpenChange(false);
    } catch (error: any) {
      console.error("Update failed:", error);
      toast.error(
        error?.data?.message || "Failed to update plan. Please check all fields."
      );
    }
  };

  const features = [
    { key: "is_highlighted", label: "Highlighted Listing" },
    { key: "priority_listing", label: "Priority in Search Results" },
    { key: "notification_delay_min", label: "Instant Job Alerts", invert: true }, // 0 means instant
    { key: "bid_discount_pct", label: "Lower Bid/Lead Cost", positive: true },
    { key: "has_verified_badge", label: "Verified Badge on Profile" },
    { key: "can_view_premium_jobs", label: "Can View Premium Jobs" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Subscription Plan</DialogTitle>
          <DialogDescription>
            Update "{plan.name}" plan details and features.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Name & Description */}
          <div className="grid gap-2">
            <Label htmlFor="name">Plan Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* Price & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Price ({formData.currency})</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="duration">Duration (days)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                value={formData.duration_days}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration_days: parseInt(e.target.value) || 30,
                  })
                }
              />
            </div>
          </div>

          {/* Credits per Cycle */}
          <div className="grid gap-2">
            <Label htmlFor="credits">Credits per Cycle</Label>
            <Input
              id="credits"
              type="number"
              min="0"
              value={formData.credits_per_cycle}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  credits_per_cycle: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="font-medium">Included Features</h4>

            {features.map((feature) => {
              const rawValue = formData[feature.key as keyof typeof formData];
              let isActive: boolean;

              if (feature.invert) {
                isActive = (rawValue as number) === 0;
              } else if (feature.positive) {
                isActive = (rawValue as number) > 0;
              } else {
                isActive = !!rawValue;
              }

              const toggle = () => {
                if (feature.key === "notification_delay_min") {
                  setFormData({
                    ...formData,
                    notification_delay_min: isActive ? 30 : 0,
                  });
                } else if (feature.key === "bid_discount_pct") {
                  setFormData({
                    ...formData,
                    bid_discount_pct: isActive ? 0 : 15,
                  });
                } else {
                  setFormData({
                    ...formData,
                    [feature.key]: !isActive,
                  });
                }
              };

              return (
                <div
                  key={feature.key}
                  onClick={toggle}
                  className={`flex items-center justify-between rounded-lg border px-2 py-1 transition-all cursor-pointer
                    ${isActive ? "ring-1 ring-primary bg-primary/5" : "hover:bg-muted/50"}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all
                        ${isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground/30"
                        }`}
                    >
                      {isActive && <Check className="h-4 w-4" />}
                    </div>
                    <Label className="cursor-pointer font-medium">
                      {feature.label}
                    </Label>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Toggle */}
          <div
            onClick={() =>
              setFormData({ ...formData, is_active: !formData.is_active })
            }
            className="flex items-center justify-between rounded-lg border px-2 py-1 cursor-pointer hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all
                  ${formData.is_active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30"
                  }`}
              >
                {formData.is_active && <Check className="h-4 w-4" />}
              </div>
              <Label className="cursor-pointer font-medium">
                Plan is Active (visible to users)
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}