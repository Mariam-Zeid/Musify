"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("q", searchTerm);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      className="bg-[hsl(var(--input-background)] border-none py-6"
      placeholder="What do you want to listen to?"
      defaultValue={searchParams.get("q") ?? ""}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default SearchInput;
