import { path } from "@/constants";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignIn forceRedirectUrl={path.dashboard} />
  );
}