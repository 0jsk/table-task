<template>
    <default-layout>
        <c-flex w="50%" direction="column">
            <c-button align-self="flex-end" mb="8px" @click="isAddModalOpen = true">Добавить</c-button>
            <b-table :rows="usersForTable">
                <b-table-column prop="name" title="Имя">
                    <template #body="{ row }">
                        <c-flex :ml="row.chief ? `${row.level * 12}px` : '0'"
                                :class="{ 'clickable': row.hasChildren }"
                                @click="toggleSort(row)">
                            <c-box v-if="row.chief || row.hasChildren" mr="2px">+</c-box>
                            <span>{{ row.name }}</span>
                        </c-flex>
                    </template>
                </b-table-column>
                <b-table-column prop="phone" title="Телефон"/>
            </b-table>
        </c-flex>
        <add-user-modal :is-open="isAddModalOpen" @close="isAddModalOpen = false"/>
    </default-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { BTable, BTableColumn } from '@/common/components';
import AddUserModal from '@/modules/users/components/modals/AddUser';
import DefaultLayout from '@/layouts/Default.vue';

export default {
    name: 'Users',
    created() {
        this.queryAll();
    },
    components: {
        DefaultLayout,
        BTable,
        BTableColumn,
        AddUserModal
    },
    data() {
        return {
            isAddModalOpen: false,
            sortOptions: {}
        };
    },
    computed: {
        ...mapState('users', ['users']),
        usersForTable() {
            const makeSortedTree = (users, level = 0) => {
                return users.reduce((acc, user) => {
                    if (acc.find(u => user.id === u.id)) {
                        return acc;
                    }

                    const sortOption = this.sortOptions?.[user.id];
                    const children = this.users.filter(u => u.chief?.id === user.id);
                    const sortedChildren = sortOption ? this.sortUsers(sortOption, children) : children;

                    const childrenWithLevel = children?.length ? makeSortedTree(sortedChildren, level + 1) : [];

                    const normalizedUser = {
                        ...user,
                        level,
                        hasChildren: Boolean(childrenWithLevel?.length),
                    };


                    return [
                        ...acc,
                        {
                            ...user,
                            level,
                            hasChildren: Boolean(childrenWithLevel?.length),
                        },
                        ...childrenWithLevel
                    ];
                }, []);
            };

            return makeSortedTree(this.users);
        }
    },
    methods: {
        ...mapActions('users', ['queryAll']),
        toggleSort(row) {
            this.$set(this.sortOptions, row.id, this.sortOptions?.[row.id] === 'asc' ? 'desc' : 'asc');
        },
        sortUsers(order, users) {
            const ascSortedUsers = users.sort((a, b) => a.name.localeCompare(b.name));

            return order === 'asc' ? ascSortedUsers : ascSortedUsers.reverse();
        }
    }
};
</script>

<style scoped>
.clickable {
    cursor: pointer;
}
</style>
