import { Poppins } from "next/font/google";
import "./styles/globals.css";
import { Toaster } from "react-hot-toast";
import "animate.css"

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "GradeFlow",
  description: "A School Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
