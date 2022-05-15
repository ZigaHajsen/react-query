import axios, { AxiosError, AxiosResponse } from 'axios';
import { Fragment } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Color } from '../types';

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

export const RQInfiniteQueriesPage: React.FC = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery<AxiosResponse<Color[]>, AxiosError>(
    ['colors'],
    fetchColors,
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1;
        }

        return undefined;
      },
    }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, index) => {
          return (
            <Fragment key={index}>
              {group.data.map((color) => (
                <h2 key={color.id}>
                  {color.id} {color.label}
                </h2>
              ))}
            </Fragment>
          );
        })}
      </div>
      <div>
        <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  );
};
