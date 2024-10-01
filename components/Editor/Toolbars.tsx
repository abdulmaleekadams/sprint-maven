import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  $getSelection,
  $isRangeSelection,
  CAN_UNDO_COMMAND,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { Icons } from "../icons";
import { Button } from "../ui/button";
// import {
//   $getSelection,
//   $isRangeSelection,
//   CAN_REDO_COMMAND,
//   CAN_UNDO_COMMAND,
//   FORMAT_TEXT_COMMAND,
//   UNDO_COMMAND,
// } from "lexical";
import { useToolbarModal } from "@/hoooks/use-toolbar-modal";
import { cn } from "@/lib/utils";
import { mergeRegister } from "@lexical/utils";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ToolbarModal from "./ToolbarModal";

const Toolbars = () => {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
    }
  }, []);

  const handleSave = useDebouncedCallback((content) => {
    console.log(content);
  }, 500);

  const { onOpen } = useToolbarModal();

  useEffect(() => {
    mergeRegister(
      editor.registerUpdateListener(
        ({ editorState, dirtyElements, dirtyLeaves }) => {
          editorState.read(() => {
            $updateToolbar();
          });
          if (dirtyElements.size === 0 && dirtyLeaves.size === 0) {
            return;
          }
          handleSave(JSON.stringify(editorState));
        }
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        1
      )
    );
  }, [editor, $updateToolbar]);

  const handleHeading = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        // Update text format
        $setBlocksType(selection, () => $createHeadingNode("h1"));
      }
    });
  };

  return (
    <div className="flex">
      <div className="space-x-2">
        <Button
          size="icon"
          variant="ghost"
          className={cn("h-auto w-auto p-1", isBold && "bg-accent")}
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
          }}
        >
          <Icons.bold className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-auto w-auto p-1"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
          }}
        >
          <Icons.italic className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-auto w-auto p-1"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
          }}
        >
          <Icons.underline className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-auto w-auto p-1"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
          }}
        >
          <Icons.strikethrough className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-auto w-auto p-1"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
          }}
        >
          <Icons.code className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-auto w-auto p-1"
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
          }}
        >
          <Icons.highlight className="w-5 h-5" />
        </Button>
      </div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              size="icon"
              variant="ghost"
              className="h-auto w-auto p-1"
              onClick={() => {
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight");
              }}
            >
              <Icons.add className="w-5 h-5" />
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col">
            <Button variant="ghost" className="w-full justify-start">
              <Icons.hr className="w-5 h-5 mr-1" />
              Horizontal Rule
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icons.page className="w-5 h-5 mr-1" />
              Page Break
            </Button>
            <Button
              variant="ghost"
              onClick={() => onOpen("imageDialog")}
              className="w-full justify-start"
            >
              <Icons.image className="w-5 h-5 mr-1" />
              Image
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icons.arrowDown className="w-5 h-5 mr-1" />
              Collapsible container
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icons.table className="w-5 h-5 mr-1" />
              Table
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icons.column className="w-5 h-5 mr-1" />
              Columns Layout
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icons.arrowRight className="w-5 h-5 mr-1" />
              Equation
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icons.media className="w-5 h-5 mr-1" />
              Video
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icons.media className="w-5 h-5 mr-1" />
              Figma Document
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ToolbarModal />
    </div>
  );
};

export default Toolbars;
