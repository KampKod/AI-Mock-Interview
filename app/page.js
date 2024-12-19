// import { Button } from "@/components/ui/button";
// import Image from "next/image";
import Header from "./dashboard/_components/Header";
import { AtomIcon, Edit, Share2 } from "lucide-react";
import FooterPage from "@/components/ui/footerpage";
import { MacbookScroll } from "@/components/ui/mackbook-scroll";
import { AnimatedTestimonials } from "@/components/ui/animated-testinomials";
import { Testimonials } from "./content/testinomials";
export default function Home() {
  return (
    <>
      {/* <TopNavBar /> */}
    
      <div>
        {/* Background Grid */}
        {/* <div className="relative z-[-1]">
        <Image
          src={'/grid.svg'}
          alt="Background Grid"
          className="absolute top-0 left-0 w-full h-full object-cover"
          layout="fill" // This tells Next.js Image to fill the parent container
        />
      </div> */}


        <Header />
        <MacbookScroll  src="/macScreen.png"/>

        <section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12 md:mt-[50vh] sm:mt-[20vh]">
          <h2 className="font-bold text-3xl">How it Works?</h2>
          <h2 className="text-md text-gray-500">Give mock interview in just 3 simple easy steps</h2>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <AtomIcon className="h-8 w-8" />

              <h2 className="mt-4 text-xl font-bold text-black">Write prompt for your form</h2>

              <p className="mt-1 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci
                distinctio alias voluptatum blanditiis laudantium.
              </p>
            </a>

            <a
              className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Edit className="h-8 w-8" />

              <h2 className="mt-4 text-xl font-bold text-black">Edit Your form</h2>

              <p className="mt-1 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci
                distinctio alias voluptatum blanditiis laudantium.
              </p>
            </a>

            <a
              className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Share2 className="h-8 w-8" />

              <h2 className="mt-4 text-xl font-bold text-black">Share & Start Accepting Responses</h2>

              <p className="mt-1 text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci
                distinctio alias voluptatum blanditiis laudantium.
              </p>
            </a>
          </div>

          <div className="mt-12 text-center">
          <a href="/dashboard" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                Get Started
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </a>
          </div>
        </section>
      </div>
      <AnimatedTestimonials testimonials={Testimonials}/>
      <FooterPage />
    </>
  );
}
