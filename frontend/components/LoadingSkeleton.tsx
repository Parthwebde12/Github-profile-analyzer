export default function LoadingSkeleton() {
  return (
    <div
      className="mt-8 animate-pulse space-y-6"
      aria-busy="true"
      aria-label="Loading profile"
    >
      <div className="h-44 rounded-xl bg-gray-200" />
      <div className="h-56 rounded-xl bg-gray-200" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-28 rounded-xl bg-gray-200" />
        <div className="h-28 rounded-xl bg-gray-200" />
        <div className="h-28 rounded-xl bg-gray-200" />
        <div className="h-28 rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}