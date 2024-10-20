import SearchInput from "@/components/pages/search/SearchInput";
import SongItemList from "@/components/shared/songs/songItemList";

const SearchPage = () => {
  return (
    <>
      <h1 className="text-white text-3xl font-semibold">Search</h1>
      <div className="mt-5 mb-7">
        <SearchInput />
        <SongItemList />
      </div>
    </>
  );
};

export default SearchPage;
