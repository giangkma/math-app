import * as awilix from 'awilix';

import makeApiService, { ApiService } from 'src/infra/api/ApiService';
import { AuthService } from './infra/auth/authService';
import { QuestionsService } from './infra/questions/questionsService';
import { RanksService } from './infra/ranks/ranksService';
import { ReportService } from './infra/report/reportService';

export interface Cradle {
    apiService: ApiService;
    authService: AuthService;
    questionsService: QuestionsService;
    ranksService: RanksService;
    reportService: ReportService;
}

// Create the container and set the injectionMode to PROXY (which is also the default).
const container = awilix.createContainer<Cradle>();

/* ------------- Infra ------------- */
container
    // services
    .register({
        apiService: awilix.asFunction(makeApiService).singleton(),
        authService: awilix.asClass(AuthService).singleton(),
        questionsService: awilix.asClass(QuestionsService).singleton(),
        ranksService: awilix.asClass(RanksService).singleton(),
        reportService: awilix.asClass(ReportService).singleton(),
    })
    // repositories
    .register({
        // consumerRepository: awilix.asClass(ConsumerRepository).singleton(),
    });

/* ------------- App ------------- */
container
    // commit
    .register({});

export default container;
