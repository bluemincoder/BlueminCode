"use client";
import { Snippet } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import toast from "react-hot-toast";

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
      <div>SnippetCard</div>
    );
}
export default SnippetCard;
