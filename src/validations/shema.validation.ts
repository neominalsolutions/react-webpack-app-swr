import * as yup from 'yup';

export type FormState = {
	firstname: string;
	lastname: string;
	sallary: number; // maaş
	workDays: number; // kaç gün çalıştığı
	perDayCost: number; // günlük ödeme miktarı
};

export const schema = yup
	.object({
		firstname: yup.string().required('ad boş geçilemez'),
		lastname: yup.string().required('soyad boş geçilemez'),
		workDays: yup
			.number()
			.positive()
			.integer()
			.required('çalışılan gün sayısı zorunludur'),
		perDayCost: yup
			.number()
			.positive()
			.integer()
			.required('günlük kazanç zorunludur'),
		sallary: yup
			.number()
			.positive()
			.integer()
			.required('maaş bilgisi zorunludur'),
	})
	.required();
