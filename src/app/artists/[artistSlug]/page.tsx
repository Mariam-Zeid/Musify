"use client";

import Link from "next/link";
import PageHeader from "@/components/shared/page header/pageHeader";
import SongCard from "@/components/shared/songs/songCard";
import SongCardListWrapper from "@/components/shared/songs/songCardListWrapper";

const ArtistPage = () => {
  return (
    <div>
      <PageHeader
        type="artist"
        title="Tul8te"
        subtitle="artist"
        linkHref="/artists/1/new-album"
        linkText="Add album"
      />
      <div className="wrapper">
        <h3 className="text-white text-lg sm:text-xl lg:text-2xl text-center sm:text-start">
          All Albums
        </h3>
        <SongCardListWrapper>
          <Link href="/artists/1/cocktail">
            <SongCard title="cocktail ghena'y" subtitle="TUL8TE" />
          </Link>
        </SongCardListWrapper>
      </div>
    </div>
  );
};

export default ArtistPage;
