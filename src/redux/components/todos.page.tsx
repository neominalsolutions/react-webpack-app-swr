import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function TodosPage() {
	const todoState = useSelector((state: RootState) => state.todoState);

	// if (todoState.loading) return <>... Guncel Veri Yükleniyor</>;

	return (
		<>
			{todoState.data.map((item: any) => {
				return <div key={item.id}>{item.title}</div>;
			})}
		</>
	);
}

export default TodosPage;
