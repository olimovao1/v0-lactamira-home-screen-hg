import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-pink-50 pb-20">
      {/* Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Skeleton className="w-6 h-6 mr-4" />
              <Skeleton className="h-6 w-48" />
            </div>
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {/* Progress Bar */}
        <Skeleton className="h-2 w-full mb-6 rounded-full" />

        {/* Guidance Areas Section */}
        <div className="card mb-6">
          <Skeleton className="h-6 w-64 mb-4" />
          <Skeleton className="h-4 w-full mb-4" />

          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 border-2 border-gray-200 rounded-xl">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-8 h-8" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>

          <Skeleton className="h-16 w-full mt-4 rounded-xl" />
        </div>

        {/* AI Provider Section */}
        <div className="card mb-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-4 w-full mb-4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="p-4 border-2 border-gray-200 rounded-xl">
                <div className="flex items-center space-x-3 mb-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-24 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <div className="space-y-1">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="card mb-6">
          <Skeleton className="h-6 w-40 mb-4" />

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}

            <div>
              <Skeleton className="h-4 w-48 mb-2" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 flex-1" />
        </div>
      </main>
    </div>
  )
}
