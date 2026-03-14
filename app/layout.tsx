import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Streak Tracker — Daily Learning",
  description:
    "Track your daily study streak and build consistent learning habits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#080b12] antialiased">
        {/* Ambient background blobs */}
        <div
          aria-hidden
          className="fixed inset-0 overflow-hidden pointer-events-none z-0"
        >
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-violet-900/20 blur-3xl" />
          <div className="absolute top-[30%] right-[-15%] w-[400px] h-[400px] rounded-full bg-blue-900/20 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[50%] w-[350px] h-[350px] rounded-full bg-indigo-900/15 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 container mx-auto max-w-4xl px-4 py-8">
            {children}
          </main>
          <footer className="relative z-10 border-t border-gray-800/50 py-4 text-center text-xs text-gray-600">
            Daily Learning Streak Tracker — Built with Next.js &amp; Tailwind CSS
          </footer>
        </div>

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1a1f2e",
              color: "#e5e7eb",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: "12px",
              fontSize: "14px",
              fontFamily: "Inter, sans-serif",
            },
            success: {
              iconTheme: { primary: "#6366f1", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#f87171", secondary: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
