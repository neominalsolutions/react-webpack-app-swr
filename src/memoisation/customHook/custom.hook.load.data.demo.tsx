import React from 'react';
import { httpClientModule } from '../../network/httpclient';
import { UseFetch } from './usefetch.hook';

interface Post {
	title: string;
	body: string;
	id: number;
}

function CustomHookLoadDataDemo() {
	const response = UseFetch<Post[]>(
		httpClientModule.jsonPlaceHolderApi,
		'/posts'
	);

	if (response.loading)
		return (
			<>
				<p>...veri yükleniyor</p>
			</>
		);

	if (response.isError) return <>Yüklenirken Hata oluştu</>;

	if (response.isFetched) {
		return (
			<>
				{response.data?.map((item: any) => {
					return <div key={item.id}>{item.title}</div>;
				})}
			</>
		);
	}

	// ilk açılış sonuçta async çalışıyoruz.
	return <></>;
}

export default CustomHookLoadDataDemo;
