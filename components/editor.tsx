"use client";

import { withPlaceholders } from "./plate-ui/placeholder";
import { withDraggables } from "./plate-ui/with-draggables";

import { withProps } from "@udecode/cn";
import { BaseAlignPlugin as AlignPlugin } from "@udecode/plate-alignment";
import { AutoformatPlugin } from "@udecode/plate-autoformat/react";
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin,
} from "@udecode/plate-basic-marks/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { ExitBreakPlugin, SoftBreakPlugin } from "@udecode/plate-break/react";
import { CaptionPlugin } from "@udecode/plate-caption/react";
import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin,
} from "@udecode/plate-code-block/react";
import { CommentsPlugin } from "@udecode/plate-comments/react";
import {
  createPlateEditor,
  ParagraphPlugin,
  Plate,
  PlateLeaf,
} from "@udecode/plate-common/react";
import { CsvPlugin } from "@udecode/plate-csv";
import { DatePlugin } from "@udecode/plate-date/react";
import { DndPlugin } from "@udecode/plate-dnd";
import { DocxPlugin } from "@udecode/plate-docx";
import { EmojiPlugin } from "@udecode/plate-emoji/react";
import { ExcalidrawPlugin } from "@udecode/plate-excalidraw/react";
import {
  BaseFontBackgroundColorPlugin as FontBackgroundColorPlugin,
  BaseFontColorPlugin as FontColorPlugin,
  BaseFontSizePlugin as FontSizePlugin,
} from "@udecode/plate-font";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { HeadingPlugin } from "@udecode/plate-heading/react";
import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { IndentListPlugin } from "@udecode/plate-indent-list/react";
import { IndentPlugin } from "@udecode/plate-indent/react";
import { JuicePlugin } from "@udecode/plate-juice";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { ColumnItemPlugin, ColumnPlugin } from "@udecode/plate-layout/react";
import { BaseLineHeightPlugin as LineHeightPlugin } from "@udecode/plate-line-height";
import { LinkPlugin } from "@udecode/plate-link/react";
import { TodoListPlugin } from "@udecode/plate-list/react";
import { MarkdownPlugin } from "@udecode/plate-markdown";
import { ImagePlugin, MediaEmbedPlugin } from "@udecode/plate-media/react";
import {
  MentionInputPlugin,
  MentionPlugin,
} from "@udecode/plate-mention/react";
import { NodeIdPlugin } from "@udecode/plate-node-id";
import { ResetNodePlugin } from "@udecode/plate-reset-node/react";
import { DeletePlugin, SelectOnBackspacePlugin } from "@udecode/plate-select";
import { BlockSelectionPlugin } from "@udecode/plate-selection/react";
import { TabbablePlugin } from "@udecode/plate-tabbable/react";
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin,
} from "@udecode/plate-table/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import { TrailingBlockPlugin } from "@udecode/plate-trailing-block";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { BlockquoteElement } from "@/components/plate-ui/blockquote-element";
import { CodeBlockElement } from "@/components/plate-ui/code-block-element";
import { CodeLeaf } from "@/components/plate-ui/code-leaf";
import { CodeLineElement } from "@/components/plate-ui/code-line-element";
import { CodeSyntaxLeaf } from "@/components/plate-ui/code-syntax-leaf";
import { ColumnElement } from "@/components/plate-ui/column-element";
import { ColumnGroupElement } from "@/components/plate-ui/column-group-element";
import { CommentLeaf } from "@/components/plate-ui/comment-leaf";
import { CommentsPopover } from "@/components/plate-ui/comments-popover";
import { DateElement } from "@/components/plate-ui/date-element";
import { Editor as PlateEditor } from "@/components/plate-ui/editor";
import { ExcalidrawElement } from "@/components/plate-ui/excalidraw-element";
import { FixedToolbar } from "@/components/plate-ui/fixed-toolbar";
import { FixedToolbarButtons } from "@/components/plate-ui/fixed-toolbar-buttons";
import { FloatingToolbar } from "@/components/plate-ui/floating-toolbar";
import { FloatingToolbarButtons } from "@/components/plate-ui/floating-toolbar-buttons";
import { HeadingElement } from "@/components/plate-ui/heading-element";
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf";
import { HrElement } from "@/components/plate-ui/hr-element";
import { ImageElement } from "@/components/plate-ui/image-element";
import { KbdLeaf } from "@/components/plate-ui/kbd-leaf";
import { LinkElement } from "@/components/plate-ui/link-element";
import { LinkFloatingToolbar } from "@/components/plate-ui/link-floating-toolbar";
import { MediaEmbedElement } from "@/components/plate-ui/media-embed-element";
import { MentionElement } from "@/components/plate-ui/mention-element";
import { MentionInputElement } from "@/components/plate-ui/mention-input-element";
import { ParagraphElement } from "@/components/plate-ui/paragraph-element";
import {
  TableCellElement,
  TableCellHeaderElement,
} from "@/components/plate-ui/table-cell-element";
import { TableElement } from "@/components/plate-ui/table-element";
import { TableRowElement } from "@/components/plate-ui/table-row-element";
import { TodoListElement } from "@/components/plate-ui/todo-list-element";
import { ToggleElement } from "@/components/plate-ui/toggle-element";
import { cn } from "@/lib/utils";
import { HtmlReactPlugin } from "@udecode/plate-html/react";
import { TodoLi, TodoMarker } from "./plate-ui/indent-todo-marker-component";
import { TooltipProvider } from "./ui/tooltip";

