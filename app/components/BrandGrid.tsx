import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function BrandGrid() {
  const brands = [
    "Apple", "Samsung", "OnePlus", "Xiaomi", "Google", "Oppo"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-6 mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
        Select Your Brand
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {brands.map((brand) => (
          <Link key={brand} href={`/repair/${brand}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-600">
              <CardContent className="flex items-center justify-center h-24">
                <span className="text-xl font-semibold text-slate-700">
                  {brand}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}