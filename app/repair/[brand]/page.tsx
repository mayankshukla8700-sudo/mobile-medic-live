import Navbar from "../../components/Navbar";
import RepairForm from "../../components/RepairForm";

export default async function ModelPage({ 
  params 
}: { 
  params: Promise<{ brand: string }> 
}) {
  const resolvedParams = await params;
  const brandName = decodeURIComponent(resolvedParams.brand);

  const models = [
    "Model X", "Model Y", "Pro Max", "Ultra 5G", "Lite Version"
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Select Your {brandName} Model
        </h1>
        <p className="text-slate-600 mb-8">
          We repair all major {brandName} devices.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model) => (
            <div key={model} className="bg-white p-6 rounded-lg shadow-sm border flex flex-col justify-between">
              <span className="font-medium text-slate-700 text-lg mb-2">
                {brandName} {model}
              </span>
              
              {/* This is the new "Book Repair" drawer */}
              <RepairForm selectedBrand={brandName} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}