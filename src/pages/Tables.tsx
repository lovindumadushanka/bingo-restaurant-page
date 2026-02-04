import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { RefreshCw, Users, Calendar, Clock, Phone } from "lucide-react";

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
  reservationGuests?: number;
}

interface Reservation {
  time: string;
  table: number;
  name: string;
  guests: number;
  phone: string;
  status: "pending" | "seated" | "cancelled";
}

const Tables = () => {
  const [filter, setFilter] = useState<TableStatus | "all">("all");

  const tables: TableData[] = [
    { id: 1, capacity: 4, status: "available" },
    { id: 2, capacity: 4, status: "occupied", orderId: "#1245", items: 3, duration: "25 mins" },
    { id: 3, capacity: 6, status: "occupied", orderId: "#1247", items: 5, duration: "40 mins" },
    { id: 4, capacity: 2, status: "available" },
    { id: 5, capacity: 4, status: "occupied", orderId: "#1246", items: 2, duration: "15 mins" },
    { id: 6, capacity: 4, status: "cleaning" },
    { id: 7, capacity: 8, status: "reserved", reservationName: "Mr. Silva", reservationTime: "7:00 PM", reservationGuests: 6 },
    { id: 8, capacity: 4, status: "available" },
    { id: 9, capacity: 6, status: "available" },
    { id: 10, capacity: 4, status: "occupied", orderId: "#1249", items: 4, duration: "10 mins" },
    { id: 11, capacity: 2, status: "reserved", reservationName: "Ms. Fernando", reservationTime: "8:30 PM", reservationGuests: 2 },
    { id: 12, capacity: 8, status: "available" },
  ];

  const reservations: Reservation[] = [
    { time: "7:00 PM", table: 7, name: "Mr. Silva", guests: 6, phone: "077 123 4567", status: "pending" },
    { time: "8:30 PM", table: 11, name: "Ms. Fernando", guests: 2, phone: "076 987 6543", status: "pending" },
  ];

  const filteredTables = filter === "all" ? tables : tables.filter((t) => t.status === filter);

  const stats = {
    total: tables.length,
    available: tables.filter((t) => t.status === "available").length,
    occupied: tables.filter((t) => t.status === "occupied").length,
    reserved: tables.filter((t) => t.status === "reserved").length,
    cleaning: tables.filter((t) => t.status === "cleaning").length,
    occupancyRate: Math.round((tables.filter((t) => t.status === "occupied").length / tables.length) * 100),
  };

  const statusStyles: Record<TableStatus, string> = {
    available: "border-success bg-success/10",
    occupied: "border-destructive bg-destructive/10",
    reserved: "border-info bg-info/10",
    cleaning: "border-warning bg-warning/10",
  };

  const statusTextStyles: Record<TableStatus, string> = {
    available: "text-success",
    occupied: "text-destructive",
    reserved: "text-info",
    cleaning: "text-warning",
  };

  const filterButtons: { key: TableStatus | "all"; label: string; color?: string }[] = [
    { key: "all", label: "All Tables" },
    { key: "available", label: "Available", color: "bg-success" },
    { key: "occupied", label: "Occupied", color: "bg-destructive" },
    { key: "reserved", label: "Reserved", color: "bg-info" },
    { key: "cleaning", label: "Cleaning", color: "bg-warning" },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Table Status Overview</h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              04 Feb 2026
              <Clock className="w-4 h-4 ml-2" />
              2:45 PM
            </p>
          </div>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filterButtons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                filter === btn.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {btn.color && <span className={`w-2 h-2 rounded-full ${btn.color}`} />}
              {btn.label}
            </button>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-card border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Tables</p>
          </div>
          <div className="bg-success/10 border border-success/20 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-success">{stats.available}</p>
            <p className="text-sm text-muted-foreground">Available</p>
          </div>
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{stats.occupied}</p>
            <p className="text-sm text-muted-foreground">Occupied</p>
          </div>
          <div className="bg-info/10 border border-info/20 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-info">{stats.reserved}</p>
            <p className="text-sm text-muted-foreground">Reserved</p>
          </div>
          <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-warning">{stats.cleaning}</p>
            <p className="text-sm text-muted-foreground">Cleaning</p>
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">{stats.occupancyRate}%</p>
            <p className="text-sm text-muted-foreground">Occupancy</p>
          </div>
        </div>

        {/* Floor Layout */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Floor Layout</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredTables.map((table) => (
              <div
                key={table.id}
                className={`p-4 rounded-xl border-2 ${statusStyles[table.status]} cursor-pointer hover:shadow-lg transition-all duration-200 animate-fade-in`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold">T{table.id}</span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{table.capacity}</span>
                  </div>
                </div>

                <p className={`text-sm font-semibold uppercase ${statusTextStyles[table.status]}`}>
                  {table.status}
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
                    <p>{table.reservationGuests} guests</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Today's Reservations */}
        <div>
          <h2 className="text-xl font-bold mb-4">Reservations for Today</h2>
          <div className="bg-card border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-semibold">Time</th>
                  <th className="text-left p-4 font-semibold">Table</th>
                  <th className="text-left p-4 font-semibold">Name</th>
                  <th className="text-left p-4 font-semibold">Guests</th>
                  <th className="text-left p-4 font-semibold">Phone</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-4 font-medium">{res.time}</td>
                    <td className="p-4">T{res.table}</td>
                    <td className="p-4">{res.name}</td>
                    <td className="p-4">{res.guests}</td>
                    <td className="p-4 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {res.phone}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-warning/10 text-warning rounded-full text-sm font-medium">
                        Pending
                      </span>
                    </td>
                    <td className="p-4">
                      <Button size="sm">Seat</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tables;
