"use client";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { EditorState } from "lexical";
import { useEffect, useState } from "react";
import Toolbars from "./Toolbars";
import { ImageNode } from "./nodes/ImageNode";
import { InlineImageNode } from "./nodes/InlineImageNode/InlineImageNode";
import DragDropPaste from "./plugins/DragDropPastePlugin";
import ImagesPlugin from "./plugins/ImagesPlugin";
import InlineImagePlugin from "./plugins/InlineImagePlugin";

const theme = {
  // Theme styling goes here
  //...
};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

function MyOnChangePlugin({
  onChange,
}: {
  onChange: (value: EditorState) => void;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

// Function to convert Lexical editor state to HTML

const Editor = () => {
  const initialConfig = {
    namespace: "MyEditor",
    nodes: [ImageNode, InlineImageNode],
    theme,
    onError,
  };

  const [editorState, setEditorState] = useState<string>();
  function onChange(editorState: EditorState) {
    const editorStateJSON = editorState.toJSON();
    setEditorState(JSON.stringify(editorStateJSON));
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbars />
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="border min-h-40 focus:outline-none p-4" />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />

      <AutoFocusPlugin />
      <MyOnChangePlugin onChange={onChange} />
      <DragDropPaste />
      <ImagesPlugin />
      <InlineImagePlugin />
    </LexicalComposer>
  );
};

export default Editor;
