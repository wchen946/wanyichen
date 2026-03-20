import { useScroll, useTransform, motion } from "framer-motion"
import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

interface TimelineEntry {
  title: string
  content: ReactNode
}

export const Timeline = ({
  data,
  profileImageSrc,
  profileImageAlt = "Profile photo",
  audioSrc,
}: {
  data: TimelineEntry[]
  profileImageSrc?: string
  profileImageAlt?: string
  audioSrc?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [height, setHeight] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playingFrame, setPlayingFrame] = useState(0)

  const toggleAudio = () => {
    if (!audioSrc) return
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      audio.currentTime = 0
      setIsPlaying(false)
    } else {
      audio.play().catch(() => setIsPlaying(false))
      setIsPlaying(true)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onEnded = () => setIsPlaying(false)
    audio.addEventListener("ended", onEnded)
    return () => audio.removeEventListener("ended", onEnded)
  }, [])

  useEffect(() => {
    if (!isPlaying) {
      setPlayingFrame(0)
      return
    }
    const interval = setInterval(() => {
      setPlayingFrame((prev) => (prev + 1) % 3)
    }, 400)
    return () => clearInterval(interval)
  }, [isPlaying])

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div
      className="w-full bg-transparent font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-2xl md:text-5xl text-neutral-600 dark:text-neutral-400 max-w-4xl font-bold">
                Hi! I'm Wanyi
              </h2>
              {audioSrc && (
                <>
                  <audio ref={audioRef} src={audioSrc} preload="metadata" />
                  <button
                    type="button"
                    onClick={toggleAudio}
                    aria-label={isPlaying ? "Pause name pronunciation" : "Play name pronunciation"}
                    className="flex-shrink-0 p-1.5 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    {isPlaying ? (
                      <SpeakerIconFrame frame={playingFrame} className="h-5 w-5 md:h-6 md:w-6 text-pink-300" />
                    ) : (
                      <SpeakerIconDefault className="h-5 w-5 md:h-6 md:w-6" />
                    )}
                  </button>
                </>
              )}
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg max-w-sm mb-2">
              CS @ Western University
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg max-w-sm mb-10">
              I love --, --, and designing.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg max-w-sm mb-4">
              Let's explore my...
            </p>
            <div className="flex flex-wrap gap-4">
              {data.map((item, index) => {
                const sectionId = item.title.toLowerCase().replace(/\s+/g, "-")
                return (
                  <a
                    key={index}
                    href={`#${sectionId}`}
                    className="rounded-full border border-amber-200 dark:border-neutral-200 backdrop-blur-md shadow-md px-4 py-2 text-base font-medium bg-amber-100 dark:bg-taupe-600 text-neutral-700 dark:text-neutral-200 hover:bg-amber-200 dark:hover:bg-taupe-500 transition-colors"
                  >
                    {item.title === "About Me" ? "self" : item.title.toLowerCase()}
                  </a>
                )
              })}
            </div>
          </div>

          {profileImageSrc ? (
            <img
              src={profileImageSrc}
              alt={profileImageAlt}
              className="flex-shrink-0 h-44 w-44 sm:h-52 sm:w-52 md:h-64 md:w-64 lg:h-72 lg:w-72 object-cover"
              loading="lazy"
            />
          ) : null}
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          const sectionId = item.title.toLowerCase().replace(/\s+/g, "-")
          return (
          <div
            key={index}
            id={sectionId}
            className="flex justify-start pt-10 md:pt-40 md:gap-10 scroll-mt-24"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center bg-[#e8edf0] dark:bg-[#101217]">
                <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-200 border border-amber-300 dark:border-amber-300" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
          )
        })}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-pink-300 via-amber-200 to-transparent from-[0%] via-[20%] rounded-full"
          />
        </div>
      </div>
    </div>
  )
}

function SpeakerIconFrame({ frame, className }: { frame: number; className?: string }) {
  const icons = [
    <SpeakerIcon1 key="1" className={className} />,
    <SpeakerIcon2 key="2" className={className} />,
    <SpeakerIcon3 key="3" className={className} />,
  ]
  return icons[frame] ?? icons[0]
}

function SpeakerIcon1({ className }: { className?: string }) {
  return (
    <svg width="38" height="26" viewBox="0 0 38 26" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
<path d="M14.5349 25C15.4191 25 16.0559 24.346 16.0559 23.4699V2.60882C16.0559 1.7327 15.4191 1 14.5089 1C13.8721 1 13.4427 1.28795 12.7538 1.94196L7.02035 7.39565C6.92539 7.47472 6.8052 7.51654 6.68198 7.51339H2.82123C0.987929 7.51339 0 8.52065 0 10.4821V15.5569C0 17.519 0.987929 18.5257 2.82123 18.5257H6.68198C6.81233 18.5257 6.92938 18.5647 7.02035 18.6434L12.7538 24.1501C13.3778 24.7383 13.8981 25 14.5349 25ZM21.9186 18.8002C22.3607 19.1144 22.9981 19.01 23.3747 18.5C24.3893 17.1261 25 15.1127 25 13.0592C25 11.0056 24.376 9.00446 23.3747 7.60491C22.9975 7.09487 22.374 6.98995 21.9186 7.30357C21.3473 7.68304 21.2818 8.35045 21.6978 8.92578C22.4522 9.94587 22.9071 11.5022 22.9071 13.0586C22.9071 14.6155 22.4256 16.1719 21.6851 17.2048C21.2946 17.7673 21.36 18.4074 21.9186 18.8002Z"/>
</svg>

  )
}

