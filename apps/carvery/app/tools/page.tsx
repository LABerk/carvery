import { PageHeader } from "@/features/kop/ui/page-header";
import { PastelCard, PastelTone } from "@/features/kop/ui/pastel-card";

const tools: Array<{ name: string; desc: string; tone: PastelTone }> = [
  {
    name: "Whittling Knife",
    desc: "The essential all-purpose carving blade. Good for shaping and detail work.",
    tone: "peach",
  },
  {
    name: "Gouge",
    desc: "Curved blade for scooping out material and creating concave surfaces.",
    tone: "lemon",
  },
  {
    name: "V-Tool (Veiner)",
    desc: "Makes clean V-shaped grooves, great for feathers, hair, and lettering.",
    tone: "sky",
  },
  {
    name: "Skew Chisel",
    desc: "Angled edge for cleaning up corners and creating crisp stop cuts.",
    tone: "mint",
  },
  {
    name: "Detail Knife",
    desc: "Shorter, stiffer blade for fine detail and tight areas.",
    tone: "lavender",
  },
];

const ToolsPage = () => {
  return (
    <div className="max-w-2xl">
      <PageHeader
        title="Tools"
        description="A quick reference guide to common whittling tools."
        className="mb-8"
      />
      <div className="flex flex-col gap-4">
        {tools.map((tool) => (
          <PastelCard key={tool.name} tone={tool.tone}>
            <h2 className="font-semibold text-foreground">{tool.name}</h2>
            <p className="text-sm text-subtle mt-1">{tool.desc}</p>
          </PastelCard>
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
