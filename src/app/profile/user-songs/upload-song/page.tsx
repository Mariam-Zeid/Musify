import NewUserTrackForm from "@/components/pages/profile/newUserTrackForm";

const UploadUserSongPage = () => {
  return (
    <>
      <h1 className="text-white text-3xl font-semibold mb-14">
        New Song Form
      </h1>
      <div className="flex justify-center items-center">
        <NewUserTrackForm />
      </div>
    </>
  );
};

export default UploadUserSongPage;
