"use client";

import { ProSidebarProvider } from "react-pro-sidebar";
import cx from "classnames";
import type { Metadata } from "next";

import {
  muktaBold,
  muktaExtraBold,
  muktaExtraLight,
  muktaLight,
  muktaMedium,
  muktaRegular,
  muktaSemiBold
} from "@/app/styles/fonts";

import { Providers } from "@/redux/provider";

import StyledComponentsRegistry from "@/lib/registry";

import "./styles/flexAndGrid.scss";
import "./styles/variables.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/layout.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <Providers>
        <body
          className={cx(
            `${muktaRegular.variable}`,
            `${muktaMedium.variable}`,
            `${muktaBold.variable}`,
            `${muktaSemiBold.variable}`,
            `${muktaExtraBold.variable}`,
            `${muktaExtraLight.variable}`,
            `${muktaLight.variable}`
          )}
        >
          <ProSidebarProvider>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </ProSidebarProvider>
        </body>
      </Providers>
    </html>
  );
}
