"use client";

import Link from "next/link";
import { useArtists } from "@/client/hooks/useArtists";
import SongCard from "@/components/shared/songs/songCard";
import SongCardListWrapper from "@/components/shared/songs/songCardListWrapper";
import Loading from "@/components/shared/loading/loading";

const TopArtists = () => {
  const { data: artists, isLoading } = useArtists();
  const topArtists = artists?.slice(0, 5) || [];

  if (isLoading) {
    return <Loading />;
  }

  if (artists?.length === 0) {
    return <p className="mt-4">No artists has been added</p>;
  }

  return (
    <SongCardListWrapper>
      {topArtists?.map((artist) => (
        <Link href={`/artists/${artist.id}`} key={artist.id}>
          <SongCard
            imageSrc={artist.image || ""}
            title={artist.name}
            subtitle=""
          />
        </Link>
      ))}
    </SongCardListWrapper>
  );
};

export default TopArtists;
