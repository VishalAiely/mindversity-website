import fetch from "isomorphic-unfetch"
import { Resource } from "utils/types";

export const getResources = async (resource: Resource) => 
    fetch('https://mindversity-website-test-2z20mnzro.vercel.app/api/resource/getResource', {
        method: "POST",
        mode: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resource)
    }).then(response => response.json()).then((json) => {
        if (json == null) {
            throw new Error("Could not connect to API!");
        } else if (!json.success) {
            throw new Error(json.message);
        }

        return json.resources;
    });


export const addResources = async (resource: Resource) => {
    fetch('https://mindversity-website-test-2z20mnzro.vercel.app/api/resource/addResource', {
        method: "POST",
        mode: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resource)
    }).then(response => response.json()).then((json) => {
        if (json == null) {
            throw new Error("Could not connect to API!");
        } else if (!json.success) {
            throw new Error(json.message);
        }

        return json.resources;
    })
}
export const deleteResources = async (resource: Resource) => {
    fetch('https://mindversity-website-test-2z20mnzro.vercel.app/api/resource/deleteResource', {
        method: "POST",
        mode: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resource)
    }).then(response => response.json()).then((json) => {
        if (json == null) {
            throw new Error("Could not connect to API!");
        } else if (!json.success) {
            throw new Error(json.message);
        }

        return json.resources;
    })
}

export const updateResources = async (resource: Resource) => {
    fetch('https://mindversity-website-test-2z20mnzro.vercel.app/api/resource/updateResource', {
        method: "POST",
        mode: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(resource)
    }).then(response => response.json()).then((json) => {
        if (json == null) {
            throw new Error("Could not connect to API!");
        } else if (!json.success) {
            throw new Error(json.message);
        }

        return json.resources;
    })
}