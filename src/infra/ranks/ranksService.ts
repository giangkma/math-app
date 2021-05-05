import { ResultRank } from 'src/domain/ranks';
import { ApiService } from '../api/ApiService';
import { AuthService } from '../auth/authService';

interface Dependencies {
    apiService: ApiService;
    authService: AuthService;
}

export class RanksService {
    private apiService: ApiService;
    private authService: AuthService;

    constructor({ apiService, authService }: Dependencies) {
        this.apiService = apiService;
        this.authService = authService;
    }

    async APIfetchRanks(className: string): Promise<ResultRank[]> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authGet({
            url: `ranks/${className}`,
            userToken: { authToken: token },
        });

        return res;
    }
}
