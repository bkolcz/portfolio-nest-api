import { Injectable } from '@nestjs/common';
import { User } from './users.interface';

const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
    async findOne(username: string): Promise<User | undefined> {
        // TODO not hardcoded users
        // return {userId: 1, username: username, password: await bcrypt.hash('admin',10)};
        return {userId: 1, username: username, password: 'admin'};
    }
}
