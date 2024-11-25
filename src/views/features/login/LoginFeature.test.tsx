import { renderWithProviders } from 'utilities/reduxTest';
import { describe, expect, it } from 'vitest';
import LoginFeature from './LoginFeature';

describe('LoginFeature Component', () => {
  it('should render Login forms and elements', () => {
    const renderResult = renderWithProviders(<LoginFeature />);

    const form = renderResult.container.querySelector('#login-form');
    expect(form).toBeTruthy();

    const email = renderResult.container.querySelector('#email');
    expect(email).toBeTruthy();

    const password = renderResult.container.querySelector('#password');
    expect(password).toBeTruthy();

    const loginButton = renderResult.container.querySelector('#login-button');
    expect(loginButton).toBeTruthy();

    const signupLink = renderResult.container.querySelector('#signup-link');
    expect(signupLink).toBeTruthy();

    const forgotPasswordLink =
      renderResult.container.querySelector('#forgot-password');
    expect(forgotPasswordLink).toBeTruthy();
  });
});
