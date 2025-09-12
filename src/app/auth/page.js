
import { Suspense } from "react";
import AuthClient from "./AuthClient";

export default function AuthPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthClient />
    </Suspense>
  );
}
