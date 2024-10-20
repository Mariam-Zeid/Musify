import NewTrackForm from "@/components/pages/tracks/newTrackForm";

interface NewTrackProps {
  params: {
    artistSlug: string;
    albumSlug: string;
  };
}
const NewTrackFormPage = ({ params }: NewTrackProps) => {
  return (
    <>
      <h1 className="text-white text-3xl font-semibold mb-14">
        New Track Form
      </h1>
      <div className="flex justify-center items-center">
        <NewTrackForm artistId={params.artistSlug} albumId={params.albumSlug} />
      </div>
    </>
  );
};

export default NewTrackFormPage;
