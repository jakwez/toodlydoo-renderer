import { Application, ApplicationArgs } from "./Application.js";
import { example0 } from "./Example0.js";
import { example1 } from "./Example1.js";
import { example2 } from "./Example2.js";

const examples: Record<string, ApplicationArgs> = {
  example0: example0,
  example1: example1,
  example2: example2,
};
let example: ApplicationArgs = example2;
for (const name in examples) {
  if (window.location.search === "?" + name) {
    example = examples[name];
    break;
  }
}
const application = new Application(...example);
application.render(); // just once, then gui changes trigger it
