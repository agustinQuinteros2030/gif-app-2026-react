

import { GifList } from './gifs/components/GifList';
import { PreviousSearches } from './gifs/components/PreviousSearches';

import { CustomHeader } from './shared/components/CustomHeader';
import { ScrollToTopButton } from './shared/components/ScrollToTopButton';


import { UseGifs } from './Hooks/UseGifs';
import { SearchBar } from './shared/components/SearchBar';

export const GifsApp = () => {
  const { handleSearch, previousTerms, handleTermClicked, gifs, loadMore } = UseGifs();

  return (
    <>
      {/* Header */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el Gif perfecto"
      />

      {/* Search */}
      <SearchBar placeholder="Busca lo que quieras" onQuery={handleSearch} />

      {/* Búsquedas previas */}
      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      {/* Gifs */}
      <GifList gifs={gifs} />

      <button
        onClick={loadMore}
        className='load-more-btn'
      >
        Cargar más
      </button>

      {/* Botón volver arriba */}
      <ScrollToTopButton />



    </>
  );
};
