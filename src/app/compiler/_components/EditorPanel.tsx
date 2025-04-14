"use client";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { RotateCcwIcon, ShareIcon, TypeIcon } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import useMounted from "@/hooks/useMounted";
import ShareSnippetDialog from "./ShareSnippetDialog";

function EditorPanel() {
    const clerk = useClerk();
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
    const { language, theme, fontSize, editor, setFontSize, setEditor } =
        useCodeEditorStore();

    const mounted = useMounted();

    useEffect(() => {
        const savedCode = localStorage.getItem(`editor-code-${language}`);
        const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
        if (editor) editor.setValue(newCode);
    }, [language, editor]);

    useEffect(() => {
        const savedFontSize = localStorage.getItem("editor-font-size");
        if (savedFontSize) setFontSize(parseInt(savedFontSize));
    }, [setFontSize]);

    const handleRefresh = () => {
        const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
        if (editor) editor.setValue(defaultCode);
        localStorage.removeItem(`editor-code-${language}`);
    };

    const handleEditorChange = (value: string | undefined) => {
        if (value) localStorage.setItem(`editor-code-${language}`, value);
    };

    const handleFontSizeChange = (newSize: number) => {
        const size = Math.min(Math.max(newSize, 12), 24);
        setFontSize(size);
        localStorage.setItem("editor-font-size", size.toString());
    };

    if (!mounted) return null;

    return (
        <div className="relative">
            <div className="relative bg-[#12121a]/40 backdrop-blur rounded-xl border border-white/[0.05] p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
                            <Image
                                src={"/" + language + ".png"}
                                alt="Logo"
                                width={20}
                                height={20}
                                className="w-5 h-5 sm:w-6 sm:h-6"
                            />
                        </div>
                        <div>
                            <h2 className="text-sm font-medium text-white">
                                Code Editor
                            </h2>
                            <p className="text-xs text-gray-500">
                                Write and execute your code
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Font Size Slider */}
                        <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 bg-[#0f0f1a] rounded-lg ring-1 ring-white/5">
                            <TypeIcon className="size-3.5 sm:size-4 text-gray-400" />
                            <div className="flex items-center gap-2 sm:gap-3">
                                <input
                                    type="range"
                                    min="12"
                                    max="24"
                                    value={fontSize}
                                    onChange={(e) =>
                                        handleFontSizeChange(
                                            parseInt(e.target.value)
                                        )
                                    }
                                    className="w-16 sm:w-20 h-1 bg-blue-900 rounded-lg cursor-pointer"
                                />
                                <span className="text-xs sm:text-sm font-medium text-gray-400 min-w-[1.5rem] sm:min-w-[2rem] text-center">
                                    {fontSize}
                                </span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleRefresh}
                            className="p-1.5 sm:p-2 bg-[#0f0f1a] hover:bg-[#2a2a3a]/50 rounded-lg ring-1 ring-white/5 transition-colors"
                            aria-label="Reset to default code"
                        >
                            <RotateCcwIcon className="size-3.5 sm:size-4 text-gray-400" />
                        </motion.button>

                        {/* Share Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsShareDialogOpen(true)}
                            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg overflow-hidden bg-gradient-to-r
               from-blue-500/40 to-blue-600/40 opacity-90 hover:opacity-100 transition-opacity"
                        >
                            <ShareIcon className="size-3.5 sm:size-4 text-white" />
                            <span className="text-xs sm:text-sm font-medium text-white">
                                Share
                            </span>
                        </motion.button>
                    </div>
                </div>

                {/* Editor  */}
                <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
                    {clerk.loaded && (
                        <Editor
                            height="600px"
                            language={LANGUAGE_CONFIG[language].monacoLanguage}
                            onChange={handleEditorChange}
                            theme={theme}
                            beforeMount={defineMonacoThemes}
                            onMount={(editor) => setEditor(editor)}
                            options={{
                                minimap: { enabled: false },
                                fontSize,
                                automaticLayout: true,
                                scrollBeyondLastLine: false,
                                padding: { top: 12, bottom: 12 },
                                renderWhitespace: "selection",
                                fontFamily:
                                    '"Fira Code", "Cascadia Code", Consolas, monospace',
                                fontLigatures: true,
                                cursorBlinking: "smooth",
                                smoothScrolling: true,
                                contextmenu: true,
                                renderLineHighlight: "all",
                                lineHeight: 1.6,
                                letterSpacing: 0.5,
                                roundedSelection: true,
                                scrollbar: {
                                    verticalScrollbarSize: 6,
                                    horizontalScrollbarSize: 6,
                                },
                            }}
                        />
                    )}

                    {!clerk.loaded && <EditorPanelSkeleton />}
                </div>
            </div>
            {isShareDialogOpen && (
                <ShareSnippetDialog
                    onClose={() => setIsShareDialogOpen(false)}
                />
            )}
        </div>
    );
}
export default EditorPanel;
