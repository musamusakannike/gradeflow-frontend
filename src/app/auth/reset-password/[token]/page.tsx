import ResetPasswordForm from "./ResetPasswordForm";

interface ResetPasswordProps {
  params: { token: string };
}

export default async function ResetPasswordPage({
  params,
}: ResetPasswordProps) {
  const token = await params.token;
  return <ResetPasswordForm token={token} />;
}
