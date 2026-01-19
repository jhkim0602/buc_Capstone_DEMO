"use client";

interface FeatureItem {
  title: string;
  description: string;
}

interface CTPFeaturesProps {
  features: FeatureItem[];
}

export function CTPFeatures({ features }: CTPFeaturesProps) {
  return (
    <section id="features" className="prose prose-stone dark:prose-invert max-w-none">
      <h2>주요 특징</h2>
      <ul>
        {features.map((feature, idx) => (
          <li key={idx}>
            <strong>{feature.title}:</strong> {feature.description}
          </li>
        ))}
      </ul>
    </section>
  );
}
