import "./globals.css";
import Navbar from "./components/Navbar";
import PopupLeadForm from "./components/Form";
import Footer from "./components/Footer";
import ScrollAnimations from "./components/ScrollAnimations";

export const metadata = {
  title: "Dholera Investment Event in Gurgaon | Dholera Now or Never ",
  description: "Dholera Now or Never is a Dholera investment event in Gurgaon. Discover the latest developments, investment opportunities and future of India's first planned smart city.",
  keywords:"Dholera event in Gurgaon, Investment Events in Gurgaon, Dholera investment event, Dholera investor event, Dholera real estate event, Dholera event 2026, Dholera Smart City Investment, Dholera Event Near Me, Dholera Latest Event, Dholera investment opportunities, Dholera Smart City investment, Dholera property investment, Dholera seminar in Gurgaon, Dholera Latest Event, Dhoera Upcoming Investment Events, Dholera investment seminar,"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <ScrollAnimations />
        <Navbar />
        {children}
        <Footer />
        <PopupLeadForm />
      </body>
    </html>
  );
}
