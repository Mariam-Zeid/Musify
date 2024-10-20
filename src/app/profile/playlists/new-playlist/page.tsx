import NewPlaylistForm from "@/components/pages/playlists/newPlaylistForm";

const NewPlaylistFormPage = () => {
  return <>
      <h1 className="text-white text-3xl font-semibold mb-14">
        New Playlist Form
      </h1>
      <div className="flex justify-center items-center">
        <NewPlaylistForm />
      </div>
    </>
};

export default NewPlaylistFormPage;
