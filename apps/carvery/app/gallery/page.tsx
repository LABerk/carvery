export default function GalleryPage() {
    // REAL STUFF HERE ONE DAY?
  const pieces = [
    { name: "River Otter",      author: "Sam K.",   wood: "Willow",    colour: "bg-sky" },
    { name: "Acorn Cap Bowl",   author: "Priya M.", wood: "Cherry",    colour: "bg-peach" },
    { name: "Celtic Knot Disc", author: "Tom B.",   wood: "Oak",       colour: "bg-lavender" },
    { name: "Hare in Flight",   author: "Lena W.",  wood: "Basswood",  colour: "bg-mint" },
    { name: "Spiral Wren",      author: "Dan O.",   wood: "Birch",     colour: "bg-lemon" },
    { name: "Faceted Sphere",   author: "Sam K.",   wood: "Mahogany",  colour: "bg-blush" },
  ];

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground mb-2">Gallery</h1>
      <p className="text-subtle mb-8">Finished carvings from the community.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {pieces.map((p) => (
          <div key={p.name} className={`rounded-2xl ${p.colour} px-6 py-5`}>
            <h2 className="font-semibold text-foreground">{p.name}</h2>
            <p className="text-sm text-subtle mt-1">{p.wood} · by {p.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
