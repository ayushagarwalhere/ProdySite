import Image from "next/image";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#fafafa] dark:bg-black p-8 md:p-0">
            <main className="flex min-h-screen md:min-h-auto w-full max-w-[800px] flex-col items-start md:items-center justify-between md:justify-center bg-white dark:bg-black p-12 md:p-10 gap-8">
                <div className="flex flex-col items-start md:items-center text-left md:text-center gap-6">
                    <h1 className="max-w-[320px] text-[40px] md:text-[32px] font-semibold leading-[48px] md:leading-tight tracking-[-2.4px] text-black dark:text-[#ededed]">To get started, edit the page.tsx file.</h1>
                    <p className="max-w-[440px] text-lg md:text-base leading-[32px] text-[#666] dark:text-[#999]">
                        Looking for a starting point or more instructions? Head over to{" "}
                        <a
                            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-black dark:text-[#ededed]"
                        >
                            Templates
                        </a>{" "}
                        or the{" "}
                        <a
                            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-black dark:text-[#ededed]"
                        >
                            Learning
                        </a>{" "}
                        center.
                    </p>
                </div>
                <div className="flex flex-row md:flex-col w-full max-w-[440px] gap-4 text-sm md:items-center">
                    <a
                        className="flex justify-center items-center h-10 px-4 rounded-full border border-transparent transition-colors cursor-pointer w-fit md:w-full font-medium bg-black dark:bg-[#ededed] text-white dark:text-black gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc]"
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className="dark:invert"
                            src="/vercel.svg"
                            alt="Vercel logomark"
                            width={16}
                            height={16}
                        />
                        Deploy Now
                    </a>
                    <a
                        className="flex justify-center items-center h-10 px-4 rounded-full border border-[#ebebeb] dark:border-[#1a1a1a] transition-colors cursor-pointer w-fit md:w-full font-medium hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent"
                        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Documentation
                    </a>
                </div>
            </main>
        </div>
    );
}
