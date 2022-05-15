import { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { Color } from '../types';

const fetchColors = (pageNumber: number) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

export const RQPaginatedQueriesPage: React.FC = () => {
  const [pageNumber, pageNumberSet] = useState(1);
  const { isLoading, isError, error, data, isFetching } = useQuery<
    AxiosResponse<Color[]>,
    AxiosError
  >(['colors', pageNumber], () => fetchColors(pageNumber), {
    keepPreviousData: true,
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.data.map((color) => {
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          );
        })}
      </div>
      <div>
        <button
          onClick={() => pageNumberSet((page) => page - 1)}
          disabled={pageNumber === 1}
        >
          Prev Page
        </button>
        <button
          onClick={() => pageNumberSet((page) => page + 1)}
          disabled={pageNumber === 4}
        >
          Next Page
        </button>
      </div>
      {isFetching && 'Loading'}
    </>
  );
};
