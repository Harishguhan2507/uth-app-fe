import AIFeatureCard from "../components/AIFeatureCard";

const aiFeatures = [
  {
    title: "Skill gap autopilot",
    rating: "⭐⭐⭐⭐⭐",
    description:
      "AI analyses the gap between what your project needs and what your entire organisation currently has. It then automatically suggests: hire externally for X, upskill person Y for Z, or restructure the team to cover the gap.",
    tags: [
      "Gap analysis AI",
      "Org-wide skill graph",
      "Auto-recommendation",
      "No company does this internally",
    ],
    demo: 'PM types "I need a team to build a real-time ML pipeline". AI replies: "You have 3 Python engineers but zero Kafka expertise in the org. I recommend: Upskill Meenakshi (she has Spark background, 80% there) + hire 1 Kafka specialist externally."',
  },
  {
    title: "Team chemistry score",
    rating: "⭐⭐⭐⭐½",
    description:
      "AI analyses past project history, who has worked together before, communication patterns, and skill overlap/complementarity to give a team chemistry prediction score.",
    tags: [
      "Graph relationships",
      "Collaboration history",
      "Complementarity analysis",
      "Bottleneck prediction",
    ],
    demo: 'PM selects 3 people. AI says: "Team chemistry score: 78/100. Risk: Jebaraj and Aneesh both lead — no clear follower. Suggest replacing Aneesh with Santhia who has worked well with Jebaraj on 2 past projects."',
  },
  {
    title: "Talent spotlight",
    rating: "⭐⭐⭐⭐",
    description:
      "AI proactively notifies project managers about people they have never considered, based on emerging skill signals.",
    tags: [
      "Push notifications",
      "Emerging skill detection",
      "Cross-department discovery",
      "Hidden talent surfacing",
    ],
    demo: 'PM gets a weekly AI digest: "3 people in your org developed skills relevant to your upcoming Q3 AI project — none of them are in Engineering. Click to see who."',
  },
  {
    title: "Availability forecasting",
    rating: "⭐⭐⭐⭐",
    description:
      "AI predicts when team members will become available based on current project timelines and workload patterns.",
    tags: ["Timeline prediction", "Workload analysis", "Smart scheduling"],
    demo: '"Meenakshi K. will be 80% free in 3 weeks when Project Alpha wraps. Start your request now to secure her availability."',
  },
];

function AIFeatures() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">AI Features</h1>
      <p className="text-sm text-slate-600">
        Intelligence layer powering CollabX.
      </p>
      <div className="space-y-4">
        {aiFeatures.map((feature) => (
          <AIFeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
}

export default AIFeatures;
