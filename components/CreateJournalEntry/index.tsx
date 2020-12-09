import React from "react";
import Link from "next/link";
import styles from "./create.module.scss";
import { FaArrowLeft } from "react-icons/fa";
import {BiImageAdd} from "react-icons/bi";
import dynamic from "next/dynamic"
import {useState} from "react";
const ReactQuill = dynamic(import('react-quill'), { ssr: false});

interface IFormValues {
    title?: string,
    description?: string,
    image?: File,
    body?: string,
    category?: string, 
    error?: boolean,
    [key: string]: any, //TypeScript throws a weird error with this. This is set to any for now, but it can be changed later. 
}


const CreateJournalEntry: React.FC = () => {
    const [values, setValues] = useState({} as IFormValues); //Used to store the various values that will be sent to the backend. 
    const [imageURL, setImageURL] = useState("");

    //Idea from: https://upmostly.com/tutorials/form-validation-using-custom-react-hooks
    const handleChange = (e:React.SyntheticEvent) => {
        e.persist();
        let target = e.target as HTMLInputElement;
        if(target != null){
            if(target.name == "image" && target.files != null){
                setValues(values => ({...values, [target.name]: target.files[0]}));
                handleImageURL(target.files[0]);
            } else {
                setValues(values => ({...values, [target.name]: target.value}));
            }
        }
    };

    const handleImageURL = (image: File) => {
        const fr = new FileReader();
        //If the user cancels their file upload, an error is thrown by NextJS. To fix this, we just check to make sure that a file has been uploaded before doing any URL processing.
        if(image != null){
            fr.onloadend = function(e:ProgressEvent<FileReader>) {
                if(e.target != null){
                    setImageURL(e.target.result as string);
                }
            }
            fr.readAsDataURL(image);
        }
        
    }
    const handleQuill = (content, delta, source, editor) => {
        //If the editor is empty, the only thing in it is a newline character. We don't want to send just newlines to the backend, so we do this.
        if(editor.getText() != "\n"){
            if(values.body){
                delete values.error;
            }
            setValues(values => ({...values, ["body"]: editor.getHTML()}));
        } else {
            delete values.body;
        }
    };
    const handleSubmit = async (e:React.SyntheticEvent) => {
        //There's no way to put a required tag on the quill editor, so we just check to make sure there's input in it before submitting.
        e.preventDefault();
        if(!values.body){
            setValues({...values, ["error"]: true});
        }
        if(!values.error){
            const fd = new FormData();
            let key:string;
            for(key in values){
                fd.append(key, values[key]);
            }
            const response = await fetch('/api/journal/create', {
                method: "POST",
                body: fd,
            });
            const data:JSON = await response.json();
            console.log(data);
        }

    }



    return(
        <section className={styles['container']}>
            <div className={styles['wrapper']}>
                <Link href='/journal'>
                    <a className={styles['breadcrumb']}>
                        <FaArrowLeft />
                        <span> Back to all posts</span>
                    </a>
                </Link>
                <form className={styles['create-form']} onSubmit={handleSubmit}>
                    <div className={styles['image-container']} style={imageURL ? {background: `url(${imageURL})`} : {background:'#EAE0F1'} }>
                        <div className={styles['icon-container']}>
                            <BiImageAdd className={styles['image-icon']}/>
                        </div>
                        <input type="file" name="image" className={styles['image-select']} onChange={handleChange} required/>
                    </div>
                    <div className={styles['text-container']}>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" placeholder="Title" onChange={handleChange} value={values.title || ""} required/>
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" placeholder="Description" onChange={handleChange} value={values.description || ""} required />
                        <label htmlFor="body">Body Paragraph</label>
                        <ReactQuill theme="snow" className={styles['editor']} placeholder="Enter your journal body here." onChange={handleQuill}/>
                        <div className={styles['select-container']}>
                            <span>Publish to: </span>
                            <select name="category" className={styles['category']} onChange={handleChange} required>
                                <option value="">Please select a category</option>
                                <option value="vent-place">Vent Place</option>
                                <option value="creative-space">Creative Space</option>
                            </select>
                        </div>
                    </div>
                    {values.error && (
                        <span className={styles['error']}>Please enter a body paragraph.</span>
                    )}
                    <button type="submit" className={styles['submit']}>Publish</button>
                </form>
            </div>
        </section>
    );
};

export default CreateJournalEntry;