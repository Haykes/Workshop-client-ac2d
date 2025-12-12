export interface LoginRequestDto {
        email: string;
        password: string;
}

export interface AuthUserDto {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        roles: string[];
}

export interface LoginResponseDto {
        success: boolean;
        user: AuthUserDto | null;
        message?: string;
}

export interface SessionResponseDto {
        authenticated: boolean;
        user?: AuthUserDto;
}


