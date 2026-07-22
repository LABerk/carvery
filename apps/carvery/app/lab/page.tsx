import { PageHeader } from "@/features/kop/ui/page-header";
import { CarvingViewer } from "@/features/carving/ui/carving-viewer";

const LabPage = () => {
  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Lab"
        description="Sandbox for the 3D carving viewer. Drag to orbit, scroll to zoom."
      />
      <CarvingViewer />
    </div>
  );
};

export default LabPage;
