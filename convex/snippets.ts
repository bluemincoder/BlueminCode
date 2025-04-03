import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createSnippet = mutation({
    args: {
        title: v.string(),
        language: v.string(),
        code: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_user_id", (q) => q.eq("userId", identity.subject))
            .first();

        if (!user) throw new Error("User not found");

        return await ctx.db.insert("snippets", {
            userId: identity.subject,
            userName: user.name,
            title: args.title,
            language: args.language,
            code: args.code,
            starCount: 0,
        });
    },
});

export const getSnippets = query({
    handler: async (ctx) => {
        return await ctx.db.query("snippets").order("desc").collect();
    },
});

export const getSnippetById = query({
    args: { snippetId: v.id("snippets") },
    handler: async (ctx, args) => {
        const snippet = await ctx.db.get(args.snippetId);
        if (!snippet) throw new Error("Snippet not found");
        return snippet;
    },
});

export const getComments = query({
    args: { snippetId: v.id("snippets") },
    handler: async (ctx, args) => {
        const comments = await ctx.db
            .query("snippetComments")
            .withIndex("by_snippet_id")
            .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
            .order("desc")
            .collect();

        return comments;
    },
});

export const addComment = mutation({
    args: {
        snippetId: v.id("snippets"),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_user_id")
            .filter((q) => q.eq(q.field("userId"), identity.subject))
            .first();

        if (!user) throw new Error("User not found");

        return await ctx.db.insert("snippetComments", {
            snippetId: args.snippetId,
            userId: identity.subject,
            userName: user.name,
            content: args.content,
        });
    },
});

export const deleteComment = mutation({
    args: { commentId: v.id("snippetComments") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const comment = await ctx.db.get(args.commentId);
        if (!comment) throw new Error("Comment not found");

        // Check if the user is the comment author
        if (comment.userId !== identity.subject) {
            throw new Error("Not authorized to delete this comment");
        }

        await ctx.db.delete(args.commentId);
    },
});

export const isSnippetStarred = query({
    args: { snippetId: v.id("snippets"), userId: v.optional(v.string()) },
    handler: async (ctx, { snippetId, userId }) => {
        if (!userId) return false;

        return Boolean(
            await ctx.db
                .query("stars")
                .withIndex("by_user_id_and_snippet_id", (q) =>
                    q.eq("userId", userId).eq("snippetId", snippetId)
                )
                .first()
        );
    },
});

export const getSnippetStarCount = query({
    args: { snippetId: v.id("snippets") },
    handler: async (ctx, { snippetId }) => {
        const snippet = await ctx.db.get(snippetId);
        return snippet?.starCount ?? 0;
    },
});

export const deleteSnippet = mutation({
    args: { snippetId: v.id("snippets") },
    handler: async (ctx, { snippetId }) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const snippet = await ctx.db.get(snippetId);
        if (!snippet) throw new Error("Snippet not found");

        if (snippet.userId !== identity.subject) {
            throw new Error("Not authorized to delete this snippet");
        }

        const [comments, stars] = await Promise.all([
            ctx.db
                .query("snippetComments")
                .withIndex("by_snippet_id", (q) => q.eq("snippetId", snippetId))
                .collect(),
            ctx.db
                .query("stars")
                .withIndex("by_snippet_id", (q) => q.eq("snippetId", snippetId))
                .collect(),
        ]);

        await Promise.all([
            ...comments.map((c) => ctx.db.delete(c._id)),
            ...stars.map((s) => ctx.db.delete(s._id)),
        ]);

        await ctx.db.delete(snippetId);
    },
});

export const starSnippet = mutation({
    args: { snippetId: v.id("snippets") },
    handler: async (ctx, { snippetId }) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const snippet = await ctx.db.get(snippetId);
        if (!snippet) throw new Error("Snippet not found");

        const existingStar = await ctx.db
            .query("stars")
            .withIndex("by_user_id_and_snippet_id", (q) =>
                q.eq("userId", identity.subject).eq("snippetId", snippetId)
            )
            .first();

        if (existingStar) {
            await ctx.db.delete(existingStar._id);
            await ctx.db.patch(snippetId, {
                starCount: Math.max(0, snippet.starCount - 1),
            });
        } else {
            await ctx.db.insert("stars", {
                userId: identity.subject,
                snippetId: snippetId,
            });
            await ctx.db.patch(snippetId, {
                starCount: snippet.starCount + 1,
            });
        }
    },
});

export const getUserSnippetStarCount = query({
    args: { snippetId: v.id("snippets"), userId: v.string() },
    handler: async (ctx, { snippetId, userId }) => {
        const stars = await ctx.db
            .query("stars")
            .withIndex("by_user_id_and_snippet_id", (q) =>
                q.eq("userId", userId).eq("snippetId", snippetId)
            )
            .collect();

        return stars.length;
    },
});
