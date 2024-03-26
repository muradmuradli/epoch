type values = {
	username?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
};

const loginValidate = (values: values) => {
	const errors: { email?: string; password?: string } = {};

	if (!values.email) {
		errors.email = "Required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = "Invalid email address";
	}

	// validate password
	if (!values.password) {
		errors.password = "Required";
	} else if (values.password.length < 8 || values.password.length > 20) {
		errors.password = "Must be greater than 8 and less than 20 characters";
	} else if (values.password.includes(" ")) {
		errors.password = "Invalid password";
	}

	return errors;
};

const registerValidate = (values: values) => {
	const errors: {
		username?: string;
		email?: string;
		password?: string;
		confirmPassword?: string;
	} = {};

	if (!values.username) {
		errors.username = "Required";
	} else if (values.username.includes(" ")) {
		errors.username = "Invalid username";
	}

	if (!values.email) {
		errors.email = "Required";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = "Invalid email address";
	}

	// validate password
	if (!values.password) {
		errors.password = "Required";
	} else if (values.password.length < 8 || values.password.length > 20) {
		errors.password = "Must be greater than 8 and less than 20 characters";
	} else if (values.password.includes(" ")) {
		errors.password = "Invalid password";
	}

	// validate confirmed password
	if (!values.confirmPassword) {
		errors.confirmPassword = "Required";
	} else if (values.password !== values.confirmPassword) {
		errors.confirmPassword = "Passwords don't match";
	} else if (values.confirmPassword.includes(" ")) {
		errors.confirmPassword = "Invalid confirm password";
	}

	return errors;
};

export { loginValidate, registerValidate };
