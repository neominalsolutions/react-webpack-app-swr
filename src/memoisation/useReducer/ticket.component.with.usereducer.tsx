// Senaryo

import React, { useReducer, useState } from 'react';
import { TicketReducer, TicketState } from './ticket.reducer';

export function TicketDemoWithUseReducerObject() {
	const initState: TicketState = { cost: 0, line: -1, type: '-1' };
	const [state, dispatch] = useReducer(TicketReducer, initState);

	const calc = () => {
		dispatch({ type: 'Calculate_Total_Cost' });
	};

	const onLineChange = (event: any) => {
		dispatch({
			type: 'Line_Select',
			payload: { line: Number(event.target.value) },
		});
	};

	const onTypeChange = (event: any) => {
		dispatch({
			type: 'Type_Select',
			payload: { type: event.target.value },
		});
	};

	return (
		<>
			<label>Sıra: </label>
			<select onChange={onLineChange} defaultValue={-1}>
				<option value={-1} disabled>
					Lütfen Seçim Yapınız
				</option>
				<option value="600">A Line</option>
				<option value="500">B Line</option>
				<option value="400">C Line</option>
				<option value="350">D Line</option>
				<option value="300">Other Lines</option>
			</select>
			<br></br>
			<label>Tip: </label>
			<select onChange={onTypeChange} defaultValue={'-1'}>
				<option value="-1" disabled>
					Lütfen Seçim Yapınız
				</option>
				<option value="tam">Tam</option>
				<option value="yasli">65 yaş üstü</option>
				<option value="ogrenci">Öğrenci</option>
			</select>
			<br></br>
			<p>Bilet Fiyat : {state.cost}</p>

			<button onClick={calc}>Hesapla</button>
		</>
	);
}