const Editor = () => {
  const editor = createPlateEditor({
    plugins: [
      HtmlReactPlugin,
      BlockquotePlugin,
      CodeBlockPlugin,
      ParagraphPlugin,
      HeadingPlugin,
      HorizontalRulePlugin,
      LinkPlugin.configure({
        render: { afterEditable: () => <LinkFloatingToolbar /> },
      }),
      ImagePlugin,
      ExcalidrawPlugin,
      TogglePlugin,
      ColumnPlugin,
      MediaEmbedPlugin,
      CaptionPlugin.configure({
        options: { plugins: [ImagePlugin, MediaEmbedPlugin] },
      }),
      MentionPlugin,
      TablePlugin,
      TodoListPlugin,
      DatePlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      StrikethroughPlugin,
      CodePlugin,
      SubscriptPlugin,
      SuperscriptPlugin,
      FontColorPlugin,
      FontBackgroundColorPlugin,
      FontSizePlugin,
      HighlightPlugin,
      KbdPlugin,
      AlignPlugin.configure({
        inject: { targetPlugins: ["p", "h1", "h2", "h3"] },
      }),
      IndentPlugin.configure({
        inject: { targetPlugins: ["p", "h1", "h2", "h3"] },
      }),
      IndentListPlugin.configure({
        inject: { targetPlugins: ["p", "h1", "h2", "h3"] },
      }),
      IndentListPlugin.extend({
        options: {
          listStyleTypes: {
            todo: {
              liComponent: TodoLi,
              markerComponent: TodoMarker,
              type: "todo",
            },
          },
        },
      }),
      LineHeightPlugin.configure({
        inject: {
          nodeProps: {
            defaultNodeValue: 1.5,
            validNodeValues: [1, 1.2, 1.5, 2, 3],
          },
          targetPlugins: ["p", "h1", "h2", "h3"],
        },
      }),
      AutoformatPlugin.configure({
        options: {
          enableUndoOnDelete: true,
          rules: [
            // Usage: https://platejs.org/docs/autoformat
          ],
        },
      }),
      BlockSelectionPlugin,
      DndPlugin.configure({
        options: { enableScroller: true },
      }),
      EmojiPlugin,
      ExitBreakPlugin.configure({
        options: {
          rules: [
            {
              hotkey: "mod+enter",
            },
            {
              before: true,
              hotkey: "mod+shift+enter",
            },
            {
              hotkey: "enter",
              level: 1,
              query: {
                allow: ["h1", "h2", "h3"],
                end: true,
                start: true,
              },
              relative: true,
            },
          ],
        },
      }),
      NodeIdPlugin,
      ResetNodePlugin.configure({
        options: {
          rules: [
            // Usage: https://platejs.org/docs/reset-node
          ],
        },
      }),
      SelectOnBackspacePlugin.configure({
        options: {
          query: {
            allow: ["img", "hr"],
          },
        },
      }),
      DeletePlugin,
      SoftBreakPlugin.configure({
        options: {
          rules: [
            { hotkey: "shift+enter" },
            {
              hotkey: "enter",
              query: {
                allow: ["code_block", "blockquote", "td", "th"],
              },
            },
          ],
        },
      }),
      TabbablePlugin,
      TrailingBlockPlugin.configure({
        options: { type: "p" },
      }),
      CommentsPlugin,
      DocxPlugin,
      CsvPlugin,
      MarkdownPlugin.configure({
        options: {
          indentList: true,
        },
      }),
      JuicePlugin,
    ],
    override: {
      components: withDraggables(
        withPlaceholders({
          [BlockquotePlugin.key]: BlockquoteElement,
          [CodeBlockPlugin.key]: CodeBlockElement,
          [CodeLinePlugin.key]: CodeLineElement,
          [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
          [ExcalidrawPlugin.key]: ExcalidrawElement,
          [HorizontalRulePlugin.key]: HrElement,
          [ImagePlugin.key]: ImageElement,
          [LinkPlugin.key]: LinkElement,
          [TogglePlugin.key]: ToggleElement,
          [ColumnPlugin.key]: ColumnGroupElement,
          [ColumnItemPlugin.key]: ColumnElement,
          [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
          [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
          [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
          [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
          [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: "h5" }),
          [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: "h6" }),
          [MediaEmbedPlugin.key]: MediaEmbedElement,
          [MentionPlugin.key]: MentionElement,
          [MentionInputPlugin.key]: MentionInputElement,
          [ParagraphPlugin.key]: ParagraphElement,
          [TablePlugin.key]: TableElement,
          [TableRowPlugin.key]: TableRowElement,
          [TableCellPlugin.key]: TableCellElement,
          [TableCellHeaderPlugin.key]: TableCellHeaderElement,
          [TodoListPlugin.key]: TodoListElement,
          [DatePlugin.key]: DateElement,
          [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
          [CodePlugin.key]: CodeLeaf,
          [CommentsPlugin.key]: CommentLeaf,
          [HighlightPlugin.key]: HighlightLeaf,
          [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
          [KbdPlugin.key]: KbdLeaf,
          [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
          [SubscriptPlugin.key]: withProps(PlateLeaf, { as: "sub" }),
          [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: "sup" }),
          [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" }),
        })
      ),
    },
    value: [
      {
        id: "1",
        type: "p",
        children: [{ text: "Hello, World!" }],
      },
    ],
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <TooltipProvider
        disableHoverableContent
        delayDuration={500}
        skipDelayDuration={0}
      >
        <Plate editor={editor}>
          <FixedToolbar className="no-scrollbar">
            <FixedToolbarButtons />
          </FixedToolbar>
          <div
            id="editor-playground"
            className="flex w-full"
            style={
              {
                "--editor-px": "max(5%,24px)",
              } as any
            }
          >
            <div
              className={cn(
                "relative flex max-h-[800px] w-full overflow-x-auto",
                // block selection area
                "[&_.slate-selection-area]:border [&_.slate-selection-area]:border-brand/25 [&_.slate-selection-area]:bg-brand/15"
              )}
              data-plate-selectable
            >
              <PlateEditor className="border-0" />
            </div>
          </div>
          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>
          <CommentsPopover />
        </Plate>
      </TooltipProvider>
    </DndProvider>
  );
};

export default Editor;
