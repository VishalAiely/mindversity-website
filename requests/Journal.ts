// these functions call the /pages/api/... endpoints
import fetch from "isomorphic-unfetch";
import { ContentfulImage, JournalEntry } from 'utils/types';

// TODO: create api endpoint for paginated entries so we dont have
// to pull all entries and process on the front end. fine for now
// though.

// assuming we only want to show reviewed entries by default
export const getEntries = () =>
  fetch("https://mindversity.vercel.app/api/journal/getByReviewStatus?reviewed=true", {
    method: "GET",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => response.json())
  .then((data) => {
    if (!data) {
      throw new Error("Could not connect to API!");
    }
    return data.payload;
  });

export const getEntriesByType = async (type: any) => {
  if (!type) return await getEntries()
  return fetch(`https://mindversity.vercel.app/api/journal/getByType?type=${type}`, {
    method: "GET",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => (response.json()))
  .then((data) => {
    if (!data) {
      throw new Error("Could not connect to API!");
    }
    return data.payload;
  });
}

export const getPostById = async (id: any) => (
  fetch(`https://mindversity.vercel.app/api/journal/getById?id=${id}`, {
    method: "GET",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => (response.json()))
  .then((data) => {
    if (!data) {
      throw new Error("Could not connect to API!");
    }
    return data.payload;
  })
)