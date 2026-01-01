// components/admin/jobs/JobCard.tsx
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MapPin, Wrench, Trash2 } from "lucide-react";
import type { Job } from "./types";


type JobCardProps = {
  job: Job;
  onClick: () => void;
  onDelete: (id: string) => void;
};

export function JobCard({ job, onClick, onDelete }: JobCardProps) {
  return (
    <Card
      className="overflow-hidden hover:ring-2 hover:ring-primary transition-all cursor-pointer group relative"
      onClick={onClick}
    >
      {/* Image */}
      <div className="aspect-square relative bg-muted h-20">
        {job.cover_image_url.length > 0 ? (
          <img
            src={job.cover_image_url[0]}
            alt={job.title}
            className="w-full  object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-job.jpg";
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Wrench className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}

        {/* Status & Bids */}
        <div className="absolute top-2 left-2">
          <Badge variant={job.status === "open" ? "default" : "secondary"} className="text-xs">
            {job.status.toUpperCase()}
          </Badge>
        </div>
        <div className="absolute bottom-2 right-2">
          <Badge variant="secondary" className="text-xs">
            {job._count.bids} bid{job._count.bids !== 1 ? "s" : ""}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardHeader className="p-3 pb-2">
        <h3 className="font-medium text-sm line-clamp-2 leading-tight">{job.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-green-600">${job.budget}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{job.location.city}</span>
        </div>
      </CardHeader>

      {/* Hover Delete Button */}
      <div
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon" className="h-7 w-7">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete job?</AlertDialogTitle>
              <AlertDialogDescription>
                Permanently remove "<strong>{job.title}</strong>"? This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(job.id)}
                className="bg-destructive text-destructive-foreground"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
}