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
            .withIndex("by_user_id")
            .filter((q) => q.eq(q.field("userId"), identity.subject))
            .first();

        if (!user) throw new Error("User not found");

        const snippetId = await ctx.db.insert("snippets", {
            userId: identity.subject,
            userName: user.name,
            title: args.title,
            language: args.language,
            code: args.code,
        });

        return snippetId;
    },
});

export const getSnippets = query({
    handler: async (ctx) => {
        const snippets = await ctx.db.query("snippets").order("desc").collect();
        return snippets;
    },
});

export const isSnippetStarred = query({
    args: {
        snippetId: v.id("snippets"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return false;

        const star = await ctx.db
            .query("stars")
            .withIndex("by_user_id_and_snippet_id")
            .filter(
                (q) =>
                    q.eq(q.field("userId"), identity.subject) &&
                    q.eq(q.field("snippetId"), args.snippetId)
            )
            .first();

        return !!star;
    },
});

export const getSnippetStarCount = query({
    args: { snippetId: v.id("snippets") },
    handler: async (ctx, args) => {
        const stars = await ctx.db
            .query("stars")
            .withIndex("by_snippet_id")
            .filter((q) => q.eq(q.field("snippetId"), args.snippetId))
            .collect();

        return stars.length;
    },
});