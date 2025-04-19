import { SparklesCore } from "@/components/Sparkles";
import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
    return (
        <div className="min-h-screen-[500px] bg-[#0a0a0f]">
            <div className="w-full absolute inset-0 h-screen">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={70}
                    className="w-full h-full"
                    particleColor="#94a3b8"
                />
            </div>
            <div className="relative top-0 mx-auto">
                <Header />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <EditorPanel />
                    <OutputPanel />
                </div>
            </div>
        </div>
    );
}
