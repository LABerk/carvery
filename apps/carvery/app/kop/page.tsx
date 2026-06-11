import { KopShowcase } from "@/features/kop/ui/kop-showcase";
import { readCustomColors } from "@/features/kop/persistence/custom-colors-repository";

const KopPage = async () => {
  const customColors = await readCustomColors();
  const isEditable = process.env.NODE_ENV === "development";

  return <KopShowcase customColors={customColors} isEditable={isEditable} />;
};

export default KopPage;
