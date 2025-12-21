import { MousePointerClick, Truck, Wrench, CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <MousePointerClick className="w-8 h-8 text-blue-600" />,
      title: "1. Book Online",
      desc: "Select your mobile model and book a pickup in 2 minutes."
    },
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      title: "2. Free Pickup",
      desc: "Our executive picks up your device from your home or office."
    },
    {
      icon: <Wrench className="w-8 h-8 text-blue-600" />,
      title: "3. Expert Repair",
      desc: "We fix it in our certified lab using high-quality parts."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      title: "4. Fast Delivery",
      desc: "We deliver your fixed phone back to you the same day!"
    }
  ];

  return (
    <section className="w-full py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            How It Works
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Simple, transparent, and hassle-free. We handle everything.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-slate-100 -z-10" />

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-4 bg-white p-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                {step.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[200px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}