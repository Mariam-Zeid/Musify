import FavoriteLink from "@/components/pages/home/favoriteLink";
import Link from "next/link";
import TopArtists from "@/components/pages/artists/topArtists";
import AllTracks from "@/components/pages/tracks/allTracks";

const HomePage = async () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-white text-3xl font-semibold">Welcome back</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
        <FavoriteLink />
      </div>

      {/* TOP ARTISTS */}
      <div className="artists-wrapper">
        <div className="flex justify-between items-center">
          <h2 className="text-white text-2xl font-semibold">Top 5 Artists</h2>
          <button>
            <Link href="/artists">See all</Link>
          </button>
        </div>
        <TopArtists />
      </div>

      {/* Popular Songs */}
      <div className="songs-wrapper">
        <h2 className="text-white text-2xl font-semibold mb-3">
          Popular Songs
        </h2>
        <AllTracks />
      </div>
    </div>
  );
};

export default HomePage;
