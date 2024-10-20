"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";

const SearchInput = () => {
  const [value, setValue] = useState<string>("");

  return (
    <Input
      className="bg-[hsl(var(--input-background)] border-none py-6"
      placeholder="What do you want to listen to?"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchInput;
