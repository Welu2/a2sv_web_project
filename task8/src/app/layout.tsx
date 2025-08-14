import "./globals.css";
import { ReactNode } from "react";
import CustomSessionProvider from "./providers/session-provider"; // ✅ Use the wrapper

export const metadata = {
  title: "Your App",
  description: "Authentication with NextAuth",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CustomSessionProvider>{children}</CustomSessionProvider>
      </body>
    </html>
  );
}
