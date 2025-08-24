export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  rowSelection?: boolean;
  onRowSelect?: (selected: T[]) => void;
  renderCell?: (row: T, col: Column<T>) => React.ReactNode;
  sortField?: keyof T | null;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: keyof T) => void;
  onEdit?: (row: T, index: number) => void;
  onDelete?: (row: T, index: number) => void;
}
