import { Manrope } from "next/font/google";
import "./globals.css";
import AppProvider from "@/context/Appcontext";

const inter = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Home Aura",
  description: "AI-powered home design tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}