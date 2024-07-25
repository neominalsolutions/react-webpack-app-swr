import React, { useCallback, useMemo, useState } from 'react';

import { httpClientModule } from '../../network/httpclient';
import { UseFetch } from '../customHook/usefetch.hook';
import debounce from '../../services/debounce.service';

interface Product {
	ProductID: number;
	ProductName: string;
}

function DebouncingDemo() {
	const [searchText, setSearchText] = useState<string>('');

	// searchText her bir değişimi baz alınarak veri tekrar çekilecek.
	const response = UseFetch<Product[]>(
		httpClientModule.northwndApi,
		`/Products?$filter=substringof('${searchText}',ProductName)&$format=json`
	);

	// 300sn için sonucu memoize ettik.
	const onSearch = useMemo(
		() =>
			debounce((e: any) => {
				setSearchText(e.target.value);
			}, 500),
		[searchText]
	);

	if (response.isFetched) {
		return (
			<>
				<input onChange={onSearch} />
				{/* <input
					onChange={(e: any) => {
						setSearchText(e.target.value);
					}}
					type="text"
				/> */}

				<ul>
					{response.data?.map((item) => {
						return <li key={item.ProductID}>{item.ProductName}</li>;
					})}
				</ul>
			</>
		);
	}

	return <></>;
}

export default DebouncingDemo;
