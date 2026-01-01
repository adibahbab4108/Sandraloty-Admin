// types/job.ts

export type JobStatus = "open" | "in_progress" | "completed" | "cancelled";

export type Consumer = {
  first_name: string;
  last_name: string;
  profile_url: string | null;
};

export type Location = {
  id: string;
  user_id: string;
  place_id: string | null;
  address_text: string;
  latitude: string;
  longitude: string;
  label: string | null;
  city: string;
  state: string;
  country: string;
  created_at: string;
};

export type Service = {
  id: string;
  name: string;
  slug: string;
  icon_url: string | null;
  description: string | null;
  application_cost: string;
  is_active: boolean;
  created_at: string;
};

export type JobService = {
  id: string;
  job_id: string;
  service_id: string;
  service: Service;
};

export type JobCount = {
  bids: number;
};

export type Job = {
  id: string;
  consumer_id: string;
  contractor_id: string | null;
  title: string;
  description: string;
  budget: string;
  location_id: string;
  status: JobStatus;
  vehicle_type: string | null;
  cover_image_url: string[];
  posted_at: string;
  updated_at: string;

  // Relations
  consumer: Consumer;
  location: Location;
  services: JobService[];

  // Aggregations
  _count: JobCount;
};