import React  from "react";
import Typed from "react-typed"

function Hero() {
    return (
        <div className="text-[#D1C5C0]">
            <div className="max-h-[700px] relative">
                <div className="absolute w-full h-full max-h-[500px] text-center justify-center items-center sm:pt-10 md:pt-18 lg:pt-36">
                    <p className="font-bebas text-sm lg:text-xl md:text-lg sm:text-md">Welcome to</p>
                    <h1 className="font-cyberpunk text-5xl lg:text-8xl md:text-7xl sm:text-6xl text-[#FDF500] pt-4">DBPC</h1>
                    <div className="flex justify-center items-center pt-2 md:pt-4 lg:pt-4">
                        <p className="font-bebas text-md lg:text-3xl md:text-xl sm:text-lg">Top quality</p>
                        <Typed className="font-bebas text-lg lg:text-4xl md:text-3xl sm:text-xl pl-2 text-[#37ebf3]" strings={['PC components', 'Gaming gear']} typeSpeed={120} backSpeed={140} loop />
                    </div>
                    <p className="font-bebas text-sm lg:text-xl md:text-lg sm:text-md">Step up your game with a PC built with a full range of high end components</p>
                    <button className="buttonHero bg-[#FDF500] text-sm text-black font-bebas w-[100px] mx-auto my-1 py-1 sm:my-2 sm:py-2 md:my-4 md:py-4 md:w-[200px] md:text-xl">Shop now</button>
                </div>
                <img className="w-full max-h-[700px] object-cover" src="https://images.saymedia-content.com/.image/t_share/MTc0MjcwNDU3NTk4NDUzNjI4/best-2-000-gaming-pc-desktop.jpg"/>
            </div>
        </div>
    )
}

export default Hero