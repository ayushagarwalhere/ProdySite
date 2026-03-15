type Props = {
  title: string;
  description: string;
  team: string;
  image: string;
};

export default function ProjectCard({ title, description, team, image }: Props) {
  return (
    <div
      className="w-[380px] h-[260px] rounded-[24px] p-6 text-white flex flex-col justify-between bg-cover bg-center bg-no-repeat overflow-hidden relative"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div
        className="absolute inset-0 rounded-[24px] z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
        }}
      />
      <div className="relative z-[2] flex flex-col">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="relative z-[2] flex flex-col gap-2">
        <span>Team Members: {team}</span>
        <button
          type="button"
          className="w-fit bg-[#f4d6a0] border-none py-1.5 px-3.5 rounded-[90px] font-semibold text-black"
        >
          Leader
        </button>
      </div>
    </div>
  );
}
