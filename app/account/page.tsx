import type { Metadata } from "next";
import AuthPage from "@/components/store/auth-page";

export const metadata: Metadata = {
  title: "Account | Wimbledon Motorbike",
  description: "Login or create an account for Wimbledon Motorbike.",
};

export default function AccountPage() {
  return <AuthPage />;
}