function SpeakerIcon2({ className }: { className?: string }) {
  return (
    <svg width="38" height="26" viewBox="0 0 38 26" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
<path d="M14.5321 25C15.4158 25 16.053 24.3459 16.053 23.4697V2.60847C16.053 1.73225 15.4158 1 14.5064 1C13.8693 1 13.4406 1.28739 12.7514 1.94146L7.01902 7.39565C6.92458 7.47507 6.80447 7.51689 6.68143 7.51319H2.82035C0.988186 7.51319 0 8.51989 0 10.4821V15.5567C0 17.5189 0.987627 18.5262 2.82091 18.5262H6.68143C6.8111 18.5262 6.92792 18.5655 7.01902 18.6437L12.7514 24.1496C13.3752 24.7385 13.895 25 14.5321 25ZM27.1019 22.332C27.6083 22.6716 28.2326 22.5412 28.5965 22.0181C30.3124 19.611 31.3 16.407 31.3 13.0591C31.3 9.69757 30.3252 6.49299 28.5965 4.08647C28.2197 3.57637 27.6083 3.44533 27.1019 3.78558C26.6078 4.12584 26.5295 4.76642 26.9197 5.32882C28.3366 7.42152 29.2074 10.1683 29.2074 13.0585C29.2074 15.9492 28.3623 18.7219 26.9063 20.7887C26.543 21.3511 26.6078 21.9923 27.1019 22.332ZM21.915 18.8001C22.3571 19.1144 22.9938 19.0098 23.371 18.4997C24.3849 17.1264 24.9958 15.1118 24.9958 13.0585C24.9958 11.0057 24.3721 9.00412 23.371 7.60486C22.9943 7.09476 22.3706 6.99016 21.915 7.30398C21.3432 7.68304 21.2779 8.35005 21.6943 8.92539C22.4482 9.94559 22.9032 11.5023 22.9032 13.0591C22.9032 14.6158 22.4225 16.1714 21.6814 17.2045C21.2913 17.7669 21.3561 18.4081 21.915 18.8006"/>
</svg>

  )
}

function SpeakerIcon3({ className }: { className?: string }) {
  return (
    <svg width="38" height="26" viewBox="0 0 38 26" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
<path d="M32.4343 25.7519C32.9172 26.0773 33.5556 25.9469 33.9341 25.4136C36.3195 22.003 37.7143 17.6165 37.7143 12.9699C37.7143 8.32324 36.3067 3.92267 33.9334 0.511991C33.5563 -0.0219356 32.9165 -0.15172 32.4343 0.186523C31.9393 0.524767 31.8612 1.17571 32.239 1.72241C34.3375 4.80762 35.6413 8.76437 35.6413 12.9692C35.6413 17.1734 34.3772 21.1826 32.239 24.2153C31.8612 24.7493 31.9393 25.4002 32.4343 25.7519ZM14.5752 24.8548C15.4622 24.8548 16.1006 24.2039 16.1006 23.3317V2.56903C16.1006 1.69686 15.4622 0.968588 14.5496 0.968588C13.9105 0.968588 13.4802 1.25438 12.7892 1.90532L7.04045 7.33337C6.94535 7.41186 6.82505 7.45342 6.70169 7.45037H2.82857C0.990673 7.45037 0 8.45233 0 10.4051V15.4553C0 17.4081 0.990673 18.4107 2.82857 18.4107H6.70102C6.82437 18.4077 6.94467 18.4492 7.03978 18.5277L12.7885 24.0082C13.4148 24.5932 13.9368 24.8548 14.5752 24.8548ZM27.1812 22.198C27.689 22.5369 28.3153 22.4064 28.6804 21.8859C30.4011 19.4907 31.3918 16.3019 31.3918 12.9692C31.3918 9.62443 30.4139 6.43496 28.6804 4.04036C28.3019 3.53266 27.689 3.4022 27.1806 3.74044C26.6856 4.07936 26.6074 4.71685 26.9987 5.27633C28.4197 7.35958 29.2925 10.0931 29.2925 12.9692C29.2925 15.846 28.4453 18.6057 26.9852 20.6621C26.6202 21.2222 26.6862 21.859 27.1812 22.198ZM21.9787 18.6844C22.4218 18.9971 23.0609 18.8929 23.4388 18.3851C24.4557 17.0187 25.0686 15.0141 25.0686 12.9699C25.0686 10.927 24.4422 8.93515 23.4388 7.5425C23.0609 7.0348 22.4353 6.93057 21.9787 7.24258C21.4049 7.6205 21.3396 8.28422 21.7564 8.85647C22.5134 9.87187 22.9693 11.4212 22.9693 12.9705C22.9693 14.5192 22.4871 16.0685 21.7436 17.0967C21.353 17.6562 21.4183 18.2937 21.9787 18.6844Z"/>
</svg>

  )
}

function SpeakerIconDefault({ className }: { className?: string }) {
  return <SpeakerIcon3 className={className} />
}
