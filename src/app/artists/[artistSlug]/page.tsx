"use client";

import PageHeader from "@/components/shared/page header/pageHeader";
import { useArtist, useArtistMutations } from "@/client/hooks/useArtists";
import Loading from "@/components/shared/loading/loading";
import AllArtistAlbums from "@/components/pages/albums/allArtistAlbums";

interface ArtistProps {
  params: {
    artistSlug: string;
  };
}

const ArtistPage = ({ params }: ArtistProps) => {
  const { data: artist, isFetched } = useArtist({
    artistId: params.artistSlug,
  });
  const { deleteArtist } = useArtistMutations();

  if (!artist && !isFetched) {
    return <Loading />;
  }

  return (
    <div>
      <PageHeader
        type="artist"
        title={artist?.name}
        subtitle="artist"
        imageSrc={artist?.image || ""}
        linkHref={`/artists/${artist?.id}/new-album`}
        linkText="Add new album"
        onDelete={() => deleteArtist(artist?.id ?? "")}
      />
      <div className="flex flex-col gap-y-5">
        <h3 className="text-white text-lg sm:text-xl lg:text-2xl text-center sm:text-start">
          All Albums
        </h3>
        <AllArtistAlbums artistId={artist?.id ?? ""} />
      </div>
    </div>
  );
};

export default ArtistPage;
