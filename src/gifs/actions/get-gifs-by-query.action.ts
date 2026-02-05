import { giphyApi } from "../api/giphy.api";
import type { Gif } from "../interfaces/gif.interface";
import type { GiphyResponse } from "../interfaces/giphy.response";

export const getGifsByQuery = async (
  query: string,
  offset: number = 0,
  limit: number = 10
): Promise<Gif[]> => {
  const response = await giphyApi<GiphyResponse>('/search', {
    params: {
      q: query,
      limit,
      offset,
    },
  });

  return response.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height),
  }));
};
