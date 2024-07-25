import React, { useRef, useState } from 'react';
import ModalDemo, { ModalHandle } from './modal.demo';
import ModalDemoWithState from './modal.demoWithState';

function UseNoImperativeHandlerDemo() {
	console.log('...parent rendering');
	const [visible, setVisible] = useState<boolean>(false);

	// UseImeperative Handler => Dış bir componentten child bir componentin iç state'ini değiştirmemize olanak sağlayan side effect oluşturmayan bir yöntem

	return (
		<>
			<h1>Non Imperative</h1>
			<button
				onClick={() => {
					setVisible(true);
				}}
			>
				Open
			</button>
			:
			<button
				onClick={() => {
					setVisible(false);
				}}
			>
				Close
			</button>
			<ModalDemoWithState visible={visible} />
		</>
	);
}

export default UseNoImperativeHandlerDemo;
