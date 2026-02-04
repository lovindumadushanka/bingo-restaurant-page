import { Clock, Eye, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

type OrderStatus = "pending" | "preparing" | "ready" | "urgent";

interface OrderCardProps {
  orderId: string;
  tableNumber: number;
  items: number;
  status: OrderStatus;
  time: string;
  onView?: () => void;
  onBill?: () => void;
}

export const OrderCard = ({
  orderId,
  tableNumber,
  items,
  status,
  time,
  onView,
  onBill,
}: OrderCardProps) => {
  const statusStyles: Record<OrderStatus, string> = {
    pending: "bg-status-pending text-warning-foreground",
    preparing: "bg-status-preparing text-info-foreground",
    ready: "bg-status-ready text-success-foreground",
    urgent: "bg-status-urgent text-destructive-foreground animate-pulse-soft",
  };

  const statusLabels: Record<OrderStatus, string> = {
    pending: "Pending",
    preparing: "In Kitchen",
    ready: "Ready",
    urgent: "Urgent",
  };

  return (
    <div className="order-card animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-lg font-bold">{orderId}</p>
          <p className="text-muted-foreground">Table {tableNumber}</p>
        </div>
        <span className={`status-badge ${statusStyles[status]}`}>
          {statusLabels[status]}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {time}
        </span>
        <span>{items} items</span>
      </div>

      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={onView}
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </Button>
        <Button 
          size="sm" 
          className="flex-1"
          onClick={onBill}
        >
          <Receipt className="w-4 h-4 mr-1" />
          Bill
        </Button>
      </div>
    </div>
  );
};
