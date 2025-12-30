

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { useGetSubscriptionsQuery } from "@/redux/features/subscription/subscription.api";
import { Plus } from "lucide-react";
import { SubscriptionCard, type SubscriptionPlan } from "./SubscriptionCard";
import { AddPlanDialog } from "./AddPlanDialog";
import { useState } from "react";


export default function SubscriptionPlansPage() {
     const [isAddOpen, setIsAddOpen] = useState(false);
    const { data: plans = [], isLoading, refetch } = useGetSubscriptionsQuery(undefined);

    if (isLoading) {
        return (
            <div className="container mx-auto py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="animate-pulse">
                            <CardHeader>
                                <div className="h-8 bg-muted rounded w-3/4" />
                                <div className="h-4 bg-muted rounded w-full mt-2" />
                            </CardHeader>
                            <CardContent>
                                <div className="h-12 bg-muted rounded w-1/3" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 ">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Subscription Plans</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage pricing tiers and features for contractors
                    </p>
                </div>

                <Button onClick={() => setIsAddOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Plan
                </Button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-8">
                {plans.map((plan: SubscriptionPlan) => (
                    <SubscriptionCard key={plan.id} plan={plan} />
                ))}
            </div>
            <AddPlanDialog
                open={isAddOpen}
                onOpenChange={setIsAddOpen}
                onSuccess={refetch}
            />

            {plans.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">No subscription plans found.</p>
                    <Button className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Create First Plan
                    </Button>
                </div>
            )}
        </div>
    );
}