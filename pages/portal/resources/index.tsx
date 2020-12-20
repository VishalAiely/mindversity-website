import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { getResources } from "server/actions/Resource";
import { Resource } from "utils/types";
import { ObjectID } from "mongodb";
import Navigation from "components/Portal/Navigation";
import ResourceCardComp from "components/Portal/ResourceCard";
import { useState } from "react";
import urls from "utils/urls";
import Router from "next/router";

interface Props {
    resource: Resource[];
}

const Resources: NextPage<Props> = ({ resource }) => {
    const [resourcesList, setResourceList] = useState(resource);

    const handleDelete = async (id: ObjectID | undefined) => {
        if (id === undefined) return;

        const response = await fetch(`${urls.baseUrl}${urls.api.resource.delete}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                _id: id,
            }),
        });

        const newResourceList = resourcesList.filter(resourceItem => resourceItem._id !== id);
        setResourceList(newResourceList);
    };

    return (
        <div className="container">
            <Head>
                <title>MindVersity | Admin Portal</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navigation />

            <div className="bodyContent">
                <h1>Edit Resources</h1>
                <div className="newResourceBtnParent">
                    <a href="resources/create" className="newResourceBtn">
                        New Resource
                    </a>
                </div>
                <div className="resourcesContainer">
                    {resourcesList &&
                        resourcesList.map((reso, i) => {
                            return <ResourceCardComp key={i} reso={reso} onDelete={handleDelete} />;
                        })}
                </div>
            </div>

            <style jsx>{`
                .container {
                    padding-top: 50px;
                    text-align: left;
                }

                @media screen and (min-width: 1000px) {
                    .bodyContent {
                        width: auto;
                        height: auto;
                        position: relative;
                        display: body;
                        margin-left: 375px;
                    }
                }

                h1 {
                    color: black;
                    padding: 0px 40px;
                }

                .newResourceBtnParent {
                    width: auto;
                    height: auto;
                    position: relative;
                    display: block;
                    text-align: left;
                    padding: 0px 40px;
                    margin-bottom: 20px;
                }

                .newResourceBtn {
                    height: auto;
                    width: auto;
                    padding: 10px 40px;
                    position: relative;
                    display: inline-block;
                    border: none;
                    font-size: 16px;
                    margin-top: 20px;
                    outline: none;
                    border-radius: 6px;
                    background-color: #8c69aa;
                    color: white;
                    text-decoration: none;
                    transition: background 0.5s ease;
                }

                .newResourceBtn:hover {
                    cursor: pointer;
                    background-color: #b59ccc;
                }

                .resourcesContainer {
                    width: 100%;
                    height: auto;
                    position: relative;
                    display: block;
                    padding: 20px 40px;
                    text-align: center;
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
                        Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
};

export async function getServerSideProps(context: NextPageContext) {
    const cookie = context.req?.headers.cookie;

    //Since this is client side only absolute URLs are supported
    //TODO: need to change url off of localhost in production
    const resp = await fetch("http://localhost:3000/api/admin/validateLogin", {
        headers: {
            cookie: cookie!,
        },
    });

    if (resp.status === 401 && !context.req) {
        void Router.replace("/portal/login");
        return { props: {} };
    }

    if (resp.status === 401 && context.req) {
        context.res?.writeHead(302, {
            //TODO: same here
            Location: "http://localhost:3000/",
        });
        context.res?.end();
        return { props: {} };
    }

    const resources: Resource[] = await getResources({});

    console.log(resources);

    return { props: { resource: JSON.parse(JSON.stringify(resources)) as Resource[] } };
}

export default Resources;
