import { Application, ApplicationArgs } from "./Application.js";
import { example0 } from "./Example0.js";
import { example1 } from "./Example1.js";

const examples: Record<string, ApplicationArgs> = {
  example0: example0,
  example1: example1,
};
let example: ApplicationArgs = example1;
for (const name in examples) {
  if (window.location.search === "?" + name) {
    example = examples[name];
    break;
  }
}
const application = new Application(example[0], example[1], example[2]);
application.render(); // just once, then gui changes trigger it
