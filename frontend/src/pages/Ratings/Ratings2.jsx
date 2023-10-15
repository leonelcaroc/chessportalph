/* eslint-disable react/button-has-type */
/* eslint-disable arrow-body-style */
import React from "react";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

async function fetchProjects(page = 0) {
  const { data } = await axios.get(`api/search/ratings?query=a&page=${page}`);
  return data;
}

const Ratings = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(0);

  const { status, data, error, isFetching, isPreviousData, isLoading } =
    useQuery({
      queryKey: ["projects", page],
      queryFn: () => fetchProjects(page),
      keepPreviousData: true,
      staleTime: 5000,
    });

  // Prefetch the next page!
  React.useEffect(() => {
    if (!isPreviousData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["projects", page + 1],
        queryFn: () => fetchProjects(page + 1),
      });
    }
  }, [data, isPreviousData, page, queryClient]);

  if (!isLoading) console.log(data);

  return (
    <div>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>Error: {error.message}</div>
      ) : (
        // `data` will either resolve to the latest page's data
        // or if fetching a new page, the last successful page's data
        <div>
          {data?.map((player) => (
            <li>{player?.NAME}</li>
          ))}
        </div>
      )}
      <div>Current Page: {page + 1}</div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
        style={{ backgroundColor: "yellow" }}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          setPage((old) => (data?.hasMore ? old + 1 : old));
        }}
        disabled={isPreviousData || !data?.hasMore}
        style={{ backgroundColor: "yellow" }}
      >
        Next Page
      </button>
      {
        // Since the last page's data potentially sticks around between page requests,
        // we can use `isFetching` to show a background loading
        // indicator since our `status === 'loading'` state won't be triggered
        isFetching ? <span> Loading...</span> : null
      }
    </div>
  );
};

export default Ratings;
