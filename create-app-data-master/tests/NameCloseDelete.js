import { Selector } from "testcafe";
import scenario from "../package.json";

fixture`CreateApp`.page`${scenario.baseURL}`;

test("NameCloseDelete", async t => {
  await t
    .click(Selector("#customInput"))
    .typeText(Selector("#customInput"), "My new App")
    .pressKey("tab")
    .click(Selector("button").withText("X"))
    .click(Selector("button").withText("Yes Delete it"))
    .expect(Selector("#customInput").value)
    .eql("");
});
