import bcrypt from 'bcrypt';

const test = async () => {
	const inputPassword = '123'; // <--- пароль, который вводишь в браузере
	const storedHash = '$2b$10$b8SSDzmSR.TeplriIDlEEO4jvSHBcujev7G8UkrjAqCOMNXLh0rmi';

	const isValid = await bcrypt.compare(inputPassword, storedHash);
	console.log('Пароль совпадает:', isValid);
};

test();
