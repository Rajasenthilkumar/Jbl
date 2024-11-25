import { renderWithProviders } from 'utilities/reduxTest';
import { describe, expect, it } from 'vitest';
import ForgotPasswordFeature from './ForgotPasswordFeature';

describe('ForgotPasswordFeature Component', () => {
  it('should render ForgotPasswordFeature forms and elements', () => {
    const renderResult = renderWithProviders(<ForgotPasswordFeature />);

    const form = renderResult.container.querySelector('#forgot-password-form');
    expect(form).toBeTruthy();

    const email = renderResult.container.querySelector('#email');
    expect(email).toBeTruthy();

    const forgotPasswordButton = renderResult.container.querySelector(
      '#forgot-password-button',
    );
    expect(forgotPasswordButton).toBeTruthy();

    const loginLink = renderResult.container.querySelector('#login-link');
    expect(loginLink).toBeTruthy();
  });
});
