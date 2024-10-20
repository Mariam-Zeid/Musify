"use client";

import Link from "next/link";
import { useArtists } from "@/client/hooks/useArtists";
import SongCard from "@/components/shared/songs/songCard";
import SongCardListWrapper from "@/components/shared/songs/songCardListWrapper";
import Loading from "@/components/shared/loading/loading";

const AllArtists = () => {
  const { data: artists, isLoading } = useArtists();

  if (isLoading) {
    return <Loading />;
  }
  if (artists?.length === 0) {
    return <p>No artists has been added</p>;
  }

  return (
    <SongCardListWrapper>
      {artists?.map((artist) => (
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

export default AllArtists;
