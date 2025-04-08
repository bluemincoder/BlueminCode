import { currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import NavigationHeader from "@/components/NavigationHeader";
import { Star } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import ProPlanView from "./_components/ProPlanView";

async function PricingPage() {
    const user = await currentUser();
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const convexUser = await convex.query(api.users.getUser, {
        userId: user?.id || "",
    });

    if (convexUser?.isPro) return <ProPlanView />;

    return <div>PricingPage</div>;
}
export default PricingPage;
