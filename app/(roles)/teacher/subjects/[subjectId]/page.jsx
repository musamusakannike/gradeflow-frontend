import SubjectDetailsClient from "./SubjectDetailsClient";

export default async function SubjectDetailsPage({ params }) {
    const subjectId = (await params).subjectId;
  
    return (
      <div>
        <SubjectDetailsClient subjectId={subjectId} />
      </div>
    );
  }
  