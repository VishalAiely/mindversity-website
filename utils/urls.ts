const prod = process.env.NODE_ENV === "production";

export default {
    baseUrl: prod ? (process.env.PROD_URL as string) : "http://localhost:3000",
    dbUrl: process.env.MONGO_DB ?? "mongodb://localhost:27017",
    pages: {
        index: "/",
        passwordReset: "portal/password-reset",
        newPassword: "portal/new-password",
        journal: {
            index: "/journal",
            create: "/journal/create",
        },
    },
    api: {
        admin: {
            login: "/api/admin/login",
            signup: "/api/admin/signup",
            forgotPass: "/api/admin/forgotPass",
            resetPass: "/api/admin/resetPass",
            validateLogin: "/api/admin/validateLogin",
        },
        blog: {
            get: "/api/blog/getBlog",
        },
        chapter: {
            add: "/api/chapter/addChapter",
            get: "/api/chapter/getChapter",
            update: "/api/chapter/updateChapter",
        },
        officer: {
            get: "/api/officer/getOfficers",
        },
        resource: {
            add: "/api/resource/addResource",
            get: "/api/resource/getResource",
            update: "/api/resource/updateResource",
            delete: "/api/resource/deleteResource",
        },
    },
};
