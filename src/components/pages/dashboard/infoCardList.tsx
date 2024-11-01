import { BiSolidAlbum } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { IoMusicalNotes } from "react-icons/io5";

import InfoCard from "@/components/pages/dashboard/infoCard";

const InfoCardList = () => {
  return (
    <div
      className="
          grid 
          grid-cols-1 
          sm:grid-cols-3
          gap-4 
          mt-4"
    >
      <InfoCard
        title="artists"
        total={50}
        Icon={FaUsers}
      />
      <InfoCard
        title="albums"
        total={50}
        Icon={BiSolidAlbum}
      />
      <InfoCard
        title="tracks"
        total={50}
        Icon={IoMusicalNotes}
      />
    </div>
  );
};

export default InfoCardList;
