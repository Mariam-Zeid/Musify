import NewArtistForm from "@/components/pages/artists/newArtistForm";

const NewArtistPage = () => {
  return (
    <>
      <h1 className="text-white text-3xl font-semibold mb-14">
        New Artist Form
      </h1>
      <div className="flex justify-center items-center">
        <NewArtistForm />
      </div>
    </>
  );
};

export default NewArtistPage;
