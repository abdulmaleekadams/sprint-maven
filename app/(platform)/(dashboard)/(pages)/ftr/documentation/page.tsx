import dynamic from "next/dynamic";
const PlateEditor = dynamic(() => import("@/components/editor/editor"), {
  ssr: false,
  loading: () => <div>Loading</div>,
});
const DocumentationPage = () => {
  return (
    <div>
      <PlateEditor />
    </div>
  );
};

export default DocumentationPage;