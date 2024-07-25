import React, { useEffect, useState } from 'react';
import useSWR, { Fetcher, mutate, useSWRConfig } from 'swr';
import { httpClientModule } from '../network/httpclient';
import { Todo } from '../redux/features/todo.slice';
import { Product } from '../models/product.model';

function SwrDemo() {
	const [pageSize, setPageSize] = useState<number>(10);
	const [page, setPage] = useState<number>(1);

	const { mutate } = useSWRConfig();

	const todosFetcher: Fetcher<Product[], string> = (endpoint: string) =>
		httpClientModule.northwndApi
			.get(endpoint)
			.then((response) => response.data.value);

	// key değerleri değişince veri unvalidate olup yeninden tetikleniyor.
	const { data, isLoading, error } = useSWR(
		`/Products?$skip=${(page - 1) * pageSize}&$top=${pageSize}&$format=json`,
		todosFetcher,
		{
			revalidateOnFocus: false, // yeni sekmede açınca yeniden yüklenme özelliği
			revalidateOnReconnect: true,
		}
	);

	if (isLoading) return <>... Loading</>;

	const onReValidate = () => {
		mutate(
			`/Products?$skip=${(page - 1) * pageSize}&$top=${pageSize}&$format=json`,
			[
				{
					ProductID: 111,
					ProductName: 'Test',
					UnitPrice: 10,
					UnitsInStock: 20,
				},
				...(data as Product[]),
			]
		);
	};

	if (data) {
		return (
			<>
				<button onClick={onReValidate}>ReValidate</button>
				<hr></hr>
				<select
					defaultValue={10}
					value={pageSize}
					onChange={(e: any) => setPageSize(Number(e.target.value))}
				>
					<option value="5">5</option>
					<option value="10">10</option>
					<option value="15">15</option>
					<option value="25">25</option>
				</select>

				{data.map((item: Product) => {
					return <div key={item.ProductID}>{item.ProductName}</div>;
				})}

				<button
					onClick={() => {
						setPage(1);
					}}
				>
					1. Sayfa
				</button>

				<button
					onClick={() => {
						setPage(2);
					}}
				>
					2. Sayfa
				</button>

				<button
					onClick={() => {
						setPage(3);
					}}
				>
					3. Sayfa
				</button>

				<button
					onClick={() => {
						setPage(4);
					}}
				>
					4. Sayfa
				</button>
			</>
		);
	}

	return <></>;
}

export default SwrDemo;
