"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import { Bold, ClipboardMinus, Italic, LinkIcon, List } from "lucide-react"
import Image from "next/image"
import { useState, useCallback } from "react"

export function TiptapEditor({
  label = "About",
  required = false,
  id = "about",
  placeholder = "Detailed description of your business, services, and what makes you unique...",
  value = "",
  onChange = (html: string) => {},
}) {
  const [characterCount, setCharacterCount] = useState(0)
  const maxLength = 5000

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
    ],
  content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const text = editor.getText()
      setCharacterCount(text.length)
      if (onChange) {
        onChange(editor.getHTML())
      }
    },
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[120px] p-3 text-sm text-gray-800 placeholder-gray-400",
      },
    },
  })

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("Enter URL", previousUrl)

    if (url === null) return
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  if (!editor) return null

  return (
    <div className="space-y-2">
      {/* Label */}
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Editor box */}
      <div className="border rounded-md relative">
        <EditorContent
          editor={editor}
          className="min-h-[120px] p-3"
          id={id}
          placeholder={placeholder}
        />
        {/* Placeholder icon overlay */}
        {editor && editor.isEmpty && (
          <div className="absolute left-3 top-3 flex items-center pointer-events-none text-gray-400">
            {/* <Image src={placeholderIcon || "/icons/clipboard.png"} alt="placeholder icon" width={18} height={18} className="mr-2" /> */}
            <ClipboardMinus className="size-5 mr-2" />
            <span>{placeholder}</span>
          </div>
        )}

        {/* Toolbar + character counter */}
        <div className="flex items-center justify-between border-t px-2 py-2">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-1 rounded hover:bg-gray-100 ${
                editor.isActive("bold") ? "text-blue-500 font-bold" : ""
              }`}
            >
              <Bold className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-1 rounded hover:bg-gray-100 ${
                editor.isActive("italic") ? "text-blue-500 italic" : ""
              }`}
            >
              <Italic className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={setLink}
              className={`p-1 rounded hover:bg-gray-100 ${
                editor.isActive("link") ? "text-blue-500" : ""
              }`}
            >
              <LinkIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-1 rounded hover:bg-gray-100 ${
                editor.isActive("bulletList") ? "text-blue-500" : ""
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <div className="text-xs text-gray-500">
            {characterCount}/{maxLength} characters
          </div>
        </div>
      </div>
    </div>
  )
}
