"use client";

import Link from "next/link";

import { useArtistAlbums } from "@/client/hooks/useAlbums";
import SongCard from "@/components/shared/songs/songCard";
import SongCardListWrapper from "@/components/shared/songs/songCardListWrapper";
import Loading from "@/components/shared/loading/loading";

interface ArtistAlbumsProps {
  artistId: string;
}
const AllArtistAlbums = ({ artistId }: ArtistAlbumsProps) => {
  const {
    data: albums,
    isLoading,
    isRefetching,
  } = useArtistAlbums({ artistId });

  if (isLoading || isRefetching) {
    return <Loading />;
  }

  if (albums?.length === 0) {
    return <p className="text-center md:text-start">No albums found</p>;
  }

  if (!albums) return null;

  return (
    <SongCardListWrapper>
      {albums?.map((album) => (
        <Link href={`/artists/${artistId}/${album.id}`} key={album.id}>
          <SongCard
            title={album.name}
            subtitle={album.artist.name}
            imageSrc={album.image || ""}
          />
        </Link>
      ))}
    </SongCardListWrapper>
  );
};

export default AllArtistAlbums;
