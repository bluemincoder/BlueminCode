import { useAuth } from "@clerk/nextjs";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

function StarButton({ snippetId }: { snippetId: Id<"snippets"> }) {
    const { userId } = useAuth();
    const starMutation = useMutation(api.snippets.starSnippet);

    const userStarred =
        useQuery(
            api.snippets.isSnippetStarred,
            userId ? { snippetId, userId } : "skip"
        ) ?? false;

    const snippetStarCount =
        useQuery(api.snippets.getSnippetStarCount, { snippetId }) ?? 0;

    const [isStarred, setIsStarred] = useState(userStarred);
    const [starCount, setStarCount] = useState(snippetStarCount);

    useEffect(() => {
        setIsStarred(userStarred);
    }, [userStarred]);

    useEffect(() => {
        setStarCount(snippetStarCount);
    }, [snippetStarCount]);

    const handleStar = async () => {
        if (!userId) return;

        setIsStarred((prev) => !prev);
        setStarCount((prev) => (isStarred ? prev - 1 : prev + 1));

        await starMutation({ snippetId }).catch(() => {
            setIsStarred(userStarred);
            setStarCount(snippetStarCount);
        });
    };

    return (
        <button
            className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                isStarred
                    ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                    : "bg-gray-500/10 text-gray-400 hover:bg-gray-500/20"
            }`}
            onClick={handleStar}
        >
            <Star
                className={`w-4 h-4 ${isStarred ? "fill-yellow-500" : "fill-none group-hover:fill-gray-400"}`}
            />
            <span
                className={`text-xs font-medium ${isStarred ? "text-yellow-500" : "text-gray-400"}`}
            >
                {starCount}
            </span>
        </button>
    );
}

export default StarButton;
