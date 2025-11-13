"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { useEffect, useState, useId } from "react";
import ImageUpload from "./ImageUpload";

const DEFAULT_TEXT_COLOR = "#111827";
const DEFAULT_HIGHLIGHT_COLOR = "#fff9c4";

const sanitizeHexColor = (value, fallback) => {
  if (typeof value !== "string") {
    return fallback;
  }

  const normalized = value.trim();

  if (/^#([0-9a-f]{6})$/i.test(normalized)) {
    return normalized.toLowerCase();
  }

  if (/^#([0-9a-f]{3})$/i.test(normalized)) {
    const expanded = normalized
      .slice(1)
      .split("")
      .map((char) => char + char)
      .join("");
    return `#${expanded.toLowerCase()}`;
  }

  return fallback;
};

const extractYouTubeId = (url) => {
  if (!url || typeof url !== "string") {
    return null;
  }

  try {
    const parsedUrl = new URL(url.trim());
    const hostname = parsedUrl.hostname.replace("www.", "").toLowerCase();

    if (hostname === "youtu.be") {
      const [videoId] = parsedUrl.pathname.split("/").filter(Boolean);
      return videoId || null;
    }

    if (
      hostname === "youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname.endsWith(".youtube.com") ||
      hostname === "youtube-nocookie.com"
    ) {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v");
      }

      if (parsedUrl.pathname.startsWith("/embed/")) {
        const [, videoId] = parsedUrl.pathname.split("/").filter(Boolean);
        return videoId || null;
      }

      if (parsedUrl.pathname.startsWith("/shorts/")) {
        const [, videoId] = parsedUrl.pathname.split("/").filter(Boolean);
        return videoId || null;
      }
    }
  } catch (error) {
    return null;
  }

  return null;
};

const getYouTubeEmbedUrl = (url) => {
  const videoId = extractYouTubeId(url);
  if (!videoId) {
    return null;
  }
  return `https://www.youtube.com/embed/${videoId}?rel=0`;
};

const hasProtocol = (url) => /^[a-zA-Z][\w.+-]*:/.test(url);

const normalizeUrl = (url) => {
  if (!url) {
    return "";
  }

  return hasProtocol(url) ? url : `https://${url}`;
};

