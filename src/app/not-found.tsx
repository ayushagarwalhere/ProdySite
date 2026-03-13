import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-background text-white">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <Link href="/" className="mt-10 text-white font-medium">Go To Home</Link>
    </div>
  )
}

export default NotFound;
