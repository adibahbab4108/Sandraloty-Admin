import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { MoreHorizontal, Edit, Trash2, Check, X } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { EditPlanDialog } from "./EditPlanDialog";
import { useDeleteSubscriptionPlanMutation } from "@/redux/features/subscription/subscription.api";
import { toast } from "sonner";

export type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  duration_days: number;
  notification_delay_min: number;
  bid_discount_pct: string;
  is_highlighted: boolean;
  has_verified_badge: boolean;
  priority_listing: boolean;
  credits_per_cycle: string;
  can_view_premium_jobs: boolean;
  is_active: boolean;
  created_at: string;
  _count: { user_subscriptions: number };
};

type SubscriptionCardProps = {
  plan: SubscriptionPlan;
};

export function SubscriptionCard({ plan }: SubscriptionCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
 
  const [deletePlan, { isLoading }] = useDeleteSubscriptionPlanMutation()
  const handleDeletePlan = async (id: string) => {
    console.log(id)
    try {
      const result = await deletePlan(id)
      console.log(result)
      if (result.error) toast.error((result.error as any)?.data?.error?.message)
      else
        toast.success("Deleted Permanently")

    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <>
      <Card className={`relative overflow-hidden transition-all ${plan.is_highlighted ? "border-primary shadow-lg" : ""}`}>
        {plan.is_highlighted && (
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium rounded-bl-lg">
            RECOMMENDED
          </div>
        )}

        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription className="mt-2">{plan.description}</CardDescription>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="border mt-2">
                  <MoreHorizontal className="h-4 w-4  " />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setIsEditOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Plan
                </DropdownMenuItem>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="text-destructive focus:text-destructive" onSelect={(e) => e.preventDefault()}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Plan
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete {plan.name}?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the subscription plan
                        and remove it from all users who might be considering it.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeletePlan(plan.id)} className="bg-destructive text-destructive-foreground">
                        Delete Permanently
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-center">
            <span className="text-4xl font-bold">${plan.price}</span>
            <span className="text-muted-foreground">/{plan.duration_days} days</span>
          </div>

          <div className="space-y-3">
            <FeatureItem active={true}>Up to {plan.credits_per_cycle} credits per cycle</FeatureItem>
            <FeatureItem active={plan.can_view_premium_jobs}>View premium jobs</FeatureItem>
            <FeatureItem active={plan.priority_listing}>Priority listing in search</FeatureItem>
            <FeatureItem active={plan.has_verified_badge}>Verified badge on profile</FeatureItem>
            <FeatureItem active={plan.bid_discount_pct !== "0"}>
              {plan.bid_discount_pct}% discount on bids
            </FeatureItem>
            <FeatureItem active={plan.notification_delay_min === 0}>
              Instant job notifications
            </FeatureItem>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              <strong>{plan._count.user_subscriptions}</strong> active subscribers
            </div>
            <Badge variant={plan.is_active ? "default" : "secondary"}>
              {plan.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="text-xs text-muted-foreground">
          Created {format(new Date(plan.created_at), "MMM d, yyyy")}
        </CardFooter>
      </Card>
      {/* Edit Dialog */}
      <EditPlanDialog
        plan={plan}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>

  );
}

function FeatureItem({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {active ? (
        <Check className="h-5 w-5 text-green-600" />
      ) : (
        <X className="h-5 w-5 text-muted-foreground" />
      )}
      <span className={active ? "text-foreground" : "text-muted-foreground"}>
        {children}
      </span>
    </div>
  );
}