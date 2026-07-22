import { PageHeader } from "@/features/kop/ui/page-header";
import { PastelCard, PastelTone } from "@/features/kop/ui/pastel-card";

const pieces: Array<{ name: string; author: string; wood: string; tone: PastelTone }> = [
  { name: "River Otter", author: "Sam K.", wood: "Willow", tone: "sky" },
  { name: "Acorn Cap Bowl", author: "Priya M.", wood: "Cherry", tone: "peach" },
  { name: "Celtic Knot Disc", author: "Tom B.", wood: "Oak", tone: "lavender" },
  { name: "Hare in Flight", author: "Lena W.", wood: "Basswood", tone: "mint" },
  { name: "Spiral Wren", author: "Dan O.", wood: "Birch", tone: "lemon" },
  { name: "Faceted Sphere", author: "Sam K.", wood: "Mahogany", tone: "blush" },
];

const GalleryPage = () => {
  return (
    <div className="max-w-3xl">
      <PageHeader title="Gallery" description="Finished carvings from the community." className="mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pieces.map((piece) => (
          <PastelCard key={piece.name} tone={piece.tone}>
            <h2 className="font-semibold text-foreground">{piece.name}</h2>
            <p className="text-sm text-subtle mt-1">
              {piece.wood} · by {piece.author}
            </p>
          </PastelCard>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
