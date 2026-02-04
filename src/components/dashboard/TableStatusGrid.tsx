import { Users } from "lucide-react";

type TableStatus = "available" | "occupied" | "reserved" | "cleaning";

interface TableData {
  id: number;
  capacity: number;
  status: TableStatus;
  orderId?: string;
  items?: number;
  duration?: string;
  reservationName?: string;
  reservationTime?: string;
}

interface TableStatusGridProps {
  tables: TableData[];
  onTableClick?: (tableId: number) => void;
}

export const TableStatusGrid = ({ tables, onTableClick }: TableStatusGridProps) => {
  const statusLabels: Record<TableStatus, string> = {
    available: "Available",
    occupied: "Occupied",
    reserved: "Reserved",
    cleaning: "Cleaning",
  };

  const statusStyles: Record<TableStatus, string> = {
    available: "table-available",
    occupied: "table-occupied",
    reserved: "table-reserved",
    cleaning: "table-cleaning",
  };

  const statusTextStyles: Record<TableStatus, string> = {
    available: "text-success",
    occupied: "text-destructive",
    reserved: "text-info",
    cleaning: "text-warning",
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {tables.map((table) => (
        <div
          key={table.id}
          onClick={() => onTableClick?.(table.id)}
          className={`table-card ${statusStyles[table.status]} animate-fade-in`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold">T{table.id}</span>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-sm">{table.capacity}</span>
            </div>
          </div>

          <p className={`text-sm font-semibold ${statusTextStyles[table.status]}`}>
            {statusLabels[table.status]}
          </p>

          {table.status === "occupied" && (
            <div className="mt-2 text-xs text-muted-foreground">
              <p>{table.orderId}</p>
              <p>{table.items} items • {table.duration}</p>
            </div>
          )}

          {table.status === "reserved" && (
            <div className="mt-2 text-xs text-muted-foreground">
              <p>{table.reservationTime}</p>
              <p>{table.reservationName}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
