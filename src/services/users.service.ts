import localStorage from '@/common/localStorage.utils';
import { setupMocks } from '@/common/helpers';
import { v4 as uuid } from 'uuid';

export type User = {
    id: UniqueId
    name: string
    phone: string
    chief: User  | null
}

const USERS_STORAGE_KEY = 'users';

const getUsers = (): User[] => {
    const storageUsers = localStorage.get(USERS_STORAGE_KEY);

    if (!storageUsers) {
        setupMocks();

        return localStorage.get(USERS_STORAGE_KEY) as User[];
    }

    return storageUsers as User[];
};

const setUsers = (users: User[]): User[] => {
    localStorage.set(USERS_STORAGE_KEY, users);

    return localStorage.get(USERS_STORAGE_KEY) as User[];
};

const addUser = (user: Omit<User, 'id'>): User[] => {
    const newUser = {
        ...user,
        id: uuid(),
    };

    const users = localStorage.get(USERS_STORAGE_KEY) as User[];
    localStorage.set(USERS_STORAGE_KEY, [...users, newUser]);

    return localStorage.get(USERS_STORAGE_KEY) as User[];
};

export default {
    getUsers,
    setUsers,
    addUser
};
