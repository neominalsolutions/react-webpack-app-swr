import React, { useState } from 'react';
import ChildComponent from './child.component';

function ReactMemoDemo() {
	// Parent Component State Child Component ile hiç bir bağlantısı yok.
	// Child Componente Render aldığı için bir side effect yapıyor.
	const [toggle, setToggle] = useState<boolean>(false);
	const [title, setTitle] = useState<string>('');
	// üst component deki state ile alt component ait props bağlanarak state ddeğişimi child componente geçirilmiş olur.

	return (
		<>
			<ChildComponent title={title} />
			<hr></hr>
			Parent Component
			<p>Checked State: {toggle ? 'true' : 'false'}</p>
			<input
				type="checkbox"
				checked={toggle}
				onChange={() => {
					setToggle(!toggle);
				}}
			/>
			<button
				onClick={() => {
					setTitle('Title' + Math.random() * 100);
				}}
			>
				Title Güncelle
			</button>
			<hr></hr>
		</>
	);
}

export default ReactMemoDemo;
