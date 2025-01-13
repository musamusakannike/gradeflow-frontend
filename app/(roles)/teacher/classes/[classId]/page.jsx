import PageClient from "./PageClient";

export default async function Page({ params }) {
  const { classId } = params;
  return (
    <div>
      <PageClient classId={classId} />
    </div>
  );
}
