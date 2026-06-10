export default function SkeletonCard() {
  return (
    <div className="w-full rounded-xl border border-default-200 bg-white overflow-hidden animate-pulse">
      <div className="h-48 md:h-56 bg-default-200 rounded-t-lg" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-default-200 rounded w-3/4" />
        <div className="h-3 bg-default-200 rounded w-full" />
        <div className="h-3 bg-default-200 rounded w-2/3" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 bg-default-200 rounded w-20" />
          <div className="h-8 bg-default-200 rounded w-24" />
        </div>
      </div>
    </div>
  )
}
