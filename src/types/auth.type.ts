export interface ILogin {
    email: string;
    password: string;
}
export interface User {
    id: string;
    email: string;
    role: string;
    first_name: string;
    last_name: string;
    profileUrl?: string
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isLoading: boolean;
}
