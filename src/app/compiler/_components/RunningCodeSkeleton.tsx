const RunningCodeSkeleton = () => (
    <div className="space-y-3 sm:space-y-4 animate-pulse">
        <div className="space-y-1.5 sm:space-y-2">
            <div className="h-3 sm:h-4 bg-gray-800/30 rounded w-3/4" />
            <div className="h-3 sm:h-4 bg-gray-800/30 rounded w-1/2" />
            <div className="h-3 sm:h-4 bg-gray-800/30 rounded w-5/6" />
        </div>

        <div className="space-y-1.5 sm:space-y-2 pt-3 sm:pt-4">
            <div className="h-3 sm:h-4 bg-gray-800/30 rounded w-2/3" />
            <div className="h-3 sm:h-4 bg-gray-800/30 rounded w-4/5" />
            <div className="h-3 sm:h-4 bg-gray-800/30 rounded w-3/4" />
        </div>
    </div>
);

export default RunningCodeSkeleton;
