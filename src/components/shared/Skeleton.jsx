export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-xl" />
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-gray-200 rounded-full w-3/4" />
          <div className="h-2.5 bg-gray-100 rounded-full w-1/2" />
        </div>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full w-full" />
      <div className="h-2.5 bg-gray-100 rounded-full w-5/6" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 p-4 animate-pulse">
      <div className="w-9 h-9 bg-gray-200 rounded-xl" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-200 rounded-full w-1/3" />
        <div className="h-2 bg-gray-100 rounded-full w-1/4" />
      </div>
      <div className="h-7 w-20 bg-gray-100 rounded-lg" />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-7 bg-gray-200 rounded-lg w-48" />
      <div className="h-4 bg-gray-100 rounded-lg w-64" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
