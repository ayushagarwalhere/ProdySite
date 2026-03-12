import { Oswald } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });

export default function Events() {
    return (
        <div className="w-screen h-auto min-h-screen md:h-screen relative overflow-y-auto md:overflow-hidden bg-black flex font-sans">
            <div
                className="absolute inset-0 bg-cover bg-center brightness-[0.85] z-[1]"
                style={{ backgroundImage: "url('/bg.png')" }}
            />

            <div className="relative z-[2] w-full h-auto md:h-full flex flex-col justify-start md:justify-between p-6 md:p-[8rem_6rem]">
                <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="flex flex-col justify-center pl-0 md:pl-20 mb-8 md:mb-0">
                        <div className="mb-10 uppercase flex flex-col">
                            <h1 className="[font-family:'Gobold',sans-serif] font-normal leading-[1.1] text-[60px] md:text-[80px] lg:text-[118px] text-white m-0">
                                SAIL<br />BOAT
                            </h1>
                            <h2 className={`${oswald.className} font-light text-[#E7BA7F] mt-[10px] md:mt-[20px] text-[4rem] md:text-[5rem] lg:text-[8rem] leading-none tracking-[2px]`}>
                                SAILING
                            </h2>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center w-full md:w-[45%] max-w-none md:max-w-[550px] pr-0 md:pr-8 mt-0 md:mt-[-5%]">
                        <div className="">
                            <h2 className="[font-family:'Akira_Expanded',sans-serif] text-[24px] md:text-[36px] font-[900] text-[#E7BA7F] [-webkit-text-stroke:1px_#000] leading-[1.1] mb-6">
                                LOREM IPSUM
                                <br />
                                DOLOR
                            </h2>
                            <p className="text-base md:text-[20px] leading-relaxed md:leading-[1.4] text-white mb-6 md:mb-10 [text-shadow:1px_1px_3px_rgba(0,0,0,0.6)]">
                                Lorem ipsum dolor sit amet consectetur. Pulvinar
                                sed leo nisl ut nulla morbi arcu. Gravida pharetra
                                natoque dui congue fermentum sit eu vitae sem.
                                Leo dignissim nisl nisl dui faucibus aliquet enim.
                                Tellus in pharetra pharetra venenatis. Diam.
                            </p>
                            <div className="flex gap-4 md:gap-8">
                                <button className="bg-[#E7BA7F] text-[#2b1f13] border-none py-3 px-4 md:p-[0.8rem_2rem] font-bold text-base md:text-[1.1rem] cursor-pointer flex-1 md:flex-none">REGISTER</button>
                                <button className="bg-transparent text-[#E7BA7F] border border-[#E7BA7F] py-3 px-4 md:p-[0.8rem_2rem] text-base md:text-[1.1rem] cursor-pointer flex-1 md:flex-none">ABSTRACT</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative md:absolute bottom-auto md:bottom-0 right-auto md:right-0 z-[3] mt-8 md:mt-0">
                    <div className="bg-[#2d1e14]/90 p-4 md:p-8 rounded-xl md:rounded-none md:rounded-tl-[40px] flex gap-6 overflow-x-auto md:overflow-visible flex-nowrap">
                        <button className="hidden md:flex absolute top-4 -left-2 w-7 h-7 rounded-full bg-[#E7BA7F] border-none items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L13 13M1 13L13 1" stroke="#3b2a1a" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                        <div className="min-w-[150px] md:w-[180px] h-[100px] md:h-[120px] bg-[#d9d9d9] rounded-xl"></div>
                        <div className="min-w-[150px] md:w-[150px] lg:w-[220px] h-[100px] md:h-[120px] bg-[#d9d9d9] rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
