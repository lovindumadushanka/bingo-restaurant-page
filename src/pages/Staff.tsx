import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserPlus, Phone, Mail } from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  status: "active" | "break" | "off";
  ordersToday: number;
}

const staffMembers: StaffMember[] = [
  { id: "1", name: "John Doe", role: "Waiter", phone: "+94 77 123 4567", email: "john@bingo.lk", status: "active", ordersToday: 12 },
  { id: "2", name: "Sarah Smith", role: "Waiter", phone: "+94 77 234 5678", email: "sarah@bingo.lk", status: "active", ordersToday: 8 },
  { id: "3", name: "Mike Johnson", role: "Chef", phone: "+94 77 345 6789", email: "mike@bingo.lk", status: "active", ordersToday: 0 },
  { id: "4", name: "Lisa Chen", role: "Cashier", phone: "+94 77 456 7890", email: "lisa@bingo.lk", status: "break", ordersToday: 0 },
  { id: "5", name: "David Kumar", role: "Waiter", phone: "+94 77 567 8901", email: "david@bingo.lk", status: "off", ordersToday: 0 },
  { id: "6", name: "Priya Fernando", role: "Chef", phone: "+94 77 678 9012", email: "priya@bingo.lk", status: "active", ordersToday: 0 },
];

const getStatusColor = (status: StaffMember["status"]) => {
  switch (status) {
    case "active": return "bg-status-available text-status-available-foreground";
    case "break": return "bg-status-reserved text-status-reserved-foreground";
    case "off": return "bg-muted text-muted-foreground";
  }
};

const Staff = () => {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Staff Management</h1>
            <p className="text-muted-foreground mt-1">Manage your restaurant team</p>
          </div>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Add Staff
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffMembers.map((staff) => (
            <Card key={staff.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {staff.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{staff.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{staff.role}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(staff.status)}>
                    {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{staff.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{staff.email}</span>
                </div>
                {staff.role === "Waiter" && (
                  <div className="pt-2 border-t">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Orders Today:</span>{" "}
                      <span className="font-semibold text-primary">{staff.ordersToday}</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Staff;
