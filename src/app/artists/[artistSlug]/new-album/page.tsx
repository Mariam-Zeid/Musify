import NewAlbumForm from "@/components/pages/albums/newAlbumForm";

interface ArtistNewAlbumProps {
  params: {
    artistSlug: string;
  };
}

const NewAlbumFormPage = ({ params }: ArtistNewAlbumProps) => {
  return (
    <>
      <h1 className="text-white text-3xl font-semibold mb-14">
        New Album Form
      </h1>
      <div className="flex justify-center items-center">
        <NewAlbumForm artistId={params.artistSlug} />
      </div>
    </>
  );
};

export default NewAlbumFormPage;
