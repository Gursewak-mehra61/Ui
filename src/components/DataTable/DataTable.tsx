import React, { useState } from "react";
import { DataTableProps, Column } from "./DataTable.types";

export const DataTable = <T extends {}>({
  columns,
  data,
  loading = false,
  rowSelection = false,
  onRowSelect,
  renderCell,
  sortField,
  sortDirection = "asc",
  onSort,
  onEdit,    // Callback for edit action
  onDelete,  // Callback for delete action
}: DataTableProps<T> & { onEdit?: (row: T) => void; onDelete?: (row: T) => void }) => {
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  const handleSelect = (idx: number) => {
    let updated: number[];
    if (selectedIndexes.includes(idx)) {
      updated = selectedIndexes.filter(i => i !== idx);
    } else {
      updated = [...selectedIndexes, idx];
    }
    setSelectedIndexes(updated);
    onRowSelect?.(updated.map(i => data[i]));
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            {rowSelection && <th className="w-10 p-3"></th>}
            {columns.map(col => (
              <th key={col.key} className="border-b border-gray-200 p-3 text-left">
                {col.sortable ? (
                  <button
                    onClick={() => onSort?.(col.dataIndex)}
                    className="flex items-center gap-2 font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {col.title}
                    {sortField === col.dataIndex && (
                      <span className="text-blue-600">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                    {sortField !== col.dataIndex && <span className="text-gray-400">↕</span>}
                  </button>
                ) : (
                  <span className="font-semibold text-gray-700">{col.title}</span>
                )}
              </th>
            ))}
            <th className="w-24 border-b border-gray-200 p-3 text-center font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (rowSelection ? 2 : 1)} className="text-center p-4">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (rowSelection ? 2 : 1)} className="text-center p-4">
                No results found
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 border-b border-gray-100 transition-colors">
                {rowSelection && (
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedIndexes.includes(idx)}
                      onChange={() => handleSelect(idx)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </td>
                )}
                {columns.map(col => (
                  <td key={col.key} className="p-3">
                    {renderCell ? renderCell(row, col) : (row as any)[col.dataIndex]}
                  </td>
                ))}
                <td className="p-3 text-center">
                  <div className="flex gap-2 justify-center">
                    <button
                      title="Edit"
                      className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      onClick={() => onEdit && onEdit(row)}
                    >
                      {/* Edit icon SVG */}
                      <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M12 2l2 2m-2-2l-8 8m0 4h4l8-8" />
                      </svg>
                    </button>
                    <button
                      title="Delete"
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      onClick={() => onDelete && onDelete(row)}
                    >
                      {/* Delete icon SVG */}
                      <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M6 2v2M10 2v2m-7 2h14" />
                        <path d="M4 6v8c0 1 1 2 2 2h4c1 0 2-1 2-2V6" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
