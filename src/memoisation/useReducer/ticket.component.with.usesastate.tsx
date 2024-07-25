// Senaryo

import React, { useState } from 'react';

// Bir bilet fiyat hesaplama işlemi yapıcaz
// A Sırası 600
// B sırası 500
// C Sırası 400
// D Sırası 350
// Diğer Sıralar 300
// 65 yaş üstü % 50 indirimli
// Öğrenci %20 indirimli olsun
// TotalPrice

type TicketState = {
	line: number; // A-B-C-D-E
	type: string; // Tam 65 Yaş Öğrenci
	cost: number;
};

export function TicketDemoWithUseStateObject() {
	const [state, setState] = useState<TicketState>({
		cost: 0,
		line: -1,
		type: '-1',
	});

	const calc = () => {
		let totalCost = 0;

		if (state.type == 'yasli') {
			totalCost = (state.line / 2) * (1 + 0.2);
		} else if (state.type == 'ogrenci') {
			totalCost = state.line * (1 - 0.2) * (1 + 0.2);
		} else {
			totalCost = state.line * (1 + 0.2);
		}

		setState({ ...state, cost: totalCost });
	};

	const onLineChange = (event: any) => {
		setState({ ...state, line: Number(event.target.value) });
	};

	const onTypeChange = (event: any) => {
		setState({ ...state, type: event.target.value });
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
