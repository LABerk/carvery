export default function Home() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-4xl font-bold text-foreground mb-3">Welcome to Carvery</h1>
      <p className="text-subtle text-lg mb-8">
        A place to design, share, and explore 3D whittling projects. Start a new carving or browse the community gallery.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-blush p-6">
          <div className="text-2xl mb-2">🪵</div>
          <h2 className="font-semibold text-foreground mb-1">Projects</h2>
          <p className="text-sm text-subtle">Create and manage your 3D whittling projects.</p>
        </div>
        <div className="rounded-2xl bg-sky p-6">
          <div className="text-2xl mb-2">🖼️</div>
          <h2 className="font-semibold text-foreground mb-1">Gallery</h2>
          <p className="text-sm text-subtle">Browse finished carvings from the community.</p>
        </div>
        <div className="rounded-2xl bg-mint p-6">
          <div className="text-2xl mb-2">🔪</div>
          <h2 className="font-semibold text-foreground mb-1">Tools</h2>
          <p className="text-sm text-subtle">Guides and references for whittling tools.</p>
        </div>
      </div>
    </div>
  );
}
