import { path } from "@/constants";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <SignUp forceRedirectUrl={path.dashboard} />
  );
}