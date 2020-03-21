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
    },
    {
        path: "/lyrics",
        component: window.httpVueLoader("/components/Lyrics.vue"),
        props: {
            metadata
        }
    }
];

const router = new VueRouter({
    routes,
    linkExactActiveClass: "active"
});

const app = new Vue({
    router
}).$mount("#app");