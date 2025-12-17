import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function BrandGrid() {
  // Full list of brands matching your 'brands' folder
  const brands = [
    { name: "Apple", logo: "/brands/apple.png" },
    { name: "Samsung", logo: "/brands/samsung.png" },
    { name: "OnePlus", logo: "/brands/oneplus.png" },
    { name: "Xiaomi", logo: "/brands/xiaomi.png" },
    { name: "Google", logo: "/brands/google.png" },
    { name: "Oppo", logo: "/brands/oppo.png" },
    { name: "Vivo", logo: "/brands/vivo.png" },
    { name: "Realme", logo: "/brands/realme.png" },
    { name: "Motorola", logo: "/brands/motorola.png" },
    { name: "Nokia", logo: "/brands/nokia.png" },
    { name: "Asus", logo: "/brands/asus.png" },
    { name: "Poco", logo: "/brands/poco.png" },
    { name: "iQOO", logo: "/brands/iqoo.png" },
    { name: "Honor", logo: "/brands/honor.png" },
    { name: "Infinix", logo: "/brands/infinix.png" },
    { name: "Nothing", logo: "/brands/nothing.png" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-6 mt-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
        Select Your Brand
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {brands.map((brand) => (
          <Link key={brand.name} href={`/repair/${brand.name}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-600 group">
              {/* Removed fixed h-32, used padding for spacing */}
              <CardContent className="flex flex-col items-center justify-center p-6">
                {/* Brand Logo Container - Increased size to w-20 h-20 */}
                <div className="relative w-20 h-20 mb-4 group-hover:scale-110 transition-transform">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                
                {/* Brand Name */}
                <span className="text-lg font-semibold text-slate-700">
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