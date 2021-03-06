// these functions call the /pages/api/... endpoints
import fetch from "isomorphic-unfetch";
import { Chapter } from 'utils/types'

export const getChapters = (chapter: Chapter) =>
  fetch("https://mindversity.vercel.app/api/chapter/getChapters", {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chapter)
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });

export const addChapter = (chapterFormData: FormData) =>
    fetch("https://mindversity.vercel.app/api/chapter/addChapter", {
      method: "POST",
      mode: "same-origin",
      body: chapterFormData
    })
      .then((response) => response.json())
      .then((json) => {
        if (json == null) {
          throw new Error("Could not connect to API!");
        } else if (!json.success) {
          throw new Error(json.message);
        }
  
        return json.payload;
      });
    

export const updateChapter = (chapterFormData: FormData) =>
  fetch("https://mindversity.vercel.app/api/chapter/updateChapter", {
    method: "PUT",
    mode: "same-origin",
    body: chapterFormData
  })
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error("Could not connect to API!");
      } else if (!json.success) {
        throw new Error(json.message);
      }

      return json.payload;
    });
