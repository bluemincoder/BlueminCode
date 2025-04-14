import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import ProPlanView from "./_components/ProPlanView";
import NavigationHeader from "@/components/NavigationHeader";
import { ENTERPRISE_FEATURES, FEATURES } from "./_constants";
import { Star } from "lucide-react";
import FeatureCategory from "./_components/FeatureCategory";
import FeatureItem from "./_components/FeatureItem";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Spotlight } from "@/components/spotlight-new";
import UpgradeButton from "./_components/UpgradeButton";
import LoginButton from "@/components/LoginButton";
// import UpgradeButton from "./_components/UpgradeButton";
// import LoginButton from "@/components/LoginButton";

async function PricingPage() {
    const user = await currentUser();
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const convexUser = await convex.query(api.users.getUser, {
        userId: user?.id || "",
    });

    if (convexUser?.isPro) return <ProPlanView />;

    return (
        <div
            className="relative min-h-screen bg-[#0a0a0f] selection:bg-blue-500/20
     selection:text-blue-200"
        >
            <Spotlight />
            <div className="relative top-0 px-4 sm:px-6 md:px-9">
                <NavigationHeader />
            </div>

            {/* main content */}

            <main className="relative pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-24 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Hero   */}
                    <div className="text-center mb-12 sm:mb-16 md:mb-24">
                        <div className="relative inline-block">
                            <h1
                                className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold bg-gradient-to-r
               from-gray-100 to-gray-300 text-transparent bg-clip-text mb-4 sm:mb-6 md:mb-8"
                            >
                                Elevate Your <br className="hidden sm:block" />
                                Development Experience
                            </h1>
                        </div>
                        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                            Join the next generation of developers with our
                            professional suite of tools
                        </p>
                    </div>

                    {/* Enterprise Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-24">
                        {ENTERPRISE_FEATURES.map((feature) => (
                            <div
                                key={feature.label}
                                className="group relative bg-gradient-to-b from-[#12121a] to-[#0a0a0f] rounded-2xl p-4 sm:p-6 hover:transform hover:scale-[1.02] transition-all duration-300"
                            >
                                <div className="relative">
                                    <div
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                  flex items-center justify-center mb-3 sm:mb-4 ring-1 ring-gray-800/60 group-hover:ring-blue-500/20"
                                    >
                                        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                                    </div>

                                    <h3 className="text-base sm:text-lg font-medium text-white mb-1.5 sm:mb-2">
                                        {feature.label}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-400">
                                        {feature.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pricing Card */}

                    <div className="relative max-w-4xl mx-auto">
                        <div
                            className="absolute -inset-px bg-gradient-to-r from-blue-500
             to-purple-500 rounded-2xl blur opacity-10"
                        />
                        <div className="relative bg-[#12121a]/90 backdrop-blur-xl rounded-2xl">
                            <div
                                className="absolute inset-x-0 -top-px h-px bg-gradient-to-r 
              from-transparent via-blue-500/50 to-transparent"
                            />
                            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

                            <div className="relative p-6 sm:p-8 md:p-12">
                                {/* header */}
                                <div className="text-center mb-8 sm:mb-12">
                                    <div className="inline-flex p-2 sm:p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 ring-1 ring-gray-800/60 mb-4 sm:mb-6">
                                        <Star className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3 sm:mb-4">
                                        Lifetime Pro Access
                                    </h2>
                                    <div className="flex items-baseline justify-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                                        <span className="text-xl sm:text-2xl text-gray-400">
                                            ₹
                                        </span>
                                        <span className="text-4xl sm:text-5xl md:text-6xl font-semibold bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text">
                                            1999/-
                                        </span>
                                        <span className="text-lg sm:text-xl text-gray-400">
                                            one-time
                                        </span>
                                    </div>
                                    <p className="text-base sm:text-lg text-gray-400">
                                        Unlock the full potential of CodeCraft
                                    </p>
                                </div>

                                {/* Features grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
                                    <FeatureCategory label="Development">
                                        {FEATURES.development.map(
                                            (feature, idx) => (
                                                <FeatureItem key={idx}>
                                                    {feature}
                                                </FeatureItem>
                                            )
                                        )}
                                    </FeatureCategory>

                                    <FeatureCategory label="Collaboration">
                                        {FEATURES.collaboration.map(
                                            (feature, idx) => (
                                                <FeatureItem key={idx}>
                                                    {feature}
                                                </FeatureItem>
                                            )
                                        )}
                                    </FeatureCategory>

                                    <FeatureCategory label="Deployment">
                                        {FEATURES.deployment.map(
                                            (feature, idx) => (
                                                <FeatureItem key={idx}>
                                                    {feature}
                                                </FeatureItem>
                                            )
                                        )}
                                    </FeatureCategory>
                                </div>

                                {/* CTA */}
                                <div className="flex justify-center shadow-blue-500/20">
                                    <SignedIn>
                                        <UpgradeButton />
                                    </SignedIn>

                                    <SignedOut>
                                        <LoginButton />
                                    </SignedOut>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
export default PricingPage;
