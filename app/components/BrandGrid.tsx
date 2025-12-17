import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function BrandGrid() {
  // We use an object now to store both the Name and the Logo path
  const brands = [
    { name: "Apple", logo: "/brands/apple.png" },
    { name: "Samsung", logo: "/brands/samsung.png" },
    { name: "OnePlus", logo: "/brands/oneplus.png" },
    { name: "Xiaomi", logo: "/brands/xiaomi.png" },
    { name: "Google", logo: "/brands/google.png" },
    { name: "Oppo", logo: "/brands/oppo.png" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-6 mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
        Select Your Brand
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {brands.map((brand) => (
          <Link key={brand.name} href={`/repair/${brand.name}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-600">
              <CardContent className="flex flex-col items-center justify-center h-32 p-4">
                {/* Brand Logo */}
                <div className="relative w-12 h-12 mb-3">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                
                {/* Brand Name */}
                <span className="text-xl font-semibold text-slate-700">
                  {brand.name}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}