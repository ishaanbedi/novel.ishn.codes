"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapEditorProps } from "../editor/props";
import { TiptapExtensions } from "../editor/extensions";
export default function Slug({ content }: { content: string }) {
  const [hydrated, setHydrated] = useState(false);
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    autofocus: "end",
    editable: false,
  });
  useEffect(() => {
    if (editor && !hydrated) {
      const cont = content;
      editor.commands.setContent(cont);
      setHydrated(true);
    }
  }, [editor, hydrated]);
  return (
    <>
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 p-12 px-8 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg"
      >
        <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
          Shared Novel
        </div>
        <span>
          {!hydrated && <div>Loading...</div>}
          {hydrated && <EditorContent editor={editor} />}
        </span>
      </div>
    </>
  );
}
