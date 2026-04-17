export default function ToolsPage() {
  const tools = [
    { name: "Whittling Knife",   desc: "The essential all-purpose carving blade. Good for shaping and detail work.", colour: "bg-peach" },
    { name: "Gouge",             desc: "Curved blade for scooping out material and creating concave surfaces.",      colour: "bg-lemon" },
    { name: "V-Tool (Veiner)",   desc: "Makes clean V-shaped grooves, great for feathers, hair, and lettering.",    colour: "bg-sky" },
    { name: "Skew Chisel",       desc: "Angled edge for cleaning up corners and creating crisp stop cuts.",          colour: "bg-mint" },
    { name: "Detail Knife",      desc: "Shorter, stiffer blade for fine detail and tight areas.",                    colour: "bg-lavender" },
  ];

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-foreground mb-2">Tools</h1>
      <p className="text-subtle mb-8">A quick reference guide to common whittling tools.</p>
      <div className="flex flex-col gap-4">
        {tools.map((t) => (
          <div key={t.name} className={`rounded-2xl ${t.colour} px-6 py-5`}>
            <h2 className="font-semibold text-foreground">{t.name}</h2>
            <p className="text-sm text-subtle mt-1">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
