import React from "react";
import { Button } from "@/components/ui/button";
import { PenLine, SquareArrowOutUpRight } from "lucide-react";

const statusColors: Record<"Pending" | "Active", string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Active: "bg-green-100 text-green-700",
};

type TableColumn = {
  text: string;
  dataField: string;
  formatter?: (value: any, row: any) => React.ReactNode;
};

type TableProps = {
  columns: TableColumn[];
  data: any[];
  loading: boolean;
  action?: React.ReactNode;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onReload?: () => void;
  indexed?: boolean;
  pagination?: boolean;
};

export default function Table({
  columns,
  data,
  loading,
  action,
  onEdit,
  indexed,
  pagination,
}: TableProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Business Lists</h2>
          <p className="text-gray-500 text-sm">
            Easily manage and explore the businesses listed here
          </p>
        </div>
        {action}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-purple-50">
              {indexed && (
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                  #
                </th>
              )}
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-700"
                >
                  {col.text}
                </th>
              ))}
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td
                  colSpan={columns.length + 3}
                  className="px-6 py-4 text-center"
                >
                  Loading...
                </td>
              </tr>
            ) : (
              data?.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  {/* Index */}
                  {indexed && (
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {rowIndex + 1}
                    </td>
                  )}
                  {/* Dynamic columns */}
                  {columns.map((col, idx) => (
                    <td key={idx} className="px-6 py-4 text-sm text-gray-800">
                      {col.formatter
                        ? col.formatter(row[col.dataField], row)
                        : row[col.dataField]}
                    </td>
                  ))}
                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        statusColors[row.status as "Pending" | "Active"] ?? ""
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  {/* Action Buttons */}
                  <td className="px-6 py-4 text-center space-x-2">
                    <Button
                      variant="outline"
                      className="border-[#6F00FF] border text-[#6F00FF] common-text hover:bg-purple-50"
                      onClick={() => onEdit && onEdit(row)}
                    >
                      <PenLine /> Edit
                    </Button>
                    {row.status === "Pending" ? (
                      <Button className="bg-[#6F00FF] text-white common-text py-2 px-6 hover:bg-purple-700">
                        <SquareArrowOutUpRight /> Preview
                      </Button>
                    ) : (
                      <Button className="bg-[#6F00FF] text-white common-text py-2 px-6 hover:bg-purple-700">
                        <SquareArrowOutUpRight /> Live Preview
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-center items-center mt-20 gap-2">
          <button className="p-2 rounded-full hover:bg-gray-200">‹</button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded-md ${
                page === 1
                  ? "bg-[#6F00FF] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="p-2 rounded-full hover:bg-gray-200">›</button>
        </div>
      )}
    </div>
  );
}
