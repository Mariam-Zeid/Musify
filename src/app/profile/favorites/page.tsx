import PageHeader from "@/components/shared/page header/pageHeader";
import SongItemList from "@/components/shared/songs/songItemList";

const LikedPage = () => {
  return (
    <>
      <PageHeader type="favorites" title="Favorites" subtitle="playlist"/>
      <SongItemList />
    </>
  );
};

export default LikedPage;
