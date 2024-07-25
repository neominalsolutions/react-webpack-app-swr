import React, { useRef } from 'react';
import ModalDemo, { ModalHandle } from './modal.demo';

function UseImperativeHandlerDemo() {
	console.log('...parent rendering');
	const modalRef = useRef<ModalHandle>(null);

	// UseImeperative Handler => Dış bir componentten child bir componentin iç state'ini değiştirmemize olanak sağlayan side effect oluşturmayan bir yöntem

	return (
		<>
			<h1>Imperative Handler Demo</h1>
			<button
				onClick={() => {
					modalRef.current?.open();
				}}
			>
				Open
			</button>
			:
			<button
				onClick={() => {
					modalRef.current?.close();
				}}
			>
				Close
			</button>
			<ModalDemo ref={modalRef} />
		</>
	);
}

export default UseImperativeHandlerDemo;
