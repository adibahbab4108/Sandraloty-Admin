// app/admin/jobs/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JobsGrid } from "./JobsGrid";


export default function AdminJobsPage() {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">All Posted Jobs</CardTitle>
          <p className="text-muted-foreground mt-2">
            Monitor and manage service requests across the platform
          </p>
        </CardHeader>
        <CardContent>
          <JobsGrid />
        </CardContent>
      </Card>
    </div>
  );
}