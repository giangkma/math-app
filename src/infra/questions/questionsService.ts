import { QuestionPayload, QuestionType } from 'src/domain/question';
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

    async APIcreateQuestion(payload: QuestionPayload): Promise<QuestionType> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authPost({
            url: 'questions',
            data: [payload],
            userToken: { authToken: token },
        });

        return res;
    }

    async APIupdateQuestion(
        id: string,
        payload: QuestionPayload,
    ): Promise<QuestionType> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authPut({
            url: `questions/${id}`,
            data: payload,
            userToken: { authToken: token },
        });

        return res;
    }

    async APIcreateQuestionsExcel(formData: any, className: string) {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authPost({
            url: `questions/${className}/xlsx-create`,
            body: formData,
            userToken: { authToken: token },
        });

        return res.json();
    }

    async APIfetchOneQuestion(id: string): Promise<QuestionType | undefined> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authGet({
            url: `questions/${id}`,
            userToken: { authToken: token },
        });

        return res;
    }

    async APIfetchListQuestions(
        className: string,
        chapter: string | undefined,
    ): Promise<QuestionType[]> {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authGet({
            url: 'questions',
            data: { className, chapter },
            userToken: { authToken: token },
        });

        return res;
    }

    async APIcheckAnwer(
        idQuestion: string,
        answer: string,
        updateScore: boolean,
    ) {
        // get auth token
        const token = await this.authService.getToken();
        const res = await this.apiService.authPost({
            url: `questions/${idQuestion}`,
            data: { answer, updateScore },
            userToken: { authToken: token },
        });
        return res.json();
    }
}
