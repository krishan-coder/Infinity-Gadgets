import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "../provider/clientprovider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Infinity Gadgets",
  description: "Best Shop for Computer Accessories",
  icons: {
    icon: [
      { url: '/infinityLogo-v2.png', sizes: '32x32', type: 'image/png' },
      { url: '/infinityLogo-v2.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

function Providers({ children }) {
  return (
    <ClientProvider>
      {children}
    </ClientProvider>
  );
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans  w-full h-screen min-h-screen`}>
        <Providers>
          <Header/>
          <main className="flex-grow w-full">{children}</main>
          <Footer id="contact" />
        </Providers>
        <ToastContainer position="top-right" theme="colored" />
      </body>
    </html>
  );
}

