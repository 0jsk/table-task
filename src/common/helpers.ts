import rawUsers from '@/static/users.json';

export const setupMocks = () => {
    window.localStorage.setItem('users', JSON.stringify(rawUsers));
};
