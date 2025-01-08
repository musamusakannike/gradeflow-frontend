import ClassDetailsClient from "./ClassDetailsClient";

export default async function ClassDetails({ params }) {
  const classId = (await params).classId;
  return (
    <div>
      <ClassDetailsClient classId={classId} />
    </div>
  );
}
