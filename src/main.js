import { createApp } from "vue";
import App from "./App.vue";
import "./assets/styles/main.css";

const app = createApp(App);

app.config.errorHandler = (err, instance, info) => {
  console.error("Vue error:", err, info);
};

app.mount("#app");
