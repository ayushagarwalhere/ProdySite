import Image from "next/image";
import Link from "next/link";

export default function Login() {
    return (
        <div className="w-screen min-h-screen bg-[#e2c098] flex items-stretch justify-center font-sans p-4 md:p-0">
            <div className="flex flex-col md:flex-row w-full max-w-[1400px] p-0 md:p-8 gap-6 md:gap-16">
                <div className="relative flex-none md:flex-[0_0_45%] min-h-[25vh] md:min-h-[80vh] rounded-xl md:rounded-[20px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                    <Image
                        src="/rectangle1.png"
                        alt="Egyptian thematic image"
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="object-cover object-center"
                        priority
                    />
                </div>

                <div className="flex-1 flex flex-col justify-center p-0 md:pr-16 md:pl-8">
                    <div className="max-w-none md:max-w-[500px]">
                        <h1 className="text-[2.2rem] md:text-4xl lg:text-[3.5rem] text-[#5B1F11] font-semibold mb-4 md:mb-6 tracking-tight text-center md:text-left leading-tight">Log in</h1>
                        <p className="text-base md:text-[1.1rem] text-[#5B1F11] mb-8 md:mb-10 text-center md:text-left">
                            Don&apos;t have an account ? <Link href="/signup" className="text-[#B36633] no-underline font-semibold hover:underline">Sign up</Link>
                        </p>

                        <form className="flex flex-col gap-5">
                            <div className="relative w-full">
                                <input
                                    type="email"
                                    placeholder="College Email"
                                    className="w-full px-4 py-3.5 md:px-5 md:py-4 text-base rounded-xl border-none bg-[#B36633]/40 text-[#5B1F11] outline-none transition-opacity placeholder:text-[#B36633] focus:outline focus:outline-2 focus:outline-[#5B1F11]"
                                    required
                                />
                            </div>

                            <div className="relative w-full">
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3.5 md:px-5 md:py-4 text-base rounded-xl border-none bg-[#B36633]/40 text-[#5B1F11] outline-none transition-opacity placeholder:text-[#B36633] focus:outline focus:outline-2 focus:outline-[#5B1F11]"
                                    required
                                />
                                <button type="button" className="absolute right-4 md:right-5 top-1/2 -translate-y-1/2 bg-none border-none text-[#5B1F11] cursor-pointer flex items-center justify-center p-0 opacity-90 hover:opacity-100">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>

                            <label className="flex items-center gap-3 my-2 md:my-4 cursor-pointer">
                                <input type="checkbox" className="w-[18px] h-[18px] cursor-pointer accent-[#B36633] border-none" />
                                <span className="text-[#5B1F11] text-sm md:text-base">Remember me</span>
                            </label>

                            <button type="submit" className="w-full p-4 md:p-[1.2rem] bg-[#5B1F11] text-[#e2c098] border-none rounded-xl text-lg md:text-[1.1rem] font-semibold cursor-pointer transition-colors hover:bg-[#43160c] mt-4">
                                Log in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
