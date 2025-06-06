import '../styles/futurecard.css';

export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="card">
      <img src={icon} alt={title} />
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}