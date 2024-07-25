import React from 'react';
import useSWR, { preload } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// should call before rendering
// preload useEffect içerisinde veya bir event tetiklendiğinde çağırılabilir.
// preload('https://jsonplaceholder.typicode.com/users', fetcher);

const SwrPreLoadData = () => {
	// The below useSWR hooks will suspend the rendering, but the requests to `/api/user` and `/api/movies` have started by `preload` already,
	// so the waterfall problem doesn't happen.
	const { data: users, isLoading } = useSWR(
		'https://jsonplaceholder.typicode.com/users',
		fetcher,
		{ suspense: true }
	);

	if (isLoading) return <>... Preload Loading</>;

	return (
		<div>
			{users.map((item: any) => {
				return <div key={item.id}>{item.name}</div>;
			})}
		</div>
	);
};

export default SwrPreLoadData;
