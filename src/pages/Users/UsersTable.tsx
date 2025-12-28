import React from 'react';
import { columns } from './Columns';
import { DataTable } from '../DataTable';
import { useGetUsersQuery } from '@/redux/features/user/user.api';

export default function UsersTable({
  searchQuery,
  sortQuery,
  sortOrder,
}: {
  searchQuery: string;
  sortQuery: string;
  sortOrder: string;
}) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: userData, isLoading: isUserLoading } = useGetUsersQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: searchQuery,
    sortBy: sortQuery,
    sortOrder,
  })
  console.log(userData?.data)
  const totalRows = userData?.meta?.pagination?.total ?? 0;
  const totalPages = Math.ceil(totalRows / pagination.pageSize);

  return (
    <div className="overflow-hidden rounded-md border">
      <DataTable
        columns={columns}
        data={userData?.data ?? []}
        totalRows={totalRows}
        totalPages={totalPages}
        pagination={pagination}
        onPaginationChange={setPagination}
        isLoading={isUserLoading}
      />
    </div>
  );
}
