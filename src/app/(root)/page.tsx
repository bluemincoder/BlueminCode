"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import SnippetsPageSkeleton from "./_components/SnippetsPageSkeleton";
import NavigationHeader from "@/components/NavigationHeader";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Code, Grid, Layers, Search, Tag, X } from "lucide-react";
import SnippetCard from "./_components/SnippetCard";
import Image from "next/image";
import { SparklesCore } from "@/components/Sparkles";

function SnippetsPage() {
    const snippets = useQuery(api.snippets.getSnippets);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
        null
    );
    const [view, setView] = useState<"grid" | "list">("grid");

    // loading state
    if (snippets === undefined) {
        return (
            <div className="min-h-screen bg-[#0a0a0f]">
                <div className="relative top-0 mx-auto">
                    <NavigationHeader />
                </div>

                <SnippetsPageSkeleton />
            </div>
        );
    }

    const languages = [...new Set(snippets.map((s) => s.language))];
    const popularLanguages = languages.slice(0, 5);

    const filteredSnippets = snippets.filter((snippet) => {
        const matchesSearch =
            snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            snippet.language
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            snippet.userName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLanguage =
            !selectedLanguage || snippet.language === selectedLanguage;

        return matchesSearch && matchesLanguage;
    });

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            <div className="w-full absolute inset-0 h-screen">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={70}
                    className="w-full h-full"
                    particleColor="#94a3b8"
                />
            </div>
            <div className="relative top-0 mx-auto">
                <NavigationHeader />
            </div>

            <div className="relative max-w-7xl mx-auto py-1 px-5">
                {/* Hero */}
                <div className="text-center max-w-8xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex mb-5 items-center gap-2 px-4 py-1.5 rounded-full 
                        bg-white/5 text-sm text-zinc-400 ring-1 ring-white/5"
                    >
                        <BookOpen className="w-4 h-4" />
                        Community Code Library
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative w-full bg-transparent flex flex-col items-center justify-center overflow-hidden rounded-md">
                            <h1 className="md:text-7xl text-5xl xl:text-8xl lg:text-6xl font-bold text-center relative z-20 tracking-tighter">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/40">
                                    Bluemin-Code
                                </span>
                            </h1>
                        </div>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="md:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto"
                    >
                        Discover and share code snippets in a developer-friendly
                        environment
                    </motion.p>
                </div>

                {/* Filters Section */}
                <div className="relative max-w-5xl mx-auto mb-12 space-y-6">
                    {/* Search */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-violet-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 w-5 h-5 text-zinc-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search snippets by title, language, or author..."
                                className="w-full pl-12 pr-4 py-4 bg-[#1a1a2e]/30 hover:bg-[#1a1a2e]/50 text-zinc-300
                  rounded-xl border border-[#2d2d42] hover:border-[#3a3a55] transition-all duration-200
                  placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-inherit"
                                //           border border-[#2d2d42]/50 hover:border-[#3a3a55]
                                //   transition-all duration-300 overflow-hidden shadow-2xl
                            />
                        </div>
                    </div>

                    {/* Filters Bar */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#1a1a2e]/40 rounded-lg ring-1 ring-[#2d2d42]">
                            <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                            <span className="text-xs sm:text-sm text-zinc-400">
                                Languages:
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {popularLanguages.map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() =>
                                        setSelectedLanguage(
                                            lang === selectedLanguage
                                                ? null
                                                : lang
                                        )
                                    }
                                    className={`
                        group relative px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-all duration-200
                        ${
                            selectedLanguage === lang
                                ? "text-emerald-400 bg-emerald-500/10 ring-2 ring-emerald-500/50"
                                : "text-zinc-400 hover:text-zinc-300 bg-[#1a1a2e]/40 hover:bg-[#262637] ring-1 ring-[#2d2d42]"
                        }
                      `}
                                >
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <Image
                                            src={`/${lang}.png`}
                                            alt={lang}
                                            width={16}
                                            height={16}
                                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
                                        />

                                        <span className="text-xs sm:text-sm">
                                            {lang}
                                        </span>
                                    </div>
                                </button>
                            ))}

                            {selectedLanguage && (
                                <button
                                    onClick={() => setSelectedLanguage(null)}
                                    className="flex items-center gap-1 px-2 py-1 text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                    Clear
                                </button>
                            )}
                        </div>

                        <div className="w-full sm:w-auto sm:ml-auto flex items-center justify-between sm:justify-end gap-2 sm:gap-3 mt-3 sm:mt-0">
                            <span className="text-xs sm:text-sm text-zinc-500">
                                {filteredSnippets.length} snippets found
                            </span>

                            {/* View Toggle */}
                            <div className="flex items-center gap-1 p-0.5 sm:p-1 bg-[#1a1a2e]/40 rounded-lg ring-1 ring-[#2d2d42]">
                                <button
                                    onClick={() => setView("grid")}
                                    className={`p-1.5 sm:p-2 rounded-md transition-all ${
                                        view === "grid"
                                            ? "bg-emerald-500/20 text-emerald-400"
                                            : "text-zinc-400 hover:text-zinc-300 hover:bg-[#262637]"
                                    }`}
                                >
                                    <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </button>
                                <button
                                    onClick={() => setView("list")}
                                    className={`p-1.5 sm:p-2 rounded-md transition-all ${
                                        view === "list"
                                            ? "bg-emerald-500/20 text-emerald-400"
                                            : "text-zinc-400 hover:text-zinc-300 hover:bg-[#262637]"
                                    }`}
                                >
                                    <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Snippets Grid */}
                <motion.div
                    className={`grid gap-6 ${
                        view === "grid"
                            ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1 max-w-3xl mx-auto px-4"
                    }`}
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredSnippets.map((snippet) => (
                            <SnippetCard key={snippet._id} snippet={snippet} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* edge case: empty state */}
                {filteredSnippets.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative max-w-md mx-auto mt-20 p-8 rounded-2xl overflow-hidden"
                    >
                        <div className="text-center">
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br 
                from-emerald-500/15 to-violet-600/10 ring-1 ring-white/10 mb-6"
                            >
                                <Code className="w-8 h-8 text-zinc-400" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-3">
                                No snippets found
                            </h3>
                            <p className="text-zinc-400 mb-6">
                                {searchQuery || selectedLanguage
                                    ? "Try adjusting your search query or filters"
                                    : "Be the first to share a code snippet with the community"}
                            </p>

                            {(searchQuery || selectedLanguage) && (
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedLanguage(null);
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a2e] text-zinc-300 hover:text-white rounded-lg 
                    transition-colors ring-1 ring-[#2d2d42]"
                                >
                                    <X className="w-4 h-4" />
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
export default SnippetsPage;
