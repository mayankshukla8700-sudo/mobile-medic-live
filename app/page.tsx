import Navbar from "./components/Navbar";
import BrandGrid from "./components/BrandGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="flex flex-col items-center pt-20 pb-10">
        <h1 className="text-5xl font-bold text-slate-900 mb-6 text-center">
          Broken Phone? We Fix It.
        </h1>
        <p className="text-xl text-slate-600 mb-8 text-center">
          Doorstep repair in 60 minutes.
        </p>
        
        {/* Insert the Brand Grid here */}
        <BrandGrid />
      </div>
    </main>
  );
}