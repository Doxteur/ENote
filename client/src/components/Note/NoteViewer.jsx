import React from "react";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
  import Collaboration from '@tiptap/extension-collaboration'
  import * as Y from 'yjs'
  import { WebrtcProvider } from 'y-webrtc'


function NoteViewer() {

  // A new Y document
  const ydoc = new Y.Doc()
  // Registered with a WebRTC provider
  const provider = new WebrtcProvider('example-document', ydoc)

  const editor = new Editor({
    extensions: [
      StarterKit.configure({
        // The Collaboration extension comes with its own history handling
        history: false,
      }),
      // Register the document with Tiptap
      Collaboration.configure({
        document: ydoc,
      }),
    ],
  })

  return (
    <EditorContent editor={editor} />
  )
}

export default NoteViewer
