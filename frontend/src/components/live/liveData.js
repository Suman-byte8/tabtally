export const diners = [
  { name: "Suman", short: "S", label: "Suman (You)", formLabel: "Suman (Host)", you: true },
  { name: "Rahul", short: "R" },
  { name: "Priya", short: "P" },
  { name: "Amit", short: "A" },
  { name: "Rohan", short: "Ro" },
];

export const splitModes = [
  { key: "individual", label: "Individual" },
  { key: "equal", label: "Equal" },
  { key: "custom", label: "Custom" },
  { key: "quantity", label: "By Qty" },
];

export const suggestions = [
  { name: "Lotus Stem Crisps", price: 360 },
  { name: "Tofu Steamed Buns", price: 420 },
  { name: "Burmese Khow Suey", price: 540 },
  { name: "Mushroom Bao", price: 400 },
];

export const initialItems = [
  { id: 1, name: "Burmese Khow Suey", detail: "Signature coconut curry noodles", qty: 2, price: 540, mode: "equal", assigned: ["Suman", "Rahul", "Priya", "Amit"] },
  { id: 2, name: "Lotus Stem Crisps", detail: "Dry roasted chili crunch", qty: 1, price: 360, mode: "equal", assigned: ["Suman", "Rahul", "Priya", "Amit", "Rohan"] },
  { id: 3, name: "Tofu Steamed Buns", note: "Extra chili oil on side", qty: 1, price: 420, mode: "individual", assigned: ["Rohan"] },
  { id: 4, name: "Mock Meat Skewers", detail: "Spiced tamarind glaze", qty: 2, price: 380, mode: "quantity", assigned: ["Rahul", "Amit"] },
  { id: 5, name: "Mushroom Bao", detail: "Truffle oil drizzle", qty: 1, price: 400, mode: "custom", assigned: ["Suman", "Priya"] },
  { id: 6, name: "Jasmine Green Tea Pot", detail: "Hot brew carafes", qty: 2, price: 200, mode: "equal", assigned: ["Suman", "Rahul", "Rohan"] },
];

export function formatCurrency(value) {
  return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}

export function itemTotal(item) {
  return item.price * item.qty;
}

export function shareOf(item, name) {
  return item.assigned.includes(name) ? itemTotal(item) / item.assigned.length : 0;
}
