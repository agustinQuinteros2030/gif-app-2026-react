import type { FC } from 'react';
import type { Gif } from '../interfaces/gif.interface';


interface Props {
  gifs: Gif[];
}

export const GifList: FC<Props> = ({ gifs }) => {
  if (gifs.length === 0) return <p className='msj1'>No hay gifs para mostrar</p>;

  return (
    <div className="gifs-container">
      {gifs.map((gif) => (
        <div key={gif.id} className="gif-card">
          <img
            src={gif.url}
            alt={gif.title}
            loading="lazy"
          />
          <h3>{gif.title}</h3>
          <p>
            {gif.width}x{gif.height}
          </p>
        </div>
      ))}
    </div>
  );
};

