// Interfaces declaration for dependency inversion

import { User } from '.';

export interface UserRepository {
    /**
     * Get current logged in user
     *
     * @memberof IUserRepository
     */
    getMe: () => Promise<User>;

    /**
     * Get specific user by id
     *
     * @memberof IUserRepository
     */
    APIgetById: (id: string) => Promise<User>;

    /**
     * select google ads account
     *
     * @memberof IUserRepository
     */
}
