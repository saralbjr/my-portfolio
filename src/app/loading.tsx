export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero Skeleton */}
      <section className="min-h-screen flex items-center">
        <div className="section-inner w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 pt-[var(--nav-height)]">
          <div className="flex-1 space-y-4 w-full">
            <div className="skeleton h-8 w-48 mb-6" />
            <div className="skeleton h-16 w-3/4" />
            <div className="skeleton h-8 w-2/3" />
            <div className="skeleton h-6 w-full max-w-lg" />
            <div className="skeleton h-6 w-4/5 max-w-lg" />
            <div className="flex gap-4 pt-4">
              <div className="skeleton h-12 w-40 rounded-xl" />
              <div className="skeleton h-12 w-36 rounded-xl" />
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="skeleton w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full" />
          </div>
        </div>
      </section>

      {/* About Skeleton */}
      <section>
        <div className="section-inner">
          <div className="skeleton h-12 w-48 mx-auto mb-16" />
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-4">
              <div className="skeleton w-40 h-40 rounded-full mx-auto lg:mx-0" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-5/6" />
              <div className="skeleton h-4 w-4/5" />
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="skeleton h-40 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Skeleton */}
      <section>
        <div className="section-inner">
          <div className="skeleton h-12 w-48 mx-auto mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-80 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
