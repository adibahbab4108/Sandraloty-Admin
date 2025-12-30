"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProfessionalDetailsQuery } from "@/redux/features/contractor/professionals.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ProvidersTable } from "./ProvidersTable";

export default function ContractorDetailsPage() {
  const { data: providers = [], isLoading, isError } = useGetProfessionalDetailsQuery(undefined);

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Service Providers / Contractors</CardTitle>
            <CardDescription>Loading providers...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertDescription>
            Failed to load service providers. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div>
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Subscription Plans</h1>
          <p className="text-muted-foreground mt-1">
            Manage pricing tiers and features for contractors
          </p>
        </div>

        <Card>
          {/* <CardHeader>
            <CardTitle>Service Providers / Contractors</CardTitle>
            <CardDescription>
              Manage and view all registered contractors on the platform ({providers.length} total)
            </CardDescription>
          </CardHeader> */}
          <CardContent>
            {providers.length > 0 ? (
              <ProvidersTable data={providers} />
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                No service providers found.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}