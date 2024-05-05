"use client";
import AI from "@/components/CardContainer/AI";
import ARVR from "@/components/CardContainer/ARVR";
import BTP from "@/components/CardContainer/BTP";
import CBC from "@/components/CardContainer/CBC";
import Codex from "@/components/CardContainer/Codex";
import GDSC from "@/components/CardContainer/GDSC";
import Mosaic from "@/components/CardContainer/Mosaic";
import SpaceAstronomy from "@/components/CardContainer/SpaceAstronomy";
import TPC from "@/components/CardContainer/TPC";
import WWR from "@/components/CardContainer/WWR";
import Footer from "@/components/Footer";
import { Heading } from "@/components/Heading";
import Navbar from "@/components/Navbar";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  return (
    <>
      <Navbar/>
      {/* value proposition section */}
      <main className="bg-fixed">
        <div>
          <div className="relative-isolate">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
              <div style={{
                clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }}
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#ae5e66] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
            </div>

            <div className="flex lg:flex-row flex-col justify-center items-center w-full">
              <div className="flex flex-col justify-center items-center text-center w-full z-30">
                <Heading />
                <div className="w-full mx-auto h-full flex flex-wrap justify-evenly">
                  <CBC />
                  <Codex />
                  <GDSC />
                  <AI />
                  <Mosaic />
                  <ARVR />
                  <WWR />
                  <TPC />
                  <SpaceAstronomy />
                  <BTP />
                </div>
              </div>              
            </div>
          </div>
        </div>

        {/* Feature Section */}

        <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
          <div className="mb-12 px-6 lg:px-8 ">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 font-bold text-4xl text-gray-200 sm:text-5xl">Register in minutes!</h2>
              <p className="mt-4 text-lg text-zinc-400">Registering have never been easier than with <span className="font-semibold">symbiSoc</span></p>
            </div>
          </div>

          {/*steps*/}
          <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-violet-600">Step 1</span>
                <span className="text-xl font-semibold">Create an account</span>
                <span className="mt-2 text-zinc-400">Create an account using your college email and password and sign-in.</span>
              </div>
            </li>
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-violet-600">Step 2</span>
                <span className="text-xl font-semibold">Fill up the form</span>
                <span className="mt-2 text-zinc-400">Click on the view events and just click register. Voila!🥳</span>
              </div>
            </li>
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-violet-600">Step 3</span>
                <span className="text-xl font-semibold">Enjoy your event</span>
                <span className="mt-2 text-zinc-400">It&apos;s that simple!🎉</span>
              </div>
            </li>
          </ol>
        </div>
        <BackgroundBeams className="fixed"/>
      </main>
      <Footer/>
    </>
  )
}