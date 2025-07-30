type Props = {
  opportunity: {
    id: string;
    title: string;
    description: string;
    organization: string;
    location: string;
    deadline: string;
  };
};

export default function OpportunityCard({ opportunity }: Props) {
  return (
    <div className="card">
      <h2>{opportunity.title}</h2>
      <p>{opportunity.description}</p>
      <p>
        <strong>Organization:</strong> {opportunity.organization}
      </p>
      <p>
        <strong>Location:</strong> {opportunity.location}
      </p>
      <p>
        <strong>Deadline:</strong>{" "}
        {new Date(opportunity.deadline).toLocaleDateString()}
      </p>
    </div>
  );
}
