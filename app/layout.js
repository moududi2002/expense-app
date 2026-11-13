import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Expense Tracker",
  description: "Daily bazar khoroch management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="max-w-7xl mx-auto p-4 md:p-6">{children}</main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}