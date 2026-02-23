import { LoadingBar } from "@/components/ui/loading-bar"

export default function Loading() {
    return (
        <div className="fixed top-0 left-0 right-0 z-[100]">
            <LoadingBar message="Loading page..." className="rounded-none h-1" />
            <div className="min-h-[60vh] flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <div className="max-w-md w-full p-8 text-center space-y-4 bg-background border rounded-3xl shadow-2xl">
                    <h2 className="text-2xl font-bold font-headline">Just a moment...</h2>
                    <p className="text-muted-foreground">Dhan Mitra is preparing your financial tools.</p>
                    <LoadingBar />
                </div>
            </div>
        </div>
    )
}
