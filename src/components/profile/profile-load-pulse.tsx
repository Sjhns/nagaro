export const ProfileLoadPulse = () => {
  return (
    <div className="flex-1 animate-pulse">
      <div className="bg-slate-800 h-48 w-full"></div>

      <div className="flex items-center justify-between px-4 pt-4 z-50">
        <div className="-mt-24 w-max min-w-max z-40">
          <div className="rounded-full bg-slate-500 w-[128px] h-[128px]"></div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="h-4 w-20 bg-slate-800 rounded"></div>
          <div className="h-4 w-20 bg-slate-800 rounded"></div>
        </div>
      </div>

      <div className="px-4">
        <div className="space-y-4 px-4 mt-5">
          <div className="h-6 w-36 bg-slate-800 rounded"></div>
          <div className="flex items-center space-x-3">
            <div className="h-4 w-20 bg-slate-800 rounded"></div>
            <div className="h-4 w-20 bg-slate-800 rounded"></div>
          </div>
          <div className="h-4 w-1/2 bg-slate-800 rounded"></div>
        </div>

        <div className="flex items-center justify-between mt-16 gap-x-8">
          <div className="h-4 w-1/2 bg-slate-800 rounded"></div>
          <div className="h-4 w-1/2 bg-slate-800 rounded"></div>
          <div className="h-4 w-1/2 bg-slate-800 rounded"></div>
        </div>
      </div>
    </div>
  )
}
