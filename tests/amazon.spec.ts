import { test, expect } from '@playwright/test';
import { AccountPage } from '../pages/amazon.page';

let accountPage: AccountPage;

test.beforeEach(async ({ page }) => {
  accountPage = new AccountPage(page);
  await accountPage.navigateToSignInPage();
});

test.describe('Amazon.com | Create Account Tests', () => {

  test('should show error for short passwords', async ({ page }) => {
    await accountPage.enterEmailOrPhone('bilal01453@gmail.com');
    await accountPage.proceedToCreateAccount();
    await accountPage.fillAccountDetails('John Doe', 'Pass1');
    await expect(accountPage.passwordErrorMessage).toHaveText('Minimum 6 characters required');
  });

  test('should show error for invalid email', async ({ page }) => {
    await accountPage.emailOrPhoneField.fill('abcd');
    await accountPage.continueButton.click();
    await expect(accountPage.invalidEmailMessage).toBeVisible();
  });

  test('should display puzzle page for valid password entry', async ({ page }) => {
    await accountPage.createNewAccount('invalid113355@gmail.com', 'pass123', 'pass123');
    await expect(accountPage.puzzleHeading).toBeVisible();
  });

  test('should display sign in heading and button for valid user', async ({ page }) => {
    await accountPage.enterEmailOrPhone('deneme@gmail.com');
    await expect(accountPage.signInHeading).toBeVisible();
    await expect(accountPage.signInButton).toBeEnabled();
  });

  test('should display password assistance heading', async ({ page }) => {
    await accountPage.enterEmailOrPhone('deneme@gmail.com');
    await accountPage.goToPasswordAssistance();
  });

});