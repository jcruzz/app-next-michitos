import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme/ToggleTheme";
import { AlertProvider } from "./context/AlertContext";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={roboto.className}>
          <AlertProvider>
            <main className="h-screen dark:bg-[#0A101D] transition-all duration-200">
              {children}
            </main>
          </AlertProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
