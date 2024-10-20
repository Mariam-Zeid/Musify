import PageHeader from "@/components/shared/page header/pageHeader";
import SongItemList from "@/components/shared/songs/songItemList";

const AlbumPage = () => {
  return (
    <div>
      <PageHeader
        type="album"
        title="cocktail"
        subtitle="TUL8TE"
        linkHref="/artists/artist 1/album 1/new-track"
        linkText="Add track"
      />
      <div className="wrapper">
        <SongItemList />
      </div>
    </div>
  );
};

export default AlbumPage;
