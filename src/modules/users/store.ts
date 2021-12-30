import UsersService, { User } from '@/services/users.service';
import { Module } from 'vuex';

export interface UsersState {
    users: User[]
}

export default {
    namespaced: true,
    state: {
        users: []
    },
    mutations: {
        add(state, user: User) {
            state.users = [...state.users, user];
        },
        set(state, users: User[]) {
            state.users = [...users];
        }
    },
    actions: {
        queryAll({ commit }) {
            const users = UsersService.getUsers();

            commit('set', users);
        },
        addUser({ commit }, user: User) {
            const updatedUsers = UsersService.addUser(user);

            commit('set', updatedUsers);
        }
    }
} as Module<UsersState, UsersState>;
