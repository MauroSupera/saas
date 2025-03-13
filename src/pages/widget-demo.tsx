import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WidgetDemo } from "@/components/widget/widget-demo";

export default function WidgetDemoPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />
      <main className="pt-20">
        <WidgetDemo />
      </main>
      <Footer />
    </div>
  );
}
