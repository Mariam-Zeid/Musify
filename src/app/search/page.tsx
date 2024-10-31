"use client";

import {
  useTracksByNameOrArtist,
} from "@/client/hooks/useTracks";
import SearchInput from "@/components/pages/search/SearchInput";
import SongItemList from "@/components/shared/songs/songItemList";

interface SearchPageProps {
  searchParams?: {
    q: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const query = searchParams?.q?.toLowerCase() || "";
    const { data: tracks } = useTracksByNameOrArtist({ query });

  return (
    <>
      <h1 className="text-white text-3xl font-semibold">Search</h1>
      <div className="mt-5 mb-7">
        <SearchInput />
        <SongItemList tracks={tracks || []} />
      </div>
    </>
  );
};

export default SearchPage;
