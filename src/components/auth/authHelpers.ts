import { MIN_PASSWORD_LENGTH } from "./MIN_PASSWORD_LENGTH";

export const validatePassword = (event: any, password: string): void => {
	const target = event.target as HTMLInputElement;
	// Matches Min length, at least 1 uppercase, at least 1 lowercase and at least 1 number
	const regex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{${MIN_PASSWORD_LENGTH},})`);

	if (regex.test(password)) {
		target.setCustomValidity("");
	}
	else {
		target.setCustomValidity("invalid");
	}
};

export const validateConfirmPassword = (event: any, newPassword: string, password: string): void => {
	const target = event.target as HTMLInputElement;
	
	validatePassword(event, newPassword);

	if (newPassword === password) {
		target.setCustomValidity("");
	}
	else {
		target.setCustomValidity("invalid");
	}
};