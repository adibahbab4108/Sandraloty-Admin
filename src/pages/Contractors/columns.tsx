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

// ... other imports remain the same

export const columns: ColumnDef<Provider>[] = [
  // 1. Contractor → Keep left-aligned (default)
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

  // 2. Verification → Center
  {
    header: 'Verification',
    cell: ({ row }) => {
      const isVerified = row.original.is_verified;
      return (
        <div className="flex justify-center">
          {isVerified ? (
            <Badge className="bg-green-600 text-white">Verified</Badge>
          ) : (
            <Badge variant="destructive">Not Verified</Badge>
          )}
        </div>
      );
    },
  },

  // 3. Role → Center
//   {
//     header: 'Role',
//     cell: () => (
//       <div className="flex justify-center">
//         <Badge className="bg-yellow-500 text-white">Contractor</Badge>
//       </div>
//     ),
//   },

  // 4. Completed Jobs → Center
  {
    accessorKey: 'completed_jobs_count',
    header: 'Completed Jobs',
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.original.completed_jobs_count}
      </div>
    ),
  },

  // 5. Activity (Bids & Assigned) → Center
  {
    header: 'Activity',
    cell: ({ row }) => {
      const { bids, assigned_jobs } = row.original._count;
      return (
        <div className="text-center text-sm">
          <div>Bids: <strong>{bids}</strong></div>
          <div>Assigned: <strong>{assigned_jobs}</strong></div>
        </div>
      );
    },
  },

  // 6. Credits → Center
  {
    accessorKey: 'current_credit_balance',
    header: 'Credits',
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.original.current_credit_balance}
      </div>
    ),
  },

  // 7. Last Active → Center
  {
    accessorKey: 'updated_at',
    header: 'Last Active',
    cell: ({ row }) => (
      <div className="text-center">
        {formatDate(row.original.updated_at)}
      </div>
    ),
  },

  // 8. Actions → Center the button
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex justify-center">
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
      </div>
    ),
  },
];