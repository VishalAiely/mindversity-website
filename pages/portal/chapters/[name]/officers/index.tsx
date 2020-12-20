import { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { getOfficers } from "requests/Officer";
import { Officer } from 'utils/types';

import Navigation from "components/Portal/Navigation";
import OfficerCard from "components/Portal/OfficerCard";

interface Props {
    officer: Officer[];
}

const Officers: NextPage<Props> = ({officer}) => {
    return (
        <div className="container">
            <Head>
                <title>MindVersity | Admin Portal</title>
                <link rel="icon" href="/favicon.ico" />-
            </Head>

            <Navigation />

            <div className="bodyContent">
                <h1>Edit Officers</h1>
                <div className="newChapterBtnParent">
                    <a href="officers/create" className="newChapterBtn">New Officer</a>
                </div>
                <div className="chaptersContainer">
                    { //Display all of the chapters from the database
                        officer && (
                            officer.map(officer => {
                                return(
                                    <OfficerCard officer={officer}/>
                                )
                            })
                        )
                    }
                </div>
            </div>

            <style jsx>{`
                .container{
                    padding-top: 50px;
                    text-align: left;
                }

                @media screen and (min-width: 1000px){
                    .bodyContent{
                        width: auto;
                        height: auto;
                        position: relative;
                        display: body;
                        margin-left: 375px;
                    }
                }

                h1{
                    color: black;
                    padding: 0px 40px;
                }

                .newChapterBtnParent {
                    width: auto;
                    height: auto;
                    position: relative;
                    display: block;
                    text-align: left;
                    padding: 0px 40px;
                    margin-bottom: 20px;
                }

                .newChapterBtn {
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

                .newChapterBtn:hover {
                    cursor: pointer;
                    background-color: #b59ccc;
                }

                .chaptersContainer{
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
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
                        Helvetica Neue, sans-serif;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>
        </div>
    );
};

//Get all of the chapters
Officers.getInitialProps = async ( context: NextPageContext ) => {
    //Query to get all of the officers
    let officerQuery: Officer = new Object;
    officerQuery.chapter = context.query.name as string;
    var officers: Officer[] = await getOfficers(officerQuery);
    //Return the officers
    return {
        officer: officers,
    }
}

export default Officers;