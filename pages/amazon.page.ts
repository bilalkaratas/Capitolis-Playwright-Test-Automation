import { Page, Locator, expect } from '@playwright/test';

export class AccountPage {
    readonly page: Page;
    readonly emailOrPhoneField: Locator;
    readonly continueButton: Locator;
    readonly proceedToCreateAccountButton: Locator;
    readonly nameField: Locator;
    readonly passwordField: Locator;
    readonly reenterPasswordField: Locator;
    readonly createAccountButton: Locator;
    readonly forgotPasswordLink: Locator;
    readonly signInButton: Locator;
    
    // Error and validation locators
    readonly passwordErrorMessage: Locator;
    readonly invalidEmailMessage: Locator;
    
    // Headings
    readonly signInOrCreateAccountHeading: Locator;
    readonly newToAmazonHeading: Locator;
    readonly signInHeading: Locator;
    readonly puzzleHeading: Locator;
    readonly passwordAssistanceHeading: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Input fields
        this.emailOrPhoneField = page.getByRole('textbox', { name: 'Enter your mobile number or' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.proceedToCreateAccountButton = page.getByRole('button', { name: 'Proceed to create an account' });
        this.nameField = page.getByRole('textbox', { name: 'Your name' });
        this.passwordField = page.getByRole('textbox', { name: 'Password (at least 6' });
        this.reenterPasswordField = page.getByRole('textbox', { name: 'Re-enter password' });
        this.createAccountButton = page.getByRole('button', { name: 'Continue Verify mobile number' });
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        
        // Error messages
        this.passwordErrorMessage = page.locator('#auth-password-invalid-password-alert').getByText('Minimum 6 characters required');
        this.invalidEmailMessage = page.getByText('Invalid email address');
        
        // Headings
        this.signInOrCreateAccountHeading = page.getByRole('heading', { name: 'Sign in or create account' });
        this.newToAmazonHeading = page.getByRole('heading', { name: 'Looks like you\'re new to' });
        this.signInHeading = page.getByRole('heading', { name: 'Sign in' });
        this.puzzleHeading = page.getByRole('heading', { name: 'Solve this puzzle to protect' });
        this.passwordAssistanceHeading = page.getByRole('heading', { name: 'Password assistance' });
    }

    async navigateToSignInPage(): Promise<void> {
        await this.page.goto('https://www.amazon.com/');
        
        // Handle potential popup/pages
        const continueShoppingButton = this.page.locator("//button[text()='Continue shopping']");
        if (await continueShoppingButton.count() > 0) {
            await continueShoppingButton.click();
        }

        const yourAccountLink = this.page.locator("//a[text()='Your Account']");
        if (await yourAccountLink.count() > 0) {
            await yourAccountLink.click();
        }

        await this.page.getByRole('link', { name: 'Hello, sign in Account & Lists' }).click();
        await expect(this.signInOrCreateAccountHeading).toBeVisible();
    }

    async enterEmailOrPhone(email: string): Promise<void> {
        await this.emailOrPhoneField.fill(email);
        await this.continueButton.click();
    }

    async proceedToCreateAccount(): Promise<void> {
        await expect(this.newToAmazonHeading).toBeVisible();
        await this.proceedToCreateAccountButton.click();
    }

    async fillAccountDetails(name: string, password: string): Promise<void> {
        await this.nameField.fill(name);
        await this.passwordField.fill(password);
        await this.reenterPasswordField.fill(password);
        await this.createAccountButton.click();
    }

    async createNewAccount(email: string, name: string, password: string): Promise<void> {
        await this.enterEmailOrPhone(email);
        await this.proceedToCreateAccount();
        await this.fillAccountDetails(name, password);
    }

    async goToPasswordAssistance(): Promise<void> {
        await this.forgotPasswordLink.click();
        await expect(this.passwordAssistanceHeading).toBeVisible();
    }
}