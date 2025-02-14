import type { AppProps } from "next/app";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Nav from "../components/Navigation/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased px-5 md:px-10 lg:px-20`}
    >
      <Nav />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
