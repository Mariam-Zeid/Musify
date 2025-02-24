"use client";

import { useAlbumsMutations, useArtistAlbum } from "@/client/hooks/useAlbums";
import AlbumTracks from "@/components/pages/tracks/albumTracks";
import Loading from "@/components/shared/loading/loading";
import PageHeader from "@/components/shared/page header/pageHeader";

interface AlbumProps {
  params: {
    artistSlug: string;
    albumSlug: string;
  };
}

const AlbumPage = ({ params }: AlbumProps) => {
  const { data: album } = useArtistAlbum({
    albumId: params.albumSlug,
  });
  const { deleteAlbum } = useAlbumsMutations();

  if (!album && !album) {
    return <Loading />;
  }

  return (
    <div>
      <PageHeader
        type="album"
        title={album?.name}
        subtitle={album?.artist.name}
        imageSrc={album?.image || ""}
        linkHref={`/artists/${params.artistSlug}/${album?.id}/new-track`}
        linkText="Add track"
        onDelete={() => deleteAlbum(album?.id ?? "")}
      />
      <div className="wrapper">
        <AlbumTracks albumId={album?.id ?? ""} />
      </div>
    </div>
  );
};

export default AlbumPage;
