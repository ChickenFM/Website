const routes = [{
        path: "/",
        component: window.httpVueLoader("/components/Player.vue"),
        props: {
            data: metadata
        }
    },
    {
        path: "/songrequest",
        component: window.httpVueLoader("/components/SongRequest.vue"),
        props: {
            data: metadata
        }
    },
    {
        path: "/sendmesssage",
        component: window.httpVueLoader("/components/SendMessage.vue"),
    }
];

const router = new VueRouter({
    routes,
    linkExactActiveClass: "active"
});

const app = new Vue({
    router
}).$mount("#app");