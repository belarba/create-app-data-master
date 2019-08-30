import { Selector } from "testcafe";

fixture`CreateApp`.page`http://localhost:8080/`;

test("NameCloseKeep", async t => {
  await t
    .typeText(Selector("#customInput"), "My new App")
    .pressKey("tab")
    .click(Selector("button").withText("X"))
    .click(Selector("button").withText("No"))
    .expect(Selector("#customInput").value)
    .eql("My new App");
});
