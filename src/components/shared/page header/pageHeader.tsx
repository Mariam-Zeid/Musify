"use client";

import Image from "next/image";
import DeleteButton from "./deleteButton";
import LinkButton from "./linkButton";

interface PageHeaderProps {
  imageSrc?: string;
  title?: string;
  subtitle?: string;
  type?: string;
  linkHref?: string;
  linkText?: string;
  onDelete?: () => void;
}
const PageHeader = ({
  imageSrc,
  title,
  subtitle,
  type,
  linkHref,
  linkText,
  onDelete,
}: PageHeaderProps) => {
  return (
    <div className="my-10">
      <div className="flex flex-col md:flex-row items-center gap-x-5">
        <div className="relative w-40 h-40 lg:w-48 lg:h-48">
          <Image
            className="object-cover h-full"
            src={imageSrc || "/images/liked.png"}
            alt="Page Header"
            width={176}
            height={176}
          />
        </div>
        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
          <p className="hidden md:block font-semibold text-sm">{subtitle}</p>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold capitalize text-center md:text-start">
            {title}
          </h1>

          <div className="flex gap-x-2 mt-3">
            {type === "user" && (
              <>
                <LinkButton
                  href="/profile/update-profile"
                  text="update profile"
                />
                <DeleteButton
                  type={type || ""}
                  onDelete={onDelete || (() => {})}
                />
              </>
            )}
            {type === "favorites" && (
              <>
                <DeleteButton
                  type={type || ""}
                  onDelete={onDelete || (() => {})}
                />
              </>
            )}
            {type === "userOwnSongs" && (
              <>
                <LinkButton
                  href="/profile/user-songs/upload-song"
                  text="upload song"
                />
                <DeleteButton
                  type={type || ""}
                  onDelete={onDelete || (() => {})}
                />
              </>
            )}
            {type === "playlist" && (
              <DeleteButton
                type={type || ""}
                onDelete={onDelete || (() => {})}
              />
            )}
            {type &&
              type !== "user" &&
              type !== "favorites" &&
              type !== "userOwnSongs" &&
              type !== "playlist" && (
                <>
                  <LinkButton href={linkHref || ""} text={linkText || ""} />
                  <DeleteButton
                    type={type || ""}
                    onDelete={onDelete || (() => {})}
                  />
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
