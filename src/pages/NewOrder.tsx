import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Minus, X, ChefHat, Save, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Category = "appetizers" | "main" | "desserts" | "drinks";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: Category;
  prepTime: string;
  image: string;
}

interface OrderItem extends MenuItem {
  quantity: number;
  note?: string;
}

const menuItems: MenuItem[] = [
  { id: "1", name: "Spring Rolls", price: 350, category: "appetizers", prepTime: "10 mins", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=150&fit=crop" },
  { id: "2", name: "Chicken Soup", price: 400, category: "appetizers", prepTime: "15 mins", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=150&fit=crop" },
  { id: "3", name: "Fish Cutlets", price: 450, category: "appetizers", prepTime: "12 mins", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=150&fit=crop" },
  { id: "4", name: "Chicken Biryani", price: 850, category: "main", prepTime: "25 mins", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=150&fit=crop" },
  { id: "5", name: "Fish Curry", price: 650, category: "main", prepTime: "20 mins", image: "https://images.unsplash.com/photo-1626776877260-5765ca4c3489?w=200&h=150&fit=crop" },
  { id: "6", name: "Vegetable Fried Rice", price: 450, category: "main", prepTime: "15 mins", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=150&fit=crop" },
  { id: "7", name: "Kottu Roti", price: 550, category: "main", prepTime: "18 mins", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=150&fit=crop" },
  { id: "8", name: "Prawns Devilled", price: 950, category: "main", prepTime: "22 mins", image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=200&h=150&fit=crop" },
  { id: "9", name: "Watalappan", price: 250, category: "desserts", prepTime: "5 mins", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=150&fit=crop" },
  { id: "10", name: "Ice Cream", price: 200, category: "desserts", prepTime: "3 mins", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=200&h=150&fit=crop" },
  { id: "11", name: "Fruit Salad", price: 300, category: "desserts", prepTime: "5 mins", image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=200&h=150&fit=crop" },
  { id: "12", name: "Lime Juice", price: 150, category: "drinks", prepTime: "3 mins", image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=200&h=150&fit=crop" },
  { id: "13", name: "King Coconut", price: 180, category: "drinks", prepTime: "2 mins", image: "https://images.unsplash.com/photo-1544252890-c81c86ae4283?w=200&h=150&fit=crop" },
  { id: "14", name: "Fresh Mango Juice", price: 220, category: "drinks", prepTime: "5 mins", image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=200&h=150&fit=crop" },
];

const NewOrder = () => {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<Category>("main");
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [itemNotes, setItemNotes] = useState<Record<string, string>>({});

  const categories: { key: Category; label: string }[] = [
    { key: "appetizers", label: "Appetizers" },
    { key: "main", label: "Main Course" },
    { key: "desserts", label: "Desserts" },
    { key: "drinks", label: "Drinks" },
  ];

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);

  const addItem = (item: MenuItem) => {
    const existingIndex = orderItems.findIndex((oi) => oi.id === item.id);
    if (existingIndex >= 0) {
      const updated = [...orderItems];
      updated[existingIndex].quantity += 1;
      setOrderItems(updated);
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId: string, delta: number) => {
    const updated = orderItems.map((item) => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter((item) => item.quantity > 0);
    setOrderItems(updated);
  };

  const removeItem = (itemId: string) => {
    setOrderItems(orderItems.filter((item) => item.id !== itemId));
    const notes = { ...itemNotes };
    delete notes[itemId];
    setItemNotes(notes);
  };

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSendToKitchen = () => {
    if (!selectedTable) {
      toast.error("Please select a table first");
      return;
    }
    if (orderItems.length === 0) {
      toast.error("Please add items to the order");
      return;
    }
    toast.success("Order sent to kitchen!");
    navigate("/kitchen");
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Create New Order</h1>
            <p className="text-muted-foreground mt-1">Select items and add to order</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            {/* Table Selection */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Table Number</label>
              <Select value={selectedTable} onValueChange={setSelectedTable}>
                <SelectTrigger className="w-full md:w-64 h-12">
                  <SelectValue placeholder="Select Table" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((table) => (
                    <SelectItem key={table} value={table.toString()}>
                      Table {table}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`menu-category-tab ${
                    activeCategory === cat.key
                      ? "menu-category-active"
                      : "menu-category-inactive"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border rounded-xl overflow-hidden flex hover:shadow-md transition-shadow animate-fade-in"
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-24 h-24 object-cover flex-shrink-0"
                  />
                  <div className="flex-1 p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-primary font-bold">LKR {item.price.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{item.prepTime}</p>
                    </div>
                    <Button size="sm" onClick={() => addItem(item)}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border rounded-xl p-6 sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Order Summary</h2>
                {selectedTable && (
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    Table {selectedTable}
                  </span>
                )}
              </div>

              {orderItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ChefHat className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No items added yet</p>
                  <p className="text-sm">Select items from the menu</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {orderItems.map((item) => (
                      <div key={item.id} className="border-b pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-primary font-semibold">
                              LKR {(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2 bg-muted rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-2 hover:bg-muted-foreground/10 rounded-l-lg transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-2 hover:bg-muted-foreground/10 rounded-r-lg transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <Input
                          placeholder="Add note (e.g., Extra spicy)"
                          className="mt-2 text-sm h-9"
                          value={itemNotes[item.id] || ""}
                          onChange={(e) => setItemNotes({ ...itemNotes, [item.id]: e.target.value })}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Subtotal</span>
                      <span className="text-primary">LKR {subtotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button variant="outline" className="w-full" onClick={() => setOrderItems([])}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button variant="secondary" className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button className="w-full" onClick={handleSendToKitchen}>
                      <Send className="w-4 h-4 mr-2" />
                      Send to Kitchen
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewOrder;
