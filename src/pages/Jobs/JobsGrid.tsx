// components/admin/jobs/JobsGrid.tsx
"use client";

import { useState } from "react";
import { JobCard } from "./JobCard";
import { JobDetailDialog } from "./JobDetailDialog";
import { useGetJobsQuery } from "@/redux/features/jobs/jobs.api";
import type { Job } from "./types";

export function JobsGrid() {
  const { data: jobs = [], isLoading } = useGetJobsQuery(undefined);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleDelete = (id: string) => {
    console.log("Delete job:", id);
    // Connect your delete mutation here
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">No jobs posted yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {jobs?.data?.map((job: Job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={() => setSelectedJob(job)}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <JobDetailDialog
        job={selectedJob}
        open={!!selectedJob}
        onOpenChange={() => setSelectedJob(null)}
      />
    </>
  );
}