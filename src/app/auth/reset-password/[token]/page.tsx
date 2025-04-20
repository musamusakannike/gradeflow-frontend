import ResetPasswordForm from "./ResetPasswordForm";

interface ResetPasswordProps {
  params: { token: string };
}

export default function ResetPasswordPage({ params }: ResetPasswordProps) {
  return <ResetPasswordForm token={params.token} />;
}
