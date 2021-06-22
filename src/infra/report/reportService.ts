import { ResultReport } from 'src/domain/report';
import { ApiService } from '../api/ApiService';
import { AuthService } from '../auth/authService';

interface Dependencies {
    apiService: ApiService;
    authService: AuthService;
}

export class ReportService {
    private apiService: ApiService;
    private authService: AuthService;

    constructor({ apiService, authService }: Dependencies) {
        this.apiService = apiService;
        this.authService = authService;
    }

    async APIsendReport(questionId: string): Promise<any> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authPost({
            url: `report/${questionId}`,
            userToken: { authToken: token },
        });

        return res;
    }

    async APIgetAllReport(): Promise<ResultReport[]> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authGet({
            url: `report`,
            userToken: { authToken: token },
        });

        return res;
    }
}
