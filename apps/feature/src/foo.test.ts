import { setTimeout } from "node:timers/promises";

it("long test", async () => {
  await setTimeout(5000);
}, 10000);
