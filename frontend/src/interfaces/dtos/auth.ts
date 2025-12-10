export interface LoginRequestDto {
	username: string;
	password: string;
}

export interface LoginResponseDto {
	success: boolean;
	user: {
		id: number;
		email: string;
		name: string;
		roles: string[];
	} | null;
}


