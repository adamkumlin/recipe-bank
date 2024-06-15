"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import type { SearchResult } from "./utils/types";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [resultsAmount, setResultsAmount] = useState<number>(5);
  const [results, setResults] = useState<SearchResult[]>([]);

  async function search() {
    if (query === "" || resultsAmount === 0) {
      return;
    }

    const uri = `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${query}&limit=${resultsAmount}`;

    const response = await fetch(uri);
    const results = await response.json();
    setResults(results);
  }

  return (
    <main>
      <h1 className="font-mono">
        Wiki <span className="text-blue-400">Buddy</span>
      </h1>
      <SearchBar
        setQuery={setQuery}
        query={query}
        setResultsAmount={setResultsAmount}
        resultsAmount={resultsAmount}
        search={search}
      />
    </main>
  );
}
