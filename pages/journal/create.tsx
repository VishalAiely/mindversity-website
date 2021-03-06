import { NextPage } from "next";
import Head from "next/head";
import Footer from "components/Footer";
import Header from "components/Header";
import CreateJournalEntry from "components/CreateJournalEntry";

const Create: NextPage = () => {
    return (
        <main>
            <Head>
                <title>Create A New Journal Entry | MindVersity - A peer mental health network.</title>
                <meta name="description" content="Let your message be heard by anonymously creating a journal entry in one of three categories." />
            </Head>
            <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
            <Header />
            <CreateJournalEntry />
            <Footer />
            <style jsx global>
                {`
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
                `}
            </style>
        </main>
    );
};

export default Create;
