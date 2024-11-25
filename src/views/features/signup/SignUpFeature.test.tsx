import { renderWithProviders } from 'utilities/reduxTest';
import { describe, expect, it } from 'vitest';
import SignUpFeature from './SignUpFeature';

describe('SignUpFeature Component', () => {
  it('should render SignUp forms and elements', () => {
    const renderResult = renderWithProviders(<SignUpFeature />);

    const form = renderResult.container.querySelector('#signup-form');
    expect(form).toBeTruthy();

    const firstName = renderResult.container.querySelector('#first-name');
    expect(firstName).toBeTruthy();

    const lastName = renderResult.container.querySelector('#last-name');
    expect(lastName).toBeTruthy();

    const email = renderResult.container.querySelector('#email');
    expect(email).toBeTruthy();

    const password = renderResult.container.querySelector('#password');
    expect(password).toBeTruthy();

    const termsAndConditions = renderResult.container.querySelector(
      '#terms-and-conditions',
    );
    expect(termsAndConditions).toBeTruthy();

    const signupButton = renderResult.container.querySelector('#signup-button');
    expect(signupButton).toBeTruthy();

    const loginLink = renderResult.container.querySelector('#login-link');
    expect(loginLink).toBeTruthy();
  });
});
