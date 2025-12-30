import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import defaultAvatar from '@/assets/default-image.jpg';
import { formatDate } from '@/utils/formatDate'; // adjust path if needed

export type Provider = {
  id: string;
  user_id: string;
  is_verified: boolean;
  search_radius_km: number;
  current_credit_balance: string;
  average_rating: string;
  completed_jobs_count: number;
  updated_at: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    profile_url: string;
  };
  _count: {
    bids: number;
    assigned_jobs: number;
  };
};

export const columns: ColumnDef<Provider>[] = [
  // User (Name + Avatar + Email)
  {
    header: 'Contractor',
    cell: ({ row }) => {
      const provider = row.original;
      const { user } = provider;
      const fullName = `${user.first_name} ${user.last_name}`;
      const avatarSrc = user.profile_url || defaultAvatar;

      return (
        <div className="flex items-center gap-3">
          <img
            src={avatarSrc}
            alt={fullName}
            className="h-10 w-10 rounded-full object-cover border"
            onError={(e) => {
              e.currentTarget.src = defaultAvatar;
            }}
          />
          <div className="flex flex-col">
            <span className="font-medium leading-none">{fullName}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      );
    },
  },

  // Verified Status
  {
    header: 'Verification',
    cell: ({ row }) => {
      const isVerified = row.original.is_verified;
      return isVerified ? (
        <Badge className="bg-green-600 text-white">Verified</Badge>
      ) : (
        <Badge variant="destructive">Not Verified</Badge>
      );
    },
  },

  // Role (always contractor here)
  {
    header: 'Role',
    cell: () => (
      <Badge className="bg-yellow-500 text-white">Contractor</Badge>
    ),
  },

  // Completed Jobs
  {
    accessorKey: 'completed_jobs_count',
    header: 'Completed Jobs',
    cell: ({ row }) => (
      <span className="font-medium">{row.original.completed_jobs_count}</span>
    ),
  },

  // Bids & Assigned Jobs
  {
    header: 'Activity',
    cell: ({ row }) => {
      const { bids, assigned_jobs } = row.original._count;
      return (
        <div className="flex flex-col text-sm">
          <span>Bids: <strong>{bids}</strong></span>
          <span>Assigned: <strong>{assigned_jobs}</strong></span>
        </div>
      );
    },
  },

  // Credit Balance
  {
    accessorKey: 'current_credit_balance',
    header: 'Credits',
    cell: ({ row }) => (
      <span className="font-medium">{row.original.current_credit_balance}</span>
    ),
  },

  // Joined / Last Updated
  {
    accessorKey: 'updated_at',
    header: 'Last Active',
    cell: ({ row }) => formatDate(row.original.updated_at),
  },

  // Actions
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const provider = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Profile</DropdownMenuItem>
            <DropdownMenuItem>View Bids</DropdownMenuItem>
            <DropdownMenuItem>View Assigned Jobs</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Remove Contractor
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];