<template>
    <c-modal
        :is-open="isOpen"
        :on-close="close"
    >
        <c-modal-content>
            <c-modal-header>Добавление пользователя</c-modal-header>
            <c-modal-close-button />
            <c-modal-body>
                <c-form-control>
                    <c-grid w="100%"
                            template-rows="repeat(3, 1fr)"
                            template-columns="min-content 1fr"
                            row-gap="12px">
                        <c-form-label for="name">Имя</c-form-label>
                        <c-input v-model="name" type="text" id="name" is-required />
                        <c-form-label for="tel">Телефон</c-form-label>
                        <c-input v-model="phone" type="tel" id="tel" is-required />
                        <c-form-label for="chief">Начальник</c-form-label>
                        <c-select v-model="chiefId" id="country" placeholder="Без начальника">
                            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
                        </c-select>
                    </c-grid>
                </c-form-control>
            </c-modal-body>
            <c-modal-footer>
                <c-button variant-color="blue" :disabled="!canSubmit" @click="submit">
                    Сохранить
                </c-button>
            </c-modal-footer>
        </c-modal-content>
        <c-modal-overlay />
    </c-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'AddUserModal',
    props: {
        isOpen: {
            type: Boolean,
            required: true
        },
    },
    data() {
        return this.initialData();
    },
    computed: {
        ...mapState('users', ['users']),
        canSubmit() {
            return Boolean(this.name && this.phone);
        }
    },
    methods: {
        ...mapActions('users', ['addUser']),
        initialData() {
            return {
                name: '',
                phone: '',
                chiefId: null
            };
        },
        reset() {
            Object.assign(this.$data, this.initialData());
        },
        close() {
            this.reset();
            this.$emit('close');
        },
        submit() {
            const user = {
                name: this.name,
                phone: this.phone,
                chief: this.users.find(user => user.id === this.chiefId)
            };

            this.addUser(user);
            this.close();
        }
    }
};
</script>
