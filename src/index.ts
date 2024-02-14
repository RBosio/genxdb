#!/usr/bin/env node

import { app } from "./app.js";
import { setTitle } from "./title.js";

const init = () => {
  console.clear();
  setTitle();

  app();
};

init();
