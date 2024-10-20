import NewAlbumForm from "@/components/pages/albums/newAlbumForm";

const NewAlbumFormPage = () => {
  return (
    <>
      <h1 className="text-white text-3xl font-semibold mb-14">
        New Album Form
      </h1>
      <div className="flex justify-center items-center">
        <NewAlbumForm />
      </div>
    </>
  );
};

export default NewAlbumFormPage;
