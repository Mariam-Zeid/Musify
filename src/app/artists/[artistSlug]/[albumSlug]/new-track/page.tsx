import NewTrackForm from "@/components/pages/tracks/newTrackForm";

const NewTrackFormPage = () => {
  return (
    <>
      <h1 className="text-white text-3xl font-semibold mb-14">
        New Track Form
      </h1>
      <div className="flex justify-center items-center">
        <NewTrackForm />
      </div>
    </>
  );
};

export default NewTrackFormPage;
