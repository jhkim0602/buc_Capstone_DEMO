"use client";

import ReactMarkdown from "react-markdown";

interface FeatureItem {
  title: string;
  description: string;
}

interface CTPFeaturesProps {
  features: FeatureItem[];
}

export function CTPFeatures({ features }: CTPFeaturesProps) {
  return (
    <section id="features" data-toc="main" data-toc-level="1" className="prose prose-stone dark:prose-invert max-w-none">
      <h2>주요 특징</h2>
      <ul>
        {features.map((feature, idx) => (
          <li key={idx}>
            <div className="inline-block">
              <strong>{feature.title}: </strong>
              <span className="text-muted-foreground inline-block align-top">
                <ReactMarkdown components={{ p: ({ children }) => <span className="inline">{children}</span> }}>
                  {feature.description}
                </ReactMarkdown>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
