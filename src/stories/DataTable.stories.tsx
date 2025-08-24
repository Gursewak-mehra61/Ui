import React, { useState } from 'react';
import { Meta, StoryObj } from "@storybook/react-webpack5";

import { DataTable, DataTableProps, Column } from '../components/DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const columns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: false },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Sam Johnson', email: 'sam@example.com', age: 40 },
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable<User>,
  argTypes: {
    rowSelection: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<DataTableProps<User>>;

export const Default: Story = {
  args: {
    columns,
    data,
  },
};

export const rowSelectionRows: Story = {
  args: {
    columns,
    data,
    rowSelection: true,
  },
};

export const LoadingState: Story = {
  args: {
    columns,
    data: [],
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    columns,
    data: [],
  },
};

export const WithRowSelectHandler: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    return (
      <div>
        <DataTable
          data={data}
          columns={columns}
          rowSelection
          onRowSelect={(rows) => setSelectedRows(rows)}
        />
        <p className="mt-2 text-sm text-gray-600">
          Selected Rows: {selectedRows.map((r) => r.name).join(', ')}
        </p>
      </div>
    );
  },
};
