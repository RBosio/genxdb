#!/usr/bin/env node

import { app } from "./app.js";
import { setTitle } from "./title.js";

const init = async () => {
  console.clear();
  setTitle();

  app();
};

init();