// MenuBar component defined outside
function MenuBar({ editor, onImageClick }) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageMode, setImageMode] = useState("upload"); // 'upload' or 'url'
  const [textColor, setTextColor] = useState(DEFAULT_TEXT_COLOR);
  const [highlightColor, setHighlightColor] = useState(DEFAULT_HIGHLIGHT_COLOR);
  const textColorId = useId();
  const highlightColorId = useId();

  if (!editor) {
    return null;
  }

  const handleImageUrl = (url) => {
    if (url && url.trim()) {
      editor.chain().focus().setImage({ src: url.trim() }).run();
    }
    setShowImageModal(false);
  };

  const handleImageUploaded = (url) => {
    editor.chain().focus().setImage({ src: url }).run();
    setShowImageModal(false);
  };

  useEffect(() => {
    const updateColorState = () => {
      const currentColor = sanitizeHexColor(
        editor.getAttributes("textStyle").color,
        DEFAULT_TEXT_COLOR
      );
      setTextColor((prev) => (prev === currentColor ? prev : currentColor));

      const currentHighlight = sanitizeHexColor(
        editor.getAttributes("highlight").color,
        DEFAULT_HIGHLIGHT_COLOR
      );
      setHighlightColor((prev) =>
        prev === currentHighlight ? prev : currentHighlight
      );
    };

    updateColorState();
    editor.on("selectionUpdate", updateColorState);
    editor.on("transaction", updateColorState);

    return () => {
      editor.off("selectionUpdate", updateColorState);
      editor.off("transaction", updateColorState);
    };
  }, [editor]);

  const handleAddLink = () => {
    const existingLink = editor.getAttributes("link").href || "";
    const url = window.prompt("Enter URL:", existingLink);

    if (url === null) {
      return;
    }

    const trimmedUrl = url.trim();

    if (trimmedUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    const embedUrl = getYouTubeEmbedUrl(trimmedUrl);
    if (embedUrl) {
      editor.chain().focus().setYoutubeVideo({ src: embedUrl }).run();
      return;
    }

    const normalizedUrl = normalizeUrl(trimmedUrl);
    const { empty } = editor.state.selection;

    if (empty) {
      editor
        .chain()
        .focus()
        .insertContent([
          {
            type: "text",
            text: normalizedUrl,
            marks: [
              {
                type: "link",
                attrs: {
                  href: normalizedUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
              },
            ],
          },
          {
            type: "text",
            text: " ",
          },
        ])
        .run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: normalizedUrl,
        target: "_blank",
        rel: "noopener noreferrer",
      })
      .run();
  };

  return (
    <>
      <div className="flex flex-wrap gap-1.5 sm:gap-2 p-2 sm:p-3 md:p-4 bg-gray-50 rounded-t-xl border-b-2 border-gray-200 mb-0 overflow-x-auto">
        {/* Headings */}
        <select
          value={
            editor.isActive("heading", { level: 1 })
              ? "h1"
              : editor.isActive("heading", { level: 2 })
              ? "h2"
              : editor.isActive("heading", { level: 3 })
              ? "h3"
              : editor.isActive("heading", { level: 4 })
              ? "h4"
              : editor.isActive("heading", { level: 5 })
              ? "h5"
              : editor.isActive("heading", { level: 6 })
              ? "h6"
              : "p"
          }
          onChange={(e) => {
            const value = e.target.value;
            if (value === "p") {
              editor.chain().focus().setParagraph().run();
            } else {
              const level = parseInt(value.replace("h", ""));
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}
          className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
        </select>

        <div className="w-px h-8 bg-gray-300"></div>

        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2.5 rounded-lg transition-colors ${
            editor.isActive("bold")
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-200"
          }`}
          title="Bold"
        >
          <span className="font-bold text-base">B</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2.5 rounded-lg transition-colors ${
            editor.isActive("italic")
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-200"
          }`}
          title="Italic"
        >
          <span className="italic text-base">I</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2.5 rounded-lg transition-colors ${
            editor.isActive("underline")
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-200"
          }`}
          title="Underline"
        >
          <span className="underline text-base">U</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`p-2.5 rounded-lg transition-colors ${
            editor.isActive("strike")
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-200"
          }`}
          title="Strikethrough"
        >
          <span className="line-through text-base">S</span>
        </button>

        <div className="w-px h-8 bg-gray-300"></div>

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2.5 rounded-lg transition-colors ${
            editor.isActive("bulletList")
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-200"
          }`}
          title="Bullet List"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm3-9h13v2H7zm0 5h13v2H7zm0 5h13v2H7z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2.5 rounded-lg transition-colors ${
            editor.isActive("orderedList")
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-200"
          }`}
          title="Numbered List"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V8H2v1h1zm-1 4h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z" />
          </svg>
        </button>

        <div className="w-px h-8 bg-gray-300"></div>

        {/* Alignment */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`p-2.5 rounded-lg transition-colors ${
            editor.isActive({ textAlign: "left" })
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-200"
          }`}
          title="Align Left"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15 15H3v2h12v-2zm0-8H3v2h12V7zM3 13h18v-2H3v2zm0 8h18v-2H3v2zM3 3v2h18V3H3z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`p-2.5 rounded-lg transition-colors ${
            editor.isActive({ textAlign: "center" })
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-200"
          }`}
          title="Align Center"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 15v2h10v-2H7zm-4-2h18v-2H3v2zm4-7v2h10V6H7zM3 3v2h18V3H3zm0 16h18v-2H3v2z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`p-2.5 rounded-lg transition-colors ${
            editor.isActive({ textAlign: "right" })
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-200"
          }`}
          title="Align Right"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12V7H9v2zm-6-4h18V3H3v2z" />
          </svg>
        </button>

        <div className="w-px h-8 bg-gray-300"></div>

        {/* Blockquote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={!editor.can().chain().focus().toggleBlockquote().run()}
          className={`p-2.5 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
            editor.isActive("blockquote")
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-200"
          }`}
          title="Blockquote"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
          </svg>
        </button>

        {/* Link */}
        <button
          type="button"
          onClick={handleAddLink}
          className={`p-2.5 rounded-lg transition-colors ${
            editor.isActive("link")
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-200"
          }`}
          title="Add Link"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
          </svg>
        </button>

        {/* Image */}
        <button
          type="button"
          onClick={() => setShowImageModal(true)}
          className="p-2.5 rounded-lg transition-colors hover:bg-gray-200"
          title="Add Image"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
        </button>

        <div className="w-px h-8 bg-gray-300"></div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg">
          <label
            htmlFor={textColorId}
            className="text-xs font-semibold text-gray-600"
          >
            Text
          </label>
          <input
            id={textColorId}
            type="color"
            value={textColor}
            onChange={(e) => {
              const value = sanitizeHexColor(e.target.value, DEFAULT_TEXT_COLOR);
              setTextColor(value);
              editor.chain().focus().setColor(value).run();
            }}
            className="h-9 w-9 cursor-pointer border border-gray-200 rounded"
            title="Text color"
          />
          <button
            type="button"
            onClick={() => {
              setTextColor(DEFAULT_TEXT_COLOR);
              editor.chain().focus().unsetColor().run();
            }}
            className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
            title="Reset text color"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg">
          <label
            htmlFor={highlightColorId}
            className="text-xs font-semibold text-gray-600"
          >
            Highlight
          </label>
          <input
            id={highlightColorId}
            type="color"
            value={highlightColor}
            onChange={(e) => {
              const value = sanitizeHexColor(
                e.target.value,
                DEFAULT_HIGHLIGHT_COLOR
              );
              setHighlightColor(value);
              editor.chain().focus().setHighlight({ color: value }).run();
            }}
            className="h-9 w-9 cursor-pointer border border-gray-200 rounded"
            title="Background color"
          />
          <button
            type="button"
            onClick={() => {
              setHighlightColor(DEFAULT_HIGHLIGHT_COLOR);
              editor.chain().focus().unsetHighlight().run();
            }}
            className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
            title="Remove highlight"
          >
            Clear
          </button>
        </div>

        <div className="w-px h-8 bg-gray-300"></div>

        {/* Undo/Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2.5 rounded-lg transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Undo"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2.5 rounded-lg transition-colors hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Redo"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z" />
          </svg>
        </button>
      </div>

      {/* Image Upload/URL Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Add Image</h3>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setImageMode("upload")}
                  className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                    imageMode === "upload"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Upload Image
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode("url")}
                  className={`flex-1 px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                    imageMode === "url"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Image URL
                </button>
              </div>

              {imageMode === "upload" ? (
                <ImageUpload
                  onImageUploaded={handleImageUploaded}
                  onCancel={() => setShowImageModal(false)}
                />
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Enter Image URL
                    </label>
                    <input
                      type="url"
                      id="image-url-input"
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const url = e.target.value;
                          handleImageUrl(url);
                        }
                      }}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setShowImageModal(false)}
                      className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-100 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-200 transition-all font-semibold text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById("image-url-input");
                        handleImageUrl(input?.value);
                      }}
                      className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all font-semibold text-sm sm:text-base"
                    >
                      Add Image
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing your amazing story...",
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        // Exclude image from StarterKit since we're using our own Image extension
        image: false,
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
          target: "_blank",
          rel: "noopener noreferrer",
        },
        autolink: true,
        linkOnPaste: true,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-4",
        },
      }),
      Underline,
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: "px-1 rounded",
        },
      }),
      Youtube.configure({
        inline: false,
        allowFullscreen: true,
        modestBranding: true,
        HTMLAttributes: {
          class:
            "tiptap-youtube-player w-full aspect-video my-6 rounded-2xl overflow-hidden",
          frameborder: "0",
          allow:
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        },
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[400px] px-5 py-5",
        "data-placeholder": placeholder,
      },
    },
  });

  useEffect(() => {
    if (editor && value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const handlePaste = ({ event }) => {
      const text = event.clipboardData?.getData("text/plain");
      const embedUrl = getYouTubeEmbedUrl(text);

      if (embedUrl) {
        event.preventDefault();
        editor.chain().focus().setYoutubeVideo({ src: embedUrl }).run();
      }
    };

    editor.on("paste", handlePaste);
    return () => {
      editor.off("paste", handlePaste);
    };
  }, [editor]);

  if (!editor) {
    return (
      <div className="h-[400px] border-2 border-gray-300 rounded-xl bg-white animate-pulse flex items-center justify-center">
        <p className="text-gray-400">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="rich-text-editor">
      <MenuBar editor={editor} onImageClick={() => {}} />
      <div className="border-2 border-gray-300 rounded-b-xl border-t-0">
        <EditorContent editor={editor} />
      </div>
      <style jsx global>{`
        .rich-text-editor .ProseMirror {
          outline: none;
          min-height: 400px;
          padding: 20px;
        }
        .rich-text-editor .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
        .rich-text-editor .ProseMirror h1 {
          font-size: 2.5rem;
          font-weight: bold;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .rich-text-editor .ProseMirror h2 {
          font-size: 2rem;
          font-weight: bold;
          margin-top: 1.25rem;
          margin-bottom: 0.875rem;
          line-height: 1.3;
        }
        .rich-text-editor .ProseMirror h3 {
          font-size: 1.5rem;
          font-weight: bold;
          margin-top: 1rem;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        .rich-text-editor .ProseMirror h4 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-top: 0.875rem;
          margin-bottom: 0.625rem;
        }
        .rich-text-editor .ProseMirror h5 {
          font-size: 1.125rem;
          font-weight: bold;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .rich-text-editor .ProseMirror h6 {
          font-size: 1rem;
          font-weight: bold;
          margin-top: 0.625rem;
          margin-bottom: 0.5rem;
        }
        .rich-text-editor .ProseMirror p {
          margin-bottom: 1rem;
          line-height: 1.7;
        }
        .rich-text-editor .ProseMirror ul,
        .rich-text-editor .ProseMirror ol {
          margin-bottom: 1rem;
          padding-left: 2rem;
        }
        .rich-text-editor .ProseMirror blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
          background-color: #f9fafb;
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
        }
        .rich-text-editor .ProseMirror a {
          color: #3b82f6;
          text-decoration: underline;
        }
        .rich-text-editor .ProseMirror img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
          border-radius: 0.5rem;
        }
        .rich-text-editor .ProseMirror iframe {
          width: 100%;
          aspect-ratio: 16 / 9;
          border: 0;
          margin: 1.5rem 0;
          border-radius: 0.75rem;
          background-color: #000;
        }
      `}</style>
    </div>
  );
}
