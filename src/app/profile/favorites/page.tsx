"use client";

import { useUserFavorites } from "@/client/hooks/useFavorites";
import Loading from "@/components/shared/loading/loading";
import PageHeader from "@/components/shared/page header/pageHeader";
import SongItemList from "@/components/shared/songs/songItemList";
import { Track } from "@prisma/client";

const LikedPage = () => {
  const { data: favorites, isLoading } = useUserFavorites();

  if (isLoading) {
    return <Loading />;
  }

  if (!favorites) {
    return <p>No favorites yet</p>;
  }

  return (
    <>
      <PageHeader type="favorites" title="Favorites" subtitle="playlist" />
      <SongItemList tracks={(favorites || []).map((track) => track.track as Track)} />
    </>
  );
};

export default LikedPage;
