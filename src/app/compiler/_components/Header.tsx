import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Blocks, Code2, Sparkles } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import HeaderProfileBtn from "./HeaderProfileBtn";

async function Header() {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const user = await currentUser();

    const convexUser = await convex.query(api.users.getUser, {
        userId: user?.id || "",
    });

    return (
        <div className="relative top-2 z-10">
            <div
                className="flex flex-row items-center justify-between 
                p-2 xs:p-3 sm:p-4 md:p-6 mb-2 xs:mb-3 sm:mb-4 rounded-2xl sm:rounded-3xl bg-transparent w-full"
            >
                <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-4 md:gap-8">
                    <Link
                        href="/"
                        className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 md:gap-3 group relative"
                    >
                        {/* Logo hover effect */}
                        <div
                            className="absolute -inset-1.5 sm:-inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
                            group-hover:opacity-100 transition-all duration-500 blur-xl"
                        />

                        {/* Logo */}
                        <div
                            className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-1 xs:p-1.5 sm:p-2 rounded-lg sm:rounded-xl ring-1
                            ring-white/10 group-hover:ring-white/20 transition-all"
                        >
                            <Blocks className="size-3.5 xs:size-4 sm:size-5 md:size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                        </div>

                        <div className="flex flex-col">
                            <span className="block text-xs xs:text-sm sm:text-base md:text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                                BlueminCode
                            </span>
                            <span className="hidden md:block text-xs text-blue-400/60 font-medium">
                                Interactive Code Editor
                            </span>
                        </div>
                    </Link>

                    {/* Navigation - visible at all screen sizes */}
                    <nav className="flex items-center">
                        <Link
                            href="/compiler"
                            className="relative group flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 px-1.5 xs:px-2 sm:px-3 md:px-4 py-1 xs:py-1.5 rounded-lg text-gray-300 bg-gray-800/50 
                            hover:bg-blue-500/10 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg overflow-hidden"
                        >
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
                                to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                            />
                            <Code2 className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 relative z-10 group-hover:rotate-3 transition-transform" />
                            <span
                                className="hidden sm:block text-xs md:text-sm font-medium relative z-10 group-hover:text-white
                                transition-colors"
                            >
                                Editor
                            </span>
                        </Link>
                    </nav>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                    <div className="flex items-center gap-2 xs:gap-3">
                        <ThemeSelector />
                        <LanguageSelector
                            hasAccess={Boolean(convexUser?.isPro)}
                        />
                    </div>

                    {/* Pro Button with Enhanced Gradient */}
                    {!convexUser?.isPro && (
                        <Link
                            href="/pricing"
                            className="flex items-center justify-center gap-1 xs:gap-1.5 sm:gap-2 px-2 xs:px-2.5 sm:px-3 md:px-4 py-1 xs:py-1.5 rounded-lg border border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-500/10 
                        to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 
                        transition-all duration-300"
                        >
                            <Sparkles className="w-3 xs:w-3.5 sm:w-4 h-3 xs:h-3.5 sm:h-4 text-amber-400 hover:text-amber-300" />
                            <span className="hidden sm:block text-xs md:text-sm font-medium text-amber-400/90 hover:text-amber-300">
                                Pro
                            </span>
                        </Link>
                    )}

                    {/* Profile Section with Subtle Separator */}
                    <div className="">
                        <HeaderProfileBtn />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;
