"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, DollarSign, Wrench, Trash2, Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { useGetJobsQuery } from "@/redux/features/jobs/jobs.api";
import type { Job } from "./types";

export function JobsList() {
    const { data: jobs = [], isLoading } = useGetJobsQuery(undefined);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const handleJobDelete = (id: string) => {
        console.log("Delete job:", id);
        // TODO: Connect your delete mutation here
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                    <Card key={i} className="animate-pulse overflow-hidden">
                        <div className="aspect-square bg-muted" />
                        <CardHeader className="p-3">
                            <div className="h-4 bg-muted rounded w-full" />
                            <div className="h-3 bg-muted rounded w-2/3 mt-2" />
                        </CardHeader>
                    </Card>
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
            {/* Compact Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {jobs.map((job: Job) => (
                    <Card
                        key={job.id}
                        className="overflow-hidden hover:ring-2 hover:ring-primary transition-all cursor-pointer group"
                        onClick={() => setSelectedJob(job)}
                    >
                        {/* Job Image */}
                        <div className="aspect-square relative bg-muted">
                            {job.cover_image_url.length > 0 ? (
                                <img
                                    src={job.cover_image_url[0]}
                                    alt={job.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/placeholder-job.jpg";
                                    }}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <Wrench className="h-12 w-12 text-muted-foreground/40" />
                                </div>
                            )}

                            {/* Status Badge */}
                            <div className="absolute top-2 left-2">
                                <Badge variant={job.status === "open" ? "default" : "secondary"} className="text-xs">
                                    {job.status.toUpperCase()}
                                </Badge>
                            </div>

                            {/* Bids Count */}
                            <div className="absolute bottom-2 right-2">
                                <Badge variant="secondary" className="text-xs">
                                    {job._count.bids} bid{job._count.bids !== 1 ? "s" : ""}
                                </Badge>
                            </div>
                        </div>

                        {/* Title & Essentials */}
                        <CardHeader className="p-3 pb-2">
                            <h3 className="font-medium text-sm line-clamp-2 leading-tight">
                                {job.title}
                            </h3>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-lg font-bold text-green-600">${job.budget}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                <MapPin className="h-3 w-3" />
                                <span className="truncate">{job.location.city}</span>
                            </div>
                        </CardHeader>

                        {/* Delete Button - stops propagation */}
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
                                        <AlertDialogTitle>Delete this job?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Permanently remove "<strong>{job.title}</strong>"? This cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => handleJobDelete(job.id)}
                                            className="bg-destructive text-destructive-foreground"
                                        >
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Detail Dialog */}
            <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl pr-8">{selectedJob?.title}</DialogTitle>
                        <DialogDescription className="text-base mt-2">
                            {selectedJob?.description}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedJob && (
                        <div className="space-y-6 py-4">
                            {/* Image */}
                            {selectedJob.cover_image_url.length > 0 && (
                                <img
                                    src={selectedJob.cover_image_url[0]}
                                    alt={selectedJob.title}
                                    className="w-full rounded-lg object-cover max-h-96"
                                />
                            )}

                            {/* Key Info Grid */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="text-muted-foreground">Budget</p>
                                        <p className="font-semibold text-lg">${selectedJob.budget}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="px-3 py-1">
                                        {selectedJob._count.bids} bid{selectedJob._count.bids !== 1 ? "s" : ""}
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-2 col-span-2">
                                    <MapPin className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-muted-foreground">Location</p>
                                        <p className="font-medium">
                                            {selectedJob.location.address_text}
                                            <br />
                                            <span className="text-sm text-muted-foreground">
                                                {selectedJob.location.city}, {selectedJob.location.state}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Services */}
                            {selectedJob.services.length > 0 && (
                                <div>
                                    <p className="text-muted-foreground mb-2">Required Services</p>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedJob.services.map((s) => (
                                            <Badge key={s.service.id} variant="secondary" className="gap-1.5">
                                                {s.service.icon_url ? (
                                                    <img src={s.service.icon_url} alt="" className="h-4 w-4" />
                                                ) : (
                                                    <Wrench className="h-3 w-3" />
                                                )}
                                                {s.service.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Posted By */}
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={selectedJob.consumer.profile_url || undefined} />
                                    <AvatarFallback>
                                        {selectedJob.consumer.first_name[0]}{selectedJob.consumer.last_name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-muted-foreground">Posted by</p>
                                    <p className="font-medium">
                                        {selectedJob.consumer.first_name} {selectedJob.consumer.last_name}
                                    </p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                        <Calendar className="h-3 w-3" />
                                        {format(new Date(selectedJob.posted_at), "MMMM d, yyyy")}
                                    </p>
                                </div>
                            </div>

                            {/* Vehicle */}
                            {selectedJob.vehicle_type && (
                                <p className="text-sm">
                                    <strong>Vehicle Required:</strong> {selectedJob.vehicle_type}
                                </p>
                            )}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}