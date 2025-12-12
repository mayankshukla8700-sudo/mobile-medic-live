import { Button } from "../../components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      {/* Left Side: Logo */}
      <div className="text-2xl font-bold text-blue-900">
        THE MOBILE MEDIC
      </div>

      {/* Right Side: Buttons */}
      <div className="flex gap-4">
        <Button variant="ghost">Track Order</Button>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Book Repair
        </Button>
      </div>
    </nav>
  );
}