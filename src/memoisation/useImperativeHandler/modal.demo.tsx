import React, {
	ForwardedRef,
	forwardRef,
	RefObject,
	useImperativeHandle,
	useState,
} from 'react';

export type ModalHandle = {
	open: () => void;
	close: () => void;
};

type ModalProps = {};

function ModalDemo(props: ModalProps, forwadedRef: ForwardedRef<ModalHandle>) {
	console.log('...child rendering');

	const [visible, setVisible] = useState<boolean>(false);

	useImperativeHandle(forwadedRef, () => ({
		open() {
			setVisible(true);
		},
		close() {
			setVisible(false);
		},
	}));

	return (
		<>
			{/* {visible && (
				<div
					style={{
						backgroundColor: 'gray',
						opacity: '0.8',
						minHeight: '100vh',
						userSelect: 'none',
						width: '100vw',
						zIndex: 1,
					}}
				></div>
			)} */}

			<div
				style={{
					display: visible ? 'block' : 'none',
					zIndex: visible ? 99999 : 1,
					position: visible ? 'absolute' : 'relative',
					margin: visible ? 'auto' : '0',
					padding: '5px',
					border: '1px solid gray',
				}}
			>
				<header>Modal Header</header>
				<div>
					<p>Modal Body</p>
				</div>
			</div>
		</>
	);
}

export default forwardRef(ModalDemo);
