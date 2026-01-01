// components/admin/jobs/JobDetailDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, DollarSign, Wrench, Calendar } from "lucide-react";
import { format } from "date-fns";
import type { Job } from "./types";

type JobDetailDialogProps = {
  job: Job | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function JobDetailDialog({ job, open, onOpenChange }: JobDetailDialogProps) {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl pr-8">{job.title}</DialogTitle>
          <DialogDescription className="text-base mt-3">
            {job.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Image */}
          {job.cover_image_url.length > 0 && (
            <img
              src={job.cover_image_url[0]}
              alt={job.title}
              className="w-full rounded-lg object-cover max-h-96"
            />
          )}

          {/* Key Info */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-green-600" />
              <div>
                <p className="text-muted-foreground">Budget</p>
                <p className="text-2xl font-bold">${job.budget}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-4 py-2 text-sm">
                {job._count.bids} bid{job._count.bids !== 1 ? "s" : ""}
              </Badge>
            </div>

            <div className="col-span-2 flex items-start gap-3">
              <MapPin className="h-6 w-6 text-muted-foreground mt-1" />
              <div>
                <p className="text-muted-foreground">Location</p>
                <p className="font-medium">{job.location.address_text}</p>
                <p className="text-sm text-muted-foreground">
                  {job.location.city}, {job.location.state}
                </p>
              </div>
            </div>
          </div>

          {/* Services */}
          {job.services.length > 0 && (
            <div>
              <p className="text-muted-foreground mb-3">Required Services</p>
              <div className="flex flex-wrap gap-2">
                {job.services.map((s) => (
                  <Badge key={s.service.id} variant="secondary" className="gap-2 py-1.5">
                    {s.service.icon_url ? (
                      <img src={s.service.icon_url} alt="" className="h-4 w-4" />
                    ) : (
                      <Wrench className="h-4 w-4" />
                    )}
                    {s.service.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Posted By */}
          <div className="flex items-center gap-4 border-t pt-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src={job.consumer.profile_url || undefined} />
              <AvatarFallback className="text-lg">
                {job.consumer.first_name[0]}{job.consumer.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-muted-foreground">Posted by</p>
              <p className="font-semibold text-lg">
                {job.consumer.first_name} {job.consumer.last_name}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(job.posted_at), "MMMM d, yyyy")}
              </p>
            </div>
          </div>

          {/* Vehicle */}
          {job.vehicle_type && (
            <p className="text-sm border-t pt-4">
              <strong>Vehicle Required:</strong> {job.vehicle_type}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}