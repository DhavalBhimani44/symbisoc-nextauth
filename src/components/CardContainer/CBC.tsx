"use client"
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Image from "next/image";


const CBC = () => {
  return (
        <CardContainer className="inter-var">
            <CardBody className="bg-gradient-to-br from-blue-100 to-purple-100 hover:bg-gradient-to-br hover:from-blue-200 hover:to-purple-200 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                CBC(Cyber Blockchain Club)
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4 h-60 overflow-hidden">
                <Image
                    src='/cbc-logo.png'
                    height="1000"
                    width="1000"
                    className="h-full w-full object-contain rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                />
                </CardItem>
                <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus tempora iusto nulla repellat commodi laudantium officiis asperiores consequuntur sequi eius!
                </CardItem>
            </CardBody>
        </CardContainer>
  )
}

export default CBC