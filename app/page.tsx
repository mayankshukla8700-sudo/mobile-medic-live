import Link from "next/link";
import Image from "next/image";

// The full list of brands from your screenshot
const brands = [
  { name: "Apple", slug: "apple", logo: "/brands/apple.png" },
  { name: "Samsung", slug: "samsung", logo: "/brands/samsung.png" },
  { name: "Xiaomi", slug: "xiaomi", logo: "/brands/xiaomi.png" },
  { name: "Vivo", slug: "vivo", logo: "/brands/vivo.png" },
  { name: "Oppo", slug: "oppo", logo: "/brands/oppo.png" },
  { name: "Realme", slug: "realme", logo: "/brands/realme.png" },
  { name: "OnePlus", slug: "oneplus", logo: "/brands/oneplus.png" },
  { name: "Google", slug: "google", logo: "/brands/google.png" },
  { name: "Poco", slug: "poco", logo: "/brands/poco.png" },
  { name: "iQOO", slug: "iqoo", logo: "/brands/iqoo.png" },
  { name: "Motorola", slug: "motorola", logo: "/brands/motorola.png" },
  { name: "Infinix", slug: "infinix", logo: "/brands/infinix.png" },
  { name: "Honor", slug: "honor", logo: "/brands/honor.png" },
  { name: "Nokia", slug: "nokia", logo: "/brands/nokia.png" },
  { name: "ASUS", slug: "asus", logo: "/brands/asus.png" },
  { name: "Nothing", slug: "nothing", logo: "/brands/nothing.png" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
            Broken Phone? <span className="text-blue-600">We Fix It.</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Select your brand to get an instant price quote.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link 
              key={brand.slug} 
              href={`/repair/${brand.slug}`}
              className="group bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-500/30 transition-all duration-300 flex flex-col items-center justify-center gap-3 aspect-square"
            >
              <div className="relative w-12 h-12 opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                <Image 
                  src={brand.logo} 
                  alt={brand.name} 
                  fill 
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-sm text-slate-700 group-hover:text-blue-600">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}