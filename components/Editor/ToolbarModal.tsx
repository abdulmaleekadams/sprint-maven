"use client";
import { useToolbarModal } from "@/hoooks/use-toolbar-modal";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Dialog, DialogContent } from "../ui/dialog";
import { InsertImageDialog } from "./plugins/ImagesPlugin";

const ToolbarModal = () => {
  const { type, isOpen, onClose } = useToolbarModal();
  const [editor] = useLexicalComposerContext();

  if (!type && isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="h-[75%] flex flex-col px-4 !py-4 border-muted"
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        {type === "imageDialog" && (
          <InsertImageDialog activeEditor={editor} onClose={onClose} />
        )}
      </DialogContent>
      ;
    </Dialog>
  );
};

export default ToolbarModal;
