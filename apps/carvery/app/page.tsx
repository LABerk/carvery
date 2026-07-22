import { PastelCard, PastelTone } from "@/features/kop/ui/pastel-card";
import { getNotes } from "@/features/notes/persistence/get-notes";
import { NotesSection } from "@/features/notes/ui/notes-section";

export const dynamic = "force-dynamic";

const featureCards: Array<{ title: string; description: string; icon: string; tone: PastelTone }> = [
  {
    title: "Projects",
    description: "Create and manage your 3D whittling projects.",
    icon: "🪵",
    tone: "blush",
  },
  {
    title: "Gallery",
    description: "Browse finished carvings from the community.",
    icon: "🖼️",
    tone: "sky",
  },
  {
    title: "Tools",
    description: "Guides and references for whittling tools.",
    icon: "🔪",
    tone: "mint",
  },
];

const Home = async () => {
  const notes = await getNotes();

  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-bold text-foreground mb-3">Welcome to Carvery</h1>
      <p className="text-subtle text-lg mb-8">
        A place to design, share, and explore 3D whittling projects. Start a new carving or browse the community gallery.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {featureCards.map((card) => (
          <PastelCard key={card.title} tone={card.tone} className="p-6">
            <div className="text-2xl mb-2">{card.icon}</div>
            <h2 className="font-semibold text-foreground mb-1">{card.title}</h2>
            <p className="text-sm text-subtle">{card.description}</p>
          </PastelCard>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-foreground mb-3">Recent Notes</h2>
        <NotesSection initialNotes={notes} />
      </section>
    </div>
  );
};

export default Home;
