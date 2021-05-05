import { QuestionType } from 'src/domain/question';
import { ApiService } from '../api/ApiService';
import { AuthService } from '../auth/authService';

interface Dependencies {
    apiService: ApiService;
    authService: AuthService;
}

export class QuestionsService {
    private apiService: ApiService;
    private authService: AuthService;

    constructor({ apiService, authService }: Dependencies) {
        this.apiService = apiService;
        this.authService = authService;
    }

    async APIfetchListQuestions(className: string): Promise<QuestionType[]> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authGet({
            url: 'questions',
            data: { className },
            userToken: { authToken: token },
        });

        return res;
    }

    async APIcheckAnwer(idQuestion: string, answer: string) {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authPost({
            url: `questions/${idQuestion}`,
            data: { answer },
            userToken: { authToken: token },
        });

        return res.json();
    }
}
