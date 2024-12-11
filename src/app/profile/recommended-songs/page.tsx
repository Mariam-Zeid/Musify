"use client";

import { useState } from "react";
import PageHeader from "@/components/shared/page header/pageHeader";
import SongItemRow from "@/components/shared/songs/songItemRow";
import { useUserListeningHistory } from "@/client/hooks/useUsers";
import Loading from "@/components/shared/loading/loading";

interface Song {
  id: string;
  name: string;
  year: number;
}

const RecommendedSongsPage = () => {
  const [recommendedSongs, setRecommendedSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: listeningHistory, isLoading } = useUserListeningHistory();

  if (isLoading) return <Loading />;

  const handleShowRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const numberOfSongs = 10;

      const response = await fetch("/api/profile/recommended-songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songs: listeningHistory, numberOfSongs }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch recommendations");
      }

      const recommendations = await response.json();
      setRecommendedSongs(recommendations);
    } catch (err: unknown) {
      setError((err as Error)?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        type="recommended"
        title="Recommended Songs"
        subtitle="playlist"
        imageSrc="/images/recommendations.jpg"
        onDelete={handleShowRecommendations}
      />

      <div className="mt-4">
        {loading && <p>Loading recommendations...</p>}
        {!loading && recommendedSongs.length === 0 && (
          <p>No recommendations found</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col gap-y-2 w-full mt-5">
          {!loading &&
            recommendedSongs.length > 0 &&
            recommendedSongs.map((song) => (
              <SongItemRow
                key={song.id}
                title={song.name}
                subtitle={song.year.toString()}
                showLikeButton={false}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedSongsPage;
