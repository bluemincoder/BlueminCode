import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Blocks, Code2, Sparkles } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";

async function Header() {
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const user = await currentUser();

    const convexUser = await convex.query(api.users.getUser, {
        userId: user?.id || "",
    });

    return (
        <div className="sticky top-4 z-10">
            <div
                className="flex items-center lg:justify-between justify-center 
        bg-[#0a0a0f]/30 backdrop-blur-xl p-6 mb-4 rounded-3xl"
            >
                <div className="hidden lg:flex items-center gap-8">
                    <Link
                        href="/"
                        className="flex items-center gap-3 group relative"
                    >
                        {/* Logo hover effect */}

                        <div
                            className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
                group-hover:opacity-100 transition-all duration-500 blur-xl"
                        />

                        {/* Logo */}
                        <div
                            className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
              ring-white/10 group-hover:ring-white/20 transition-all"
                        >
                            <Blocks className="size-6 text-blue-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
                        </div>

                        <div className="flex flex-col">
                            <span className="block text-lg font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
                                BlueminCode
                            </span>
                            <span className="block text-xs text-blue-400/60 font-medium">
                                Interactive Code Editor
                            </span>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-2">
                        <Link
                            href="/compiler"
                            className="
                                relative group flex items-center gap-2 px-4 py-2 
                                rounded-xl 
                                bg-[#0f0f1a] hover:bg-[#1a1a2e]
                                border border-white/10 hover:border-blue-500/30
                                transition-all duration-300
                                shadow-inner
                            "
                        >
                            <Code2
                                className="
                                w-4 h-4 
                                text-blue-400 
                                group-hover:text-blue-300 
                                transition-colors
                            "
                            />
                            <span
                                className="
                                text-sm font-medium 
                                text-gray-300 group-hover:text-white
                                transition-colors
                            "
                            >
                                Code Editor
                            </span>
                        </Link>
                    </nav>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <ThemeSelector />
                        <LanguageSelector
                            hasAccess={Boolean(convexUser?.isPro)}
                        />
                    </div>

                    {/* Pro Button with Enhanced Gradient */}
                    {!convexUser?.isPro && (
                        <Link
                            href="/pricing"
                            className="
                                flex items-center gap-2 px-4 py-2 
                                rounded-xl 
                                bg-gradient-to-r from-amber-600/20 to-orange-600/20 
                                hover:from-amber-600/30 hover:to-orange-600/30
                                border border-amber-500/30 hover:border-amber-400/50
                                transition-all duration-300
                                group
                            "
                        >
                            <Sparkles
                                className="
                                w-4 h-4 
                                text-amber-400 
                                group-hover:text-amber-300 
                                transition-colors
                            "
                            />
                            <span
                                className="
                                text-sm font-semibold 
                                bg-gradient-to-r from-amber-300 to-orange-300 
                                text-transparent bg-clip-text
                            "
                            >
                                Pro
                            </span>
                        </Link>
                    )}

                    <SignedIn>
                        <RunButton />
                    </SignedIn>

                    {/* Profile Section with Subtle Separator */}
                    <div className="pl-4 border-l border-white/10">
                        <HeaderProfileBtn />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;
