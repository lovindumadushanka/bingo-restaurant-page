import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { OrderCard } from "@/components/dashboard/OrderCard";
import { TableStatusGrid } from "@/components/dashboard/TableStatusGrid";
import { ClipboardList, DollarSign, Users, TrendingUp, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const activeOrders = [
    { orderId: "#1245", tableNumber: 5, items: 3, status: "preparing" as const, time: "15 mins" },
    { orderId: "#1246", tableNumber: 12, items: 5, status: "pending" as const, time: "8 mins" },
    { orderId: "#1247", tableNumber: 3, items: 2, status: "ready" as const, time: "22 mins" },
    { orderId: "#1248", tableNumber: 8, items: 4, status: "urgent" as const, time: "35 mins" },
  ];

  const tables = [
    { id: 1, capacity: 4, status: "available" as const },
    { id: 2, capacity: 4, status: "occupied" as const, orderId: "#1245", items: 3, duration: "25 mins" },
    { id: 3, capacity: 6, status: "occupied" as const, orderId: "#1247", items: 5, duration: "40 mins" },
    { id: 4, capacity: 2, status: "available" as const },
    { id: 5, capacity: 4, status: "occupied" as const, orderId: "#1246", items: 2, duration: "15 mins" },
    { id: 6, capacity: 4, status: "cleaning" as const },
    { id: 7, capacity: 8, status: "reserved" as const, reservationTime: "7:00 PM", reservationName: "Mr. Silva" },
    { id: 8, capacity: 4, status: "available" as const },
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back, John! Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={() => navigate("/new-order")}>
              <Plus className="w-4 h-4 mr-2" />
              New Order
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Orders Today"
            value={24}
            subtitle="15 completed"
            icon={ClipboardList}
            trend={{ value: 12, isPositive: true }}
            variant="primary"
          />
          <StatCard
            title="Total Sales"
            value="LKR 125,400"
            subtitle="Today's revenue"
            icon={DollarSign}
            trend={{ value: 8, isPositive: true }}
            variant="success"
          />
          <StatCard
            title="Active Tables"
            value="5/12"
            subtitle="3 occupied, 2 reserved"
            icon={Users}
            variant="default"
          />
          <StatCard
            title="Avg Order Value"
            value="LKR 5,225"
            subtitle="Per order"
            icon={TrendingUp}
            trend={{ value: 3, isPositive: true }}
            variant="warning"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Orders */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Active Orders</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate("/kitchen")}>
                View All →
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeOrders.map((order) => (
                <OrderCard
                  key={order.orderId}
                  {...order}
                  onView={() => console.log("View order", order.orderId)}
                  onBill={() => console.log("Bill order", order.orderId)}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start h-14 text-left"
                onClick={() => navigate("/new-order")}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                  <Plus className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">New Order</p>
                  <p className="text-xs text-muted-foreground">Create a new order</p>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-14 text-left"
                onClick={() => navigate("/tables")}
              >
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center mr-3">
                  <Users className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-semibold">Table Status</p>
                  <p className="text-xs text-muted-foreground">View all tables</p>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-14 text-left"
                onClick={() => navigate("/kitchen")}
              >
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center mr-3">
                  <ClipboardList className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="font-semibold">Kitchen Queue</p>
                  <p className="text-xs text-muted-foreground">View pending orders</p>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Table Status Overview */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Table Status Overview</h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-info" />
                <span className="text-muted-foreground">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-muted-foreground">Cleaning</span>
              </div>
            </div>
          </div>
          <TableStatusGrid tables={tables} onTableClick={(id) => console.log("Table clicked:", id)} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
