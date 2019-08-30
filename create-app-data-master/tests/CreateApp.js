import { Selector } from "testcafe";

fixture`CreateApp`.page`http://localhost:8080/`;

test("CreateApp", async t => {
  await t
    .typeText(Selector("#customInput"), "My new App")
    .setFilesToUpload(
      Selector("input").withAttribute("type", "file"),
      "logo.png"
    )
    .setFilesToUpload("#customInputFile", "logo.png")
    // .setFilesToUpload(Selector("input").withAttribute('type','file'), "../src/assets/icon.png")
    .wait(5000)
    // .click(Selector("button").withText("SELECT A FILE"))
    // .setFilesToUpload("#customInputFile", "logo.png")
    // .click(Selector('#customInputFile'))
    // .debug()
    .click(Selector(".current-color"))
    .click(Selector(".vc-saturation--black"))
    .click(Selector(".left"))
    .click(Selector(".select-container").find("select"))
    .click(Selector("option").withText("Educational"))
    .click(Selector("button").withText("SAVE APP"))
    .expect(Selector("#swal2-title").innerText)
    .eql("Success!");
});
