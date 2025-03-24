import Image from "next/image";
import React from "react";

const Hero = () => {
    return (
        <div className=" w-full flex flex-row text-[#242424] ">
            <div className="w-[70%] container max-w-screen-lg mx-auto">
                <div className="flex flex-col justify-center items-center h-full">
                    <h1 className="text-[110px] leading-[100px] font-semibold text-black">
                        Human <br />Stories & ideas
                    </h1>
                    <div className="pt-12">

                        <p className="text-[30px] leading-[35px] ">A place to read, write, and deepen your understanding..</p>

                        <div className="pt-12 ">

                            <button className="border rounded-full px-8 py-3 bg-black text-white">
                                Start Reading
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[30%] ">
                <Image
                    src="/hero.webp"
                    alt="Hero Image"
                    width={420}
                    height={500}
                    objectFit="cover"
                    objectPosition="center"

                />
            </div>


        </div>
    );
};

export default Hero;
