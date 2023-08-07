// import './globals.css'
import type { Metadata } from "next";

import { Providers } from "@/redux/provider";

import StyledComponentsRegistry from "@/lib/registry";

import "./styles/flexAndGrid.scss";
import "./styles/variables.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/layout.css";

// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <Providers>
        <body>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </Providers>
    </html>
  );
}
