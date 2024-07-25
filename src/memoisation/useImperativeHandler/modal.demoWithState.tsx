import React, {
	ForwardedRef,
	forwardRef,
	memo,
	RefObject,
	useImperativeHandle,
	useState,
} from 'react';

type ModalProps = {
	visible:boolean
};

function ModalDemoWithState(props: ModalProps) {
	console.log('...child rendering');


	return (
		<>
			<div
				style={{
					display: props.visible ? 'block' : 'none',
					zIndex: props.visible ? 99999 : 1,
					position: props.visible ? 'absolute' : 'relative',
					margin: props.visible ? 'auto' : '0',
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

export default memo(ModalDemoWithState);
