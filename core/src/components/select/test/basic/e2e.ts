import { newE2EPage } from '@stencil/core/testing';

test('select: basic', async () => {
  const page = await newE2EPage({
    url: '/src/components/select/test/basic?ionic:_testing=true'
  });

  const compares = [];
  compares.push(await page.compareScreenshot());

  // Gender Alert Select
  let select = await page.find('#gender');
  await select.click();

  let alert = await page.find('ion-alert');
  await alert.waitForVisible();
  await page.waitForTimeout(250);

  compares.push(await page.compareScreenshot('should open gender single select'));

  await alert.callMethod('dismiss');

  // Skittles Action Sheet Select
  select = await page.find('#skittles');
  await select.click();

  let actionSheet = await page.find('ion-action-sheet');
  await actionSheet.waitForVisible();
  await page.waitForTimeout(250);

  compares.push(await page.compareScreenshot('should open skittles action sheet select'));

  await actionSheet.callMethod('dismiss');

  // Custom Alert Select
  select = await page.find('#customAlertSelect');
  await select.click();

  alert = await page.find('ion-alert');
  await alert.waitForVisible();
  await page.waitForTimeout(250);

  compares.push(await page.compareScreenshot('should open custom alert select'));

  await alert.callMethod('dismiss');

  // Custom Popover Select
  select = await page.find('#customPopoverSelect');
  await select.click();

  let popover = await page.find('ion-popover');
  await popover.waitForVisible();
  await page.waitForTimeout(250);

  compares.push(await page.compareScreenshot('should open custom popover select'));

  // select has no value, so first option should be focused by default
  const popoverOption1 = await popover.find('.select-interface-option:first-child');
  expect(popoverOption1).toHaveClass('ion-focused');

  let popoverOption2 = await popover.find('.select-interface-option:nth-child(2)');
  await popoverOption2.click();
  await page.waitForTimeout(500);

  await select.click();
  popover = await page.find('ion-popover');
  await popover.waitForVisible();
  await page.waitForTimeout(250);

  popoverOption2 = await popover.find('.select-interface-option:nth-child(2)');
  expect(popoverOption2).toHaveClass('ion-focused');

  await popover.callMethod('dismiss');

  // Custom Action Sheet Select
  select = await page.find('#customActionSheetSelect');
  await select.click();

  actionSheet = await page.find('ion-action-sheet');
  await actionSheet.waitForVisible();
  await page.waitForTimeout(250);

  compares.push(await page.compareScreenshot('should open custom action sheet select'));

  await actionSheet.callMethod('dismiss');

  for (const compare of compares) {
    expect(compare).toMatchScreenshot();
  }
});

test('select:rtl: basic', async () => {
  const page = await newE2EPage({
    url: '/src/components/select/test/basic?ionic:_testing=true&rtl=true'
  });

  const compares = [];
  compares.push(await page.compareScreenshot());

  for (const compare of compares) {
    expect(compare).toMatchScreenshot();
  }
});
