import React from 'react';
import useSWRInfinite from 'swr/infinite';
import { httpClientModule } from '../network/httpclient';

const getKey = (pageIndex: number, previousPageData: any) => {
	console.log('getKey', previousPageData);
	if (previousPageData && !previousPageData.length) return null; // reached the end
	return `/https://services.odata.org/northwind/northwind.svc/Products?$skip=${pageIndex}&$top=10&$format=json`; // SWR key
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function SWRInfinitiveLoad() {
	const { data, size, setSize } = useSWRInfinite(
		(index) =>
			`https://services.odata.org/northwind/northwind.svc/Products?$skip=0&$top=${
				(index + 1) * 10
			}&$format=json`,
		fetcher
	);
	if (!data) return <>Load</>;

	console.log('data', data);
	console.log('size', size);

	// We can now calculate the number of all users
	let totalProducts = 0;
	for (let i = 0; i < data.length; i++) {
		totalProducts += data[i].value.length;
	}

	return (
		<div>
			<p>{totalProducts} products listed</p>
			{data[0].value.map((item: any, index: number) => {
				// `data` is an array of each page's API response.
				return <div>{item.ProductName}</div>;
			})}
			<button onClick={() => setSize(size + 1)}>Load More</button>
		</div>
	);
}

export default SWRInfinitiveLoad;
