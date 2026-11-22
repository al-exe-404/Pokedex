import { mount } from "svelte";
import App from "./App.svelte";
import "./app.css";

// mount : affiche le composant App dans <div id="app"> (défini dans index.html)
const target = document.getElementById("app");
mount(App, { target });