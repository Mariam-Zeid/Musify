import PageHeader from "@/components/shared/page header/pageHeader";
import SongItemList from "@/components/shared/songs/songItemList";

const UserOwnSongsPage = () => {
  return (
    <>
      <PageHeader
        type="userOwnSongs"
        title="Bob's Songs"
        subtitle="playlist"
        imageSrc="/images/song-logo.avif"
      />
      <SongItemList />
    </>
  );
};

export default UserOwnSongsPage;
