import { useEffect, useRef, useState } from "react";
import type { Gif } from "../gifs/interfaces/gif.interface";
import { getGifsByQuery } from "../gifs/actions/get-gifs-by-query.action";

export const UseGifs = () => {

  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);
  const [page, setPage] = useState(0);

  const currentQueryRef = useRef<string | null>(null);
  const cacheRef = useRef<Map<string, Gif[]>>(new Map());

  const LIMIT = 10;

  const RANDOM_TERMS = [
    'funny',
    'cats',
    'memes',
    'anime',
    'gaming',
    'reactions',
    'dogs',
    'movies',
  ];


  const handleTermClicked = (term: string) => {
    handleSearch(term);
  };

  const handleSearch = async (query: string = '') => {
    query = query.trim().toLowerCase();
    if (!query) return;

    // nueva búsqueda  reset total
    currentQueryRef.current = query;
    setPage(0);

    setPreviousTerms(prev =>
      [query, ...prev.filter(t => t !== query)].slice(0, 8)
    );

    // cache SOLO primera página
    if (cacheRef.current.has(query)) {
      setGifs(cacheRef.current.get(query)!);
      return;
    }

    const gifs = await getGifsByQuery(query, 0);

    cacheRef.current.set(query, gifs);
    setGifs(gifs);
  };



  const loadMore = async () => {
    if (!currentQueryRef.current) return;

    const nextPage = page + 1;
    const offset = nextPage * LIMIT;

    const newGifs = await getGifsByQuery(
      currentQueryRef.current,
      offset
    );

    // si no vienen más → no sigas
    if (newGifs.length === 0) return;

    setGifs(prev => [...prev, ...newGifs]);
    setPage(nextPage);
    console.log('offset:', offset);
  };

  useEffect(() => {
    const randomTerm =
      RANDOM_TERMS[Math.floor(Math.random() * RANDOM_TERMS.length)];

    currentQueryRef.current = randomTerm;

    getGifsByQuery(randomTerm, 0).then(gifs => {
      setGifs(gifs);
      cacheRef.current.set(randomTerm, gifs);
    });
  }, []);



  return {
    gifs,
    previousTerms,
    handleSearch,
    handleTermClicked,
    loadMore,
  };
};