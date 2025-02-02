import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { ReactNode } from "react";

const ibmPlexSans = localFont({
  src: [
    { path: "./fonts/IBMPlexSans-Regular.ttf", weight: '400', style:'normal'},
    { path: "./fonts/IBMPlexSans-Medium.ttf", weight: '500', style:'normal'},
    { path: "./fonts/IBMPlexSans-Semibold.ttf", weight: '600', style:'normal'},
    { path: "./fonts/IBMPlexSans-Bold.ttf", weight: '700', style:'normal'}
  ]
});

const bebasNeue = localFont({
 src: [
  { path: "/fonts/bebasNeue-Regular.ttf", weight: '400', style:'normal'},
 ],
 variable: '--bebas-neue',
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "Bookwise is a Book borrowing management system",
};

const RootLayout = ({ children }: {children: ReactNode}) => {
  return (
    <html lang="en">
      <body
        className={`${ibmPlexSans.className} ${bebasNeue.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
export default RootLayout