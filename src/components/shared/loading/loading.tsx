"use client";

import { BounceLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="bg-neutral-900 fixed top-0 left-0 w-full h-full flex justify-center items-center py-5 z-50">
      <BounceLoader color="#22c55e" size={40} />
    </div>
  );
}
