import { Selector } from 'testcafe';

fixture `CreateApp`
    .page `http://localhost:8080/`;

test('CreateApp', async t => {
    await t
        .typeText(Selector('#customInput'), 'My new App')
        .click(Selector('button').withText('SELECT A FILE'))
        .setFilesToUpload(Selector('.file-container').find('input').nth(1), ['/Users/danielbelarmino/TestCafeStudio/localhost-8080/_uploads_/logo 1 1 1 1 1.png'])
        .click(Selector('.current-color'))
        .click(Selector('.vc-saturation--black'))
        .click(Selector('.left'))
        .click(Selector('.select-container').find('select'))
        .click(Selector('option').withText('Educational'))
        .click(Selector('button').withText('SAVE APP'))
        .expect(Selector('#swal2-title').innerText).eql("Success!");
});