import Image from "next/image";

const ProfileCard = () => {
  return (
    <div className="relative w-[280px]">
      <h1 className="absolute top-0.5 left-0.5 text-sm text-[#5B1F11] font-[Accia_Moderato]">
        Profile Page
      </h1>

      <div
        className="grid grid-rows-[auto_auto] gap-4 place-items-center bg-[#4b507f] rounded-[20px] text-center text-[#e4b97a] relative pt-10 px-5 pb-5"
        style={{
          clipPath:
            "polygon(0% 8%, 26% 8%, 35% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      >
        <div className="relative flex justify-center items-center">
          <div className="absolute w-[160px] h-[160px] border-[6px] border-[#e4b97a] rounded-full top-0 left-0 z-[1]" />
          <div className="absolute w-[130px] h-[130px] bg-[#e4b97a] rounded-full top-[15px] left-[15px] z-[1]" />
          <div className="relative z-10">
            <Image
              src="/Profile.png"
              alt="profile"
              width={120}
              height={120}
              className="w-[90%] h-[90%] object-cover rounded-full"
            />
          </div>
        </div>

        <div className="text-center mt-5">
          <h2 className="text-2xl font-bold text-[#e4b97a] m-0">
            PRABHAV BATRA
          </h2>
          <p className="text-xs text-[#e4b97a] mt-1.5">Player ID: PDITY123455</p>
        </div>

        <div
          className="absolute w-7 h-7 rounded-full bg-[#e4b97a] text-[#3f4674] flex items-center justify-center mt-3.5 mx-auto font-bold"
          style={{ marginTop: "14px" }}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
