import React from 'react';
import { TicketDemoWithUseReducerObject } from './ticket.component.with.usereducer';
import { TicketDemoWithUseStateObject } from './ticket.component.with.usesastate';

function UseReducerDemo() {
	return (
		<>
			<h1>Use Reducer Sample</h1>
			<TicketDemoWithUseReducerObject />
			<hr></hr>
			<h1>Use State Object Sample</h1>
			<TicketDemoWithUseStateObject />
		</>
	);
}

export default UseReducerDemo;
