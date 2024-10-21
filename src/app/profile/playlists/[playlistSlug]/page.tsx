"use client";

import {
  usePlaylist,
  useUserPlaylistsMutations,
} from "@/client/hooks/usePlaylists";
import AddTracksToPlaylist from "@/components/pages/playlists/addTracksToPlaylist";
import PlaylistTracks from "@/components/pages/playlists/playlistTracks";
import Loading from "@/components/shared/loading/loading";
import PageHeader from "@/components/shared/page header/pageHeader";

interface PlaylistPageProps {
  params: {
    playlistSlug: string;
  };
}
const PlaylistPage = ({ params }: PlaylistPageProps) => {
  const { data: playlist, isLoading, isRefetching } = usePlaylist({ playlistId: params.playlistSlug });
  const { deletePlaylist } = useUserPlaylistsMutations();

  if (isLoading || isRefetching) {
    return <Loading />;
  }
  
  return (
    <>
      <PageHeader
        type="playlist"
        title={playlist?.name}
        imageSrc={playlist?.image || "/images/song-logo.avif"}
        onDelete={() => deletePlaylist(playlist?.id ?? "")}
      />
      <div className="flex flex-col gap-y-10">
        <div className="playlist-tracks">
          <p className="mb-3">Playlist Tracks</p>
          <PlaylistTracks playlistId={playlist?.id ?? ""} />
        </div>

        <AddTracksToPlaylist playlistId={playlist?.id ?? ""} />
      </div>
    </>
  );
};

export default PlaylistPage;
