// Bir bilet fiyat hesaplama işlemi yapıcaz
// A Sırası 600
// B sırası 500
// C Sırası 400
// D Sırası 350
// Diğer Sıralar 300
// 65 yaş üstü % 50 indirimli
// Öğrenci %20 indirimli olsun
// TotalPrice

export type TicketState = {
	line: number; // A-B-C-D-E
	type: string; // Tam 65 Yaş Öğrenci
	cost: number;
};

// Biletin fiyatını değiştirecek olan action tipleri
export type TicketActionType =
	| 'Line_Select'
	| 'Type_Select'
	| 'Calculate_Total_Cost';

export type TicketAction = {
	type: TicketActionType;
	payload?: any;
};

export function TicketReducer(state: TicketState, action: TicketAction) {
	switch (action.type) {
		case 'Line_Select':
			state = { ...state, line: action.payload.line };
			break;
		case 'Type_Select':
			state = { ...state, type: action.payload.type };
			break;
		case 'Calculate_Total_Cost':
			const totalCost = calTotalCost(state);
			state = { ...state, cost: totalCost };
			break;
		default:
			break;
	}

	// güncel state ekran döndürdük.
	return state;
}

const calTotalCost = (state: TicketState): number => {
	let totalCost = 0;

	if (state.type == 'yasli') {
		totalCost = (state.line / 2) * (1 + 0.2);
	} else if (state.type == 'ogrenci') {
		totalCost = state.line * (1 - 0.2) * (1 + 0.2);
	} else {
		totalCost = state.line * (1 + 0.2);
	}

	return totalCost;
};
