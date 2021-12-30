<template>
  <c-theme-provider>
    <c-reset />
    <users />
  </c-theme-provider>
</template>

<script>
import Users from '@/views/Users';

export default {
    name: 'App',
    components: {
        Users
    }
};
</script>
