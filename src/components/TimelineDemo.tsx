import { Timeline } from "@/components/ui/timeline"
import myPhoto from "@/assets/my-photo.png"
import me1 from "@/assets/about-me/me1.png"
import me2 from "@/assets/about-me/me2.png"
import me3 from "@/assets/about-me/me3.png"
import me4 from "@/assets/about-me/me4.png"
import { OntarioLogoSvgLight, OntarioLogoSvgDark } from "@/assets/OntarioLogoSvg"
import stockll from "@/assets/projects/stockll.png"

const IMG_CLASS =
  "rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"

export function TimelineDemo() {
  const data = [
    {
      title: "About Me",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8">
          Hello! I’m Wanyi Chen, a 2nd year Computer Science student at Western University. I love attending hackathons and even running them! 
          <br /> Whenever I can, I play badminton or a winter sport (skiing, snowboarding, skating) with friends and whatever my current mobile game fixation is (currently Nonagram).
          <br />
          Feel free to connect and reach out to chat :)
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img src={me1} alt="" width={500} height={500} className={IMG_CLASS} />
            <img src={me2} alt="" width={500} height={500} className={IMG_CLASS} />
            <img src={me3} alt="" width={500} height={500} className={IMG_CLASS} />
            <img src={me4} alt="" width={500} height={500} className={IMG_CLASS} />
          </div>
        </div>
      ),
    },
    {
      title: "Experience",
      content: (
        <div>
          <div className="mb-4 flex items-center justify-start">
            <OntarioLogoSvgLight className="h-8 w-auto dark:hidden" />
            <OntarioLogoSvgDark className="hidden h-8 w-auto dark:block" />
            <div className="ml-3">
              <p className="text-neutral-800 font-bold dark:text-neutral-200 text-sm md:text-xl">
                Ontario Public Service
              </p>
              <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal">
                Software Developer | May 2025 - Aug 2025
              </p>
            </div>
          </div>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal mb-8">
            I did this
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=500&fit=crop"
              alt="Analytics"
              width={500}
              height={500}
              className={IMG_CLASS}
            />
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=500&fit=crop"
              alt="Development"
              width={500}
              height={500}
              className={IMG_CLASS}
            />
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop"
              alt="Dashboard"
              width={500}
              height={500}
              className={IMG_CLASS}
            />
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=500&fit=crop"
              alt="Collaboration"
              width={500}
              height={500}
              className={IMG_CLASS}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Projects",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal">
            My portfolio website
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
              you're looking at it :)
            </div>
          </div>

          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-normal">
            Stockll
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
              A stock market simulator built with React and Tailwind CSS.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src={stockll}
              alt="Stockll"
              width={500}
              height={500}
              className={IMG_CLASS}
            />
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=500&h=500&fit=crop"
              alt="Feature template"
              width={500}
              height={500}
              className={IMG_CLASS}
            />
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=500&fit=crop"
              alt="Bento template"
              width={500}
              height={500}
              className={IMG_CLASS}
            />
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=500&fit=crop"
              alt="Cards template"
              width={500}
              height={500}
              className={IMG_CLASS}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Skills",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            I am a full stack developer with a passion for building web applications. I am a quick learner and I am always looking to improve my skills.
          </p>
        </div>
      ),
    },
  ]
  return (
    <div className="min-h-screen w-full">
      <div className="absolute top-0 left-0 w-full">
        <Timeline data={data} profileImageSrc={myPhoto} profileImageAlt="Wanyi Chen" audioSrc="/audio/name-intro.m4a" />
      </div>
    </div>
  )
}
