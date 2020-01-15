<template>
<v-app>
    <div style="text-align: center; margin-top: 20%;">
        <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
        </h1>
        <h1 v-else>
            {{ otherError }}
        </h1>
        <v-btn to="/">Home page</v-btn>
     
    </div>
</v-app>
</template>

<script>
export default {
    layout: 'nolayout',
    props: {
        error: {
            type: Object,
            default: null
        }
    },
    head() {
        const title =
            this.error.statusCode === 404 ? this.pageNotFound : this.otherError
        return {
            title
        }
    },
    data() {
        return {
            pageNotFound: '404 Not Found',
            otherError: 'An error occurred'
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 25px;
}
</style>
