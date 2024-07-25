import { AxiosError, AxiosInstance } from 'axios';
import { useEffect, useState } from 'react';

export type FetchState<TData> = {
	loading: boolean;
	data?: TData | null;
	error?: AxiosError | null;
	isFetched?: boolean;
	isError?: boolean;
};

// client yada endpoint değişiminde tekardan veri çekilecek

export function UseFetch<TData>(client: AxiosInstance, endpoint: string) {
	const initState: FetchState<TData> = {
		loading: false,
		isFetched: false,
		data: null,
		error: null,
		isError: false,
	};
	const [state, setState] = useState(initState);

	useEffect(() => {
		console.log('client veya url değişti');

		// verinin çekilmeye başladığı an
		setState({ ...state, loading: true });

		client
			.get(endpoint)
			.then((response) => {
				console.log('load-data', response.data);

				// northwind veri seti için bir ayar yaptık
				if (response.data.value) {
					response.data = response.data.value;
				}

				setState({
					...state,
					data: response.data as TData,
					isFetched: true,
					loading: false,
				});
			})
			.catch((err) => {
				console.log('err', err);
				setState({
					...state,
					error: err,
					isError: true,
					isFetched: false,
				});
			});
	}, [client, endpoint]);

	return { ...state };
}
