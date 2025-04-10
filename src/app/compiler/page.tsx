import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
    return (
        <div className="min-h-screen-[500px] bg-[#0a0a0f]">
            <div className="relative top-0 px-9">
                <Header />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <EditorPanel />
                    <OutputPanel />
                </div>
            </div>
        </div>
    );
}
