import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import { useEffect, useState } from 'react';

export function UseAccessToken(refresh?: boolean) {
	const [subject, setSubject] = useState<string>('');
	const [name, setName] = useState<string>();
	const [loginTime, setLoginTime] = useState<string>('');

	// useEffect(() => {
	// 	console.log('...UseStorage');
	// }, []);

	useEffect(() => {
		console.log('...UseAccessToken');

		const value =
			(localStorage.getItem('token') as string) ||
			(sessionStorage.getItem('token') as string);

		if (value) {
			const tokenObj: any = jwtDecode(value);

			setSubject(tokenObj.sub as string);
			setName(tokenObj.name as string);
			setLoginTime(moment(tokenObj.iat).format('DD/MM/YYYY HH:mm'));
		}
	}, [refresh]);

	return { subject, name, loginTime };
}
