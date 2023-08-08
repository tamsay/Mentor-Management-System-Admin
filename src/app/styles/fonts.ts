import { Mukta } from "next/font/google";

const muktaBold = Mukta({
  weight: "700",
  subsets: ["latin"],
  variable: "--muktaBold"
});

const muktaRegular = Mukta({
  weight: "400",
  subsets: ["latin"],
  variable: "--muktaRegular"
});

const muktaMedium = Mukta({
  weight: "500",
  subsets: ["latin"],
  variable: "--muktaMedium"
});

const muktaSemiBold = Mukta({
  weight: "600",
  subsets: ["latin"],
  variable: "--muktaSemiBold"
});

const muktaExtraBold = Mukta({
  weight: "800",
  subsets: ["latin"],
  variable: "--muktaExtraBold"
});

const muktaLight = Mukta({
  weight: "300",
  subsets: ["latin"],
  variable: "--muktaLight"
});

const muktaExtraLight = Mukta({
  weight: "200",
  subsets: ["latin"],
  variable: "--muktaExtraLight"
});

export { muktaBold, muktaRegular, muktaMedium, muktaSemiBold, muktaExtraBold, muktaLight, muktaExtraLight };
