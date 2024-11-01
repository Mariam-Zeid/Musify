interface InfoCardProps {
  title: string;
  total: number;
  Icon: React.ComponentType<{ size?: number }>;
}

const InfoCard = ({ title, total, Icon }: InfoCardProps) => {
  return (
    <div className="bg-[#20201f] rounded-xl overflow-hidden shadow-sm p-3 flex sm:flex-col justify-around sm:justify-center items-center sm:gap-y-2">
      <Icon size={45} />
      <p className="flex flex-col items-center text-lg capitalize font-semibold">
        Total {title}
        <span className="text-3xl font-bold">{total}</span>
      </p>
    </div>
  );
};

export default InfoCard;
