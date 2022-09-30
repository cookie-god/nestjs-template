import { Injectable } from '@nestjs/common';
import { defaultCurrentDateTime } from 'common/function.utils';
import { errorLogger } from 'config/logger/logger.function';
import { Status } from 'common/variable.utils';
import { RESPONSE } from 'config/response.utils';
import { DataSource } from 'typeorm';
import { ApiCallHistory } from './entity/api-call-history.entity';
const location = __dirname + '/api-save.service.ts';
let currentFunction;

@Injectable()
export class ApiSaveService {
    constructor(private connection: DataSource) {}

    async saveApiCallHistory(
        historyType: string,
        userType: string,
        userId: number,
        apiName: string,
        req: any,
        res: any,
    ) {
        currentFunction = 'saveApiCallHistory';
        let password;
        let confirmPassword;
        if (req.body.password) {
            password = req.body.password;
            req.body.password = '****';
        }
        if (req.body.confirmPassword) {
            confirmPassword = req.body.confirmPassword;
            req.body.confirmPassword = '****';
        }
        const requestQueryJson = JSON.stringify(req.query);
        const requestBodyJson = JSON.stringify(req.body);
        const requestPathJson = JSON.stringify(req.params);
        const responseJson = JSON.stringify(res);
        const savedId = userId;
        try {
            const queryRunner = this.connection.createQueryRunner();
            await queryRunner.connect();
            try {
                const apiCallHistory = new ApiCallHistory();
                apiCallHistory.historyType = historyType;
                apiCallHistory.userType = userType;
                apiCallHistory.savedId = savedId;
                apiCallHistory.apiUri = req.url;
                apiCallHistory.apiName = apiName;
                apiCallHistory.apiMethod = req.method;
                apiCallHistory.requestQuery = requestQueryJson;
                apiCallHistory.requestBody = requestBodyJson;
                apiCallHistory.requestPath = requestPathJson;
                apiCallHistory.response = responseJson;
                apiCallHistory.status = Status.ACTIVE;
                apiCallHistory.createdAt = defaultCurrentDateTime();
                if (req.body.password) {
                    req.body.password = password;
                }
                if (req.body.confirmPassword) {
                    req.body.confirmPassword = confirmPassword;
                }
                await queryRunner.startTransaction();
                await queryRunner.manager.save(apiCallHistory);
                await queryRunner.commitTransaction();
            } catch (error) {
                errorLogger(error, location, currentFunction);
                await queryRunner.rollbackTransaction();
            } finally {
                await queryRunner.release();
            }
        } catch (error) {
            errorLogger(error, location, currentFunction);
        }
    }
}
