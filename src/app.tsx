import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { todoFetch, todoFetchMock } from './redux/features/todo.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import './styles.scss';
import { preload } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function App() {
	// burada state load edersem uygulama genelinde bir daha refresh yapmayana kadar client state korunacaktır.

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		// çok fazla değişmeyen async verileri component içine girdiğimiz yükleme yerine
		// app componentte hazır hale getiririz.
		dispatch(todoFetch());
		preload('https://jsonplaceholder.typicode.com/users', fetcher);
	}, []);

	const onManuelLoadTodos = () => {
		dispatch(todoFetchMock());
	};

	return (
		<>
			<header>
				<p className="text-3xl text-blue-600/100 font-bold underline ">
					React Web Pack App
				</p>

				<nav>
					<Link to="/usestate">Use State Demo</Link>{' '}
					<Link to="/useeffect">Use Effect Demo</Link>{' '}
					<Link to="/useref">Use Ref Demo</Link>{' '}
					<Link to="/usememo">Use Memo Demo</Link>{' '}
					<Link to="/reactmemo">React Memo Demo</Link>{' '}
					<Link to="/usecallback">React Callback Demo</Link>{' '}
					<Link to="/useimperative">Use Imperative Demo</Link>{' '}
					<Link to="/usenonimperative">Use Non Imperative Demo</Link>{' '}
					<Link to="/usereducer">Use Reducer Demo</Link>{' '}
					<Link to="/customHook">Custom Hook</Link>{' '}
					<Link to="/customHookLoadData">Custom Hook Load Data</Link>{' '}
					<Link to="/axiosDemo">Axios Demo</Link>{' '}
					<Link to="/debouncing">Debouncing Demo</Link>{' '}
					<Link to="/shops">Ürünler- ContextAPI</Link>{' '}
					<Link to="/cartSummary">Sepetim -ContextAPI</Link>{' '}
					<Link to="/shopRedux">Ürünler- Redux</Link>{' '}
					<Link to="/cartSummaryRedux">Sepetim -Redux</Link>{' '}
					<Link to="/todos">Todos From Redux</Link>{' '}
					<Link to="/swr">Products From SWR</Link>{' '}
					<Link to="/swr-preload">SWR Pre Load</Link>{' '}
					<Link to="/swr-infinitive">SWR Infinitive Load</Link>{' '}
					<Link to="/forms-hook">React Forms Hook</Link>{' '}
					<Link to="/virtualized">Virtualized List</Link>{' '}
				</nav>
				<p>
					<button onClick={onManuelLoadTodos}>onManuelLoadTodos</button>
				</p>
			</header>
			<main style={{ padding: '1rem' }}>
				{/* yukarıdaki route isteklerine göre ilgili componentlerde burada Outlet işaretlemesi olduğu bölgeye girer */}
				<Outlet />
			</main>
			<footer
				style={{
					position: 'absolute',
					bottom: '0',
					backgroundColor: 'GrayText',
					color: 'white',
				}}
			>
				Alt Bilgi
			</footer>
		</>
	);
}
