import "./globals.css";
import { Inter, Marcellus, Playfair_Display } from "next/font/google";
import Navbar from "./components/Navbar";
import PopupLeadForm from "./components/Form";
import Footer from "./components/Footer";
import ScrollAnimations from "./components/ScrollAnimations";
import LeadNotifications from "./components/LeadNotifications";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "optional",
  variable: "--font-playfair",
});
const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "optional",
  variable: "--font-inter",
});
const specialFont = Marcellus({
  subsets: ["latin"],
  weight: "400",
  display: "optional",
  variable: "--font-marcellus",
});

export const metadata = {
  metadataBase: new URL("https://www.dholeranowornever.com"),
  title: "Dholera Investment Event in Gurgaon | Dholera Now or Never ",
  description: "Dholera Now or Never is a Dholera investment event in Gurgaon. Discover the latest developments, investment opportunities and future of India's first planned smart city.",
  keywords: [
    "Dholera Smart City",
    "Dholera SIR",
    "Dholera Investment",
    "Event in Dholera",
    "Dholera Investor Meetup",
    "Dholera Investor Meet Gurgaon",
    "Dholera Now Or Never",
    "Dholera Investment Event Gurgaon",
    "Dholera event in Gurgaon",
    "Investment Events in Gurgaon",
    "Dholera investment event",
    "Dholera investor event",
    "Dholera real estate event",
    "Dholera event 2026",
    "Dholera Smart City Investment",
    "Dholera Event Near Me",
    "Dholera Latest Event",
    "Dholera investment opportunities",
    "Dholera property investment",
    "Dholera seminar in Gurgaon",
    "Dholera Upcoming Investment Events",
    "Dholera investment seminar",
  ],
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased ${headingFont.variable} ${bodyFont.variable} ${specialFont.variable}`}>
      <body className="flex min-h-full flex-col">
        <ScrollAnimations />
        <Navbar />
        {children}
        <Footer />
        <PopupLeadForm />
        <LeadNotifications />
      </body>
    </html>
  );
}
