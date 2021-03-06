// these functions call the /pages/api/... endpoints
import fetch from "isomorphic-unfetch";
import { Officer } from 'utils/types';

export const getOfficers = (officer: Officer) =>
  fetch("https://mindversity.vercel.app/api/officer/getOfficers", {
    method: "POST",
    mode: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(officer)
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


export const addOfficer = (form: FormData) =>
  fetch("https://mindversity.vercel.app/api/officer/addOfficer", {
    method: "POST",
    mode: "same-origin",
    body: form
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


export const deleteOfficer = (officer: Officer) =>
  fetch("https://mindversity.vercel.app/api/officer/deleteOfficer", {
    method: "POST",
    mode: "same-origin",
    body: JSON.stringify(officer)
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
