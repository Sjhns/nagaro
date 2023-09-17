export const SlideCarousel = () => {
  return (
    <div className="mt-[1rem] w-full  h-[14rem] max-h-[14rem] rounded-sm overflow-hidden">
      <div className="w-full h-full">
        <video
          autoPlay={true}
          muted={true}
          loop={true}
          src="/mylivewallpapers.com-Beru-Solo-Levelling.mp4"
          className="w-full h-full object-cover object-center"
        ></video>
      </div>
    </div>
  )
}
