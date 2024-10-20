import PageHeader from "@/components/shared/page header/pageHeader";
import SongItemList from "@/components/shared/songs/songItemList";

const PlaylistPage = () => {
  return (
    <>
      <PageHeader type="playlist" title="Playlist 1" subtitle="playlist"/>
      <SongItemList />
    </>
  );
};

export default PlaylistPage;
