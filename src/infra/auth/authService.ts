import {
    AuthToken,
    DataLogin,
    DataRegister,
    ResponseAuth,
    User,
} from 'src/domain/user';
import { TypedEvent } from 'src/helper/event';
import Cookies from 'universal-cookie';
import { ApiService } from '../api/ApiService';

interface Dependencies {
    apiService: ApiService;
}
const TOKEN_COOKIE_KEY = 'token';

export class AuthService {
    private apiService: ApiService;

    private onTokenChange = new TypedEvent<AuthToken | undefined>();

    private cookies = new Cookies();

    constructor({ apiService }: Dependencies) {
        this.apiService = apiService;
    }

    login(data: DataLogin): Promise<ResponseAuth> {
        return this.apiService.post({
            url: 'auth/login',
            data,
        });
    }

    register(data: DataRegister): Promise<ResponseAuth> {
        return this.apiService.post({
            url: 'auth/register',
            data,
        });
    }

    getUserProfile(token: string): Promise<User> {
        return this.apiService.authGet({
            url: 'auth/getUserInfo',
            userToken: { authToken: token },
        });
    }

    saveToken = (token: AuthToken): void => {
        // save token to browser cookies
        this.cookies.set(TOKEN_COOKIE_KEY, token, { path: '/' });

        // token listener cb execute
        this.onTokenChange.emit(token);
    };

    getToken = (): AuthToken => {
        // get token from browser cookies
        const token = this.cookies.get<AuthToken>(TOKEN_COOKIE_KEY);

        if (!token) return '';

        return token;
    };

    removeToken = (): void => {
        // get token from browser cookies
        this.cookies.remove(TOKEN_COOKIE_KEY);

        // token listener cb execute
        this.onTokenChange.emit(undefined);
    };
}
