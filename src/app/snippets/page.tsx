"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { div } from "framer-motion/client";
import SnippetsPageSkeleton from "./_components/SnippetsPageSkeleton";

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
            <div className="min-h-screen">
                <NavigationHeader />
                <SnippetsPageSkeleton />
            </div>
        );
    }


    return (
        <div></div>
    );
}
export default SnippetsPage;
