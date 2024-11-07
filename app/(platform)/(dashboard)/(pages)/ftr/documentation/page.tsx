import { Editor } from "@/components/plate-ui/editor";
// const PlateEditor = dynamic(() => import("@/components/plate-ui/editor"), {
//   ssr: false,
//   loading: () => <div>Loading</div>,
// });
const DocumentationPage = () => {
  // console.log();

  return (
    <div>
      <Editor />
    </div>
  );
};

export default DocumentationPage;
