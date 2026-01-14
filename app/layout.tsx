import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata = {
  title: 'Argo Vivi | Long Distance Memories',
  description: 'Brief website to cherish the long-distance relationship between Argo in Bogor and Vivi in Brisbane.',
  icons: {
    icon: '/photos/291ec3d5-be69-4e1b-8575-754a1545dc3e.ico',           // icon utama
    shortcut: '/photos/291ec3d5-be69-4e1b-8575-754a1545dc3e.png', // optional
    apple: '/photos/291ec3d5-be69-4e1b-8575-754a1545dc3e.png',    // untuk iOS
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="max-w-5xl mx-auto px-6 py-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
