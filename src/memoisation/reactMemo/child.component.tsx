import React, { memo } from 'react';

// eğer componentin propsları üst componenten değiştirilmiyorsa bu durumda bu component üst componneti herhangi bir state değişiminden etkilenmez.

type Props = {
	title?: string; // title Props optional
};

function ChildComponent({ title }: Props) {
	console.log('...rendering');

	return (
		<>
			<hr></hr>
			Child Component
			<p>Title: {title}</p>
			<hr></hr>
		</>
	);
}

export default memo(ChildComponent);
