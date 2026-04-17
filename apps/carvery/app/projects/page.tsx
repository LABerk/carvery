export default function ProjectsPage() {
  const projects = [
    { name: "Woodland Fox",    wood: "Basswood",   status: "In Progress", colour: "bg-peach" },
    { name: "Geometric Bear",  wood: "Butternut",  status: "Complete",    colour: "bg-lemon" },
    { name: "Twisted Staff",   wood: "Applewood",  status: "Planned",     colour: "bg-lavender" },
  ];

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects</h1>
          <p className="text-subtle mt-1">Your 3D whittling projects.</p>
        </div>
        <button className="rounded-lg bg-accent text-accent-fg text-sm font-medium px-4 py-2 hover:opacity-90 transition-opacity">
          + New Project
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {projects.map((p) => (
          <div key={p.name} className={`rounded-2xl ${p.colour} px-6 py-5 flex items-center justify-between`}>
            <div>
              <h2 className="font-semibold text-foreground">{p.name}</h2>
              <p className="text-sm text-subtle mt-0.5">{p.wood}</p>
            </div>
            <span className="text-xs font-medium bg-surface/60 text-foreground rounded-full px-3 py-1">
              {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
