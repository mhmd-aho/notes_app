"use client"
import { useBlockNoteSync } from "@convex-dev/prosemirror-sync/blocknote";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { api } from "@/convex/_generated/api";
import { BlockNoteEditor } from "@blocknote/core";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { useMutation } from "convex/react";

export function CollaborativeEditor({ documentId }: { documentId: Id<"notes"> }) {
  const updateTimestamp = useMutation(api.notes.updateNoteTimestamp);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  
  const sync = useBlockNoteSync<BlockNoteEditor>(
    api.document,
    documentId as string
  );

  useEffect(() => {
    if (!sync.editor) return;

    // Listen to editor changes
    const handleChange = () => {
      // Clear previous timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Debounce: only update after 2 seconds of no changes
      timeoutRef.current = setTimeout(() => {
        updateTimestamp({ id: documentId });
      }, 2000);
    };

    // Subscribe to editor changes
    sync.editor.onChange(handleChange);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [sync.editor, documentId, updateTimestamp]);

  return sync.isLoading ? (
    <p>Loading editor...</p>
  ) : sync.editor ? (
    <BlockNoteView editor={sync.editor} />
  ) : (
    <Button onClick={() => sync.create({ type: "doc", content: [] })}>
      Create Document
    </Button>
  );
}