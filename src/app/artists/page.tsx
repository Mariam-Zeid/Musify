import Link from "next/link";

import { Button } from "@/components/ui/button";
import SongCardListWrapper from "@/components/shared/songs/songCardListWrapper";
import SongCard from "@/components/shared/songs/songCard";

const AllArtistsPage = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-center sm:text-start">
        All Artists
      </h1>
      <Button variant="musify" className="max-w-max">
        <Link href="/artists/new-artist">Add Artist</Link>
      </Button>
      <SongCardListWrapper>
        <Link href="/artists/1">
          <SongCard title="Tul8te" />
        </Link>
      </SongCardListWrapper>
    </div>
  );
};

export default AllArtistsPage;
