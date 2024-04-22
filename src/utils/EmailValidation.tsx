const isValidEmail = (email: string): boolean => {
	// regexp for validating emails
	const emailValidation = /(.+)@(.+){2,}\.(.+){2,}/;
	// test the expression against the email
	return emailValidation.test(email);
};

export { isValidEmail };
