"use client";
import { Snippet } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Trash2, User } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import StarButton from "@/components/StarButton";

function SnippetCard({ snippet }: { snippet: Snippet }) {
    const { user } = useUser();
    const deleteSnippet = useMutation(api.snippets.deleteSnippet);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteSnippet({ snippetId: snippet._id });
        } catch (error) {
            console.log("Error deleting snippet:", error);
            toast.error("Error deleting snippet");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <motion.div
            layout
            className="group relative"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
        >
            <Link href={`/${snippet._id}`} className="h-full block">
                <div
                    className="relative h-full bg-gradient-to-br from-[#0a0a0f] to-[#11111d] rounded-xl 
          border border-[#2d2d42]/50 hover:border-[#3a3a55] 
          transition-all duration-300 overflow-hidden shadow-2xl"
                >
                    <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-violet-600 rounded-lg blur opacity-20 
                  group-hover:opacity-30 transition-all duration-500"
                                        aria-hidden="true"
                                    />
                                    <div
                                        className="relative p-2 rounded-lg bg-gradient-to-br from-emerald-500/15 to-violet-600/15 
                   group-hover:from-emerald-500/25 group-hover:to-violet-600/25 transition-all duration-500"
                                    >
                                        <Image
                                            src={`/${snippet.language}.png`}
                                            alt={`${snippet.language} logo`}
                                            className="w-6 h-6 object-contain relative z-10"
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium">
                                        {snippet.language}
                                    </span>
                                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                                        <Clock className="size-3" />
                                        {new Date(
                                            snippet._creationTime
                                        ).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            <div
                                className="absolute top-5 right-5 z-10 flex gap-4 items-center"
                                onClick={(e) => e.preventDefault()}
                            >
                                <StarButton snippetId={snippet._id} />

                                {user?.id === snippet.userId && (
                                    <div
                                        className="z-10"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <button
                                            onClick={handleDelete}
                                            disabled={isDeleting}
                                            className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200
                                  ${
                                      isDeleting
                                          ? "bg-red-500/20 text-red-400 cursor-not-allowed"
                                          : "bg-zinc-700/20 text-zinc-400 hover:bg-red-500/20 hover:text-red-400"
                                  }
                                `}
                                        >
                                            {isDeleting ? (
                                                <div className="size-3.5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                                            ) : (
                                                <Trash2 className="size-3.5" />
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-2 line-clamp-1 group-hover:text-emerald-400 transition-colors">
                                    {snippet.title}
                                </h2>
                                <div className="flex items-center gap-3 text-sm text-zinc-300">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1 rounded-md bg-[#1a1a2e]">
                                            <User className="size-3 text-emerald-400" />
                                        </div>
                                        <span className="truncate max-w-[150px]">
                                            {snippet.userName}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative group/code">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-violet-600/5 rounded-lg opacity-0 group-hover/code:opacity-100 transition-all" />
                                <pre className="relative bg-[#0d0d15] border border-[#1a1a2e]/50 rounded-lg p-4 overflow-hidden text-sm text-zinc-300 font-mono line-clamp-5 pb-1">
                                    {snippet.code}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
export default SnippetCard;
