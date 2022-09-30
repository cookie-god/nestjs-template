import { Injectable } from '@nestjs/common';
import {GetUsersRequest} from "./dto/request/get-users.request";
import {GetUsersDetailRequest} from "./dto/request/get-users-detail.request";

@Injectable()
export class UserQuery {
    retrieveUsers = (getUsersRequest: GetUsersRequest, offset: number) => {
        let conditionFlag = false;
        let retrieveUsersQuery = `
            select id,
                   email,
                   phoneNumber,
                   nickname,
                   createdAt,
                   status
            from UserInfo
    `

        if (getUsersRequest.nickname != undefined) {
            retrieveUsersQuery += `\nwhere `
        }

        if (getUsersRequest.nickname != undefined) {
            // @ts-ignore
            if (conditionFlag === true) { // 여러 조건을 붙이는 경우 필요
                retrieveUsersQuery += ` and `
            }
            retrieveUsersQuery += `nickname like'%${getUsersRequest.nickname}%'`
            conditionFlag = true;
        }

        if (getUsersRequest.sortType != undefined) {
            retrieveUsersQuery += `\norder by UserInfo.createdAt ${getUsersRequest.sortType}`
        }

        let retrieveUsersCountQuery = retrieveUsersQuery + ';';

        const pageQuery = `
            limit ${offset}, ${getUsersRequest.size};
        `

        retrieveUsersQuery += pageQuery;
        return {
            retrieveUsersQuery: retrieveUsersQuery,
            retrieveUsersCountQuery: retrieveUsersCountQuery,
        };
    };

    retrieveUserById = (getUsersDetailRequest: GetUsersDetailRequest) => {
        return `
            select id,
                   email,
                   phoneNumber,
                   nickname,
                   createdAt,
                   status
            from UserInfo
            where id = ${getUsersDetailRequest.userId};
        `;
    }
}
