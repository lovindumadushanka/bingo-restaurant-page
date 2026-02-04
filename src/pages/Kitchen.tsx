import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { RefreshCw, Clock, AlertTriangle, ChefHat, CheckCircle } from "lucide-react";
import { toast } from "sonner";

type OrderStatus = "pending" | "preparing" | "ready";

interface KitchenOrder {
  id: string;
  tableNumber: number;
  items: {
    name: string;
    quantity: number;
    note?: string;
  }[];
  status: OrderStatus;
  timeAgo: string;
  isUrgent: boolean;
  kitchenNote?: string;
}

const kitchenOrders: KitchenOrder[] = [
  {
    id: "#1245",
    tableNumber: 5,
    items: [
      { name: "Chicken Biryani", quantity: 2, note: "Extra spicy" },
      { name: "Fish Curry", quantity: 1, note: "No onions" },
    ],
    status: "pending",
    timeAgo: "15 mins ago",
    isUrgent: true,
    kitchenNote: "Serve all together",
  },
  {
    id: "#1246",
    tableNumber: 12,
    items: [
      { name: "Kottu Roti", quantity: 3 },
      { name: "Fried Rice", quantity: 2 },
    ],
    status: "preparing",
    timeAgo: "8 mins ago",
    isUrgent: false,
  },
  {
    id: "#1247",
    tableNumber: 3,
    items: [
      { name: "Spring Rolls", quantity: 4 },
      { name: "Lime Juice", quantity: 4 },
    ],
    status: "pending",
    timeAgo: "5 mins ago",
    isUrgent: false,
  },
  {
    id: "#1248",
    tableNumber: 8,
    items: [
      { name: "Prawns Devilled", quantity: 1 },
      { name: "Vegetable Fried Rice", quantity: 2 },
      { name: "King Coconut", quantity: 3 },
    ],
    status: "ready",
    timeAgo: "20 mins ago",
    isUrgent: false,
  },
];

const Kitchen = () => {
  const handleMarkProgress = (orderId: string) => {
    toast.success(`Order ${orderId} marked as in progress`);
  };

  const handleMarkReady = (orderId: string) => {
    toast.success(`Order ${orderId} marked as ready!`);
  };

  const statusColors: Record<OrderStatus, string> = {
    pending: "border-l-status-pending",
    preparing: "border-l-status-preparing",
    ready: "border-l-status-ready",
  };

  const statusBadges: Record<OrderStatus, { bg: string; text: string; label: string }> = {
    pending: { bg: "bg-status-pending", text: "text-warning-foreground", label: "PENDING" },
    preparing: { bg: "bg-status-preparing", text: "text-info-foreground", label: "IN PROGRESS" },
    ready: { bg: "bg-status-ready", text: "text-success-foreground", label: "READY" },
  };

  const pendingOrders = kitchenOrders.filter((o) => o.status === "pending");
  const preparingOrders = kitchenOrders.filter((o) => o.status === "preparing");
  const readyOrders = kitchenOrders.filter((o) => o.status === "ready");

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <ChefHat className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Kitchen Display</h1>
              <p className="text-muted-foreground">Last Updated: 2:45 PM</p>
            </div>
          </div>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-warning">{pendingOrders.length}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
          <div className="bg-info/10 border border-info/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-info">{preparingOrders.length}</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="bg-success/10 border border-success/20 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-success">{readyOrders.length}</p>
            <p className="text-sm text-muted-foreground">Ready</p>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kitchenOrders.map((order) => (
            <div
              key={order.id}
              className={`bg-card rounded-xl border border-l-4 ${statusColors[order.status]} shadow-sm overflow-hidden animate-fade-in`}
            >
              {/* Order Header */}
              <div className="p-4 border-b flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{order.id}</h3>
                    {order.isUrgent && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-destructive text-destructive-foreground rounded-full text-xs font-bold animate-pulse-soft">
                        <AlertTriangle className="w-3 h-3" />
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground">Table {order.tableNumber}</p>
                </div>
                <div className="text-right">
                  <span className={`status-badge ${statusBadges[order.status].bg} ${statusBadges[order.status].text}`}>
                    {statusBadges[order.status].label}
                  </span>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center justify-end gap-1">
                    <Clock className="w-3 h-3" />
                    {order.timeAgo}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4">
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">
                          {item.quantity}x {item.name}
                        </p>
                        {item.note && (
                          <p className="text-sm text-primary">({item.note})</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {order.kitchenNote && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">
                      📝 {order.kitchenNote}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-4 pt-0 flex gap-2">
                {order.status === "pending" && (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleMarkProgress(order.id)}
                    >
                      Start Preparing
                    </Button>
                    <Button className="flex-1" onClick={() => handleMarkReady(order.id)}>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Ready
                    </Button>
                  </>
                )}
                {order.status === "preparing" && (
                  <Button className="w-full" onClick={() => handleMarkReady(order.id)}>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Mark Ready
                  </Button>
                )}
                {order.status === "ready" && (
                  <Button variant="secondary" className="w-full" disabled>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Waiting for Pickup
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Kitchen;
