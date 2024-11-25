import { fireEvent } from '@testing-library/react';
import { setupStore } from 'stores/setUpStore';
import { authInitialState, setAuthInfo } from 'stores/slice/authSlice';
import { renderWithProviders } from 'utilities/reduxTest';
import { describe, expect, it } from 'vitest';
import ProfileCompleteFeature from './ProfileCompleteFeature';

describe('ProfileCompleteFeature Component', () => {
  it('should render ProfileCompleteFeature forms and elements', async () => {
    const store = setupStore();

    store.dispatch(setAuthInfo({ userId: 1, token: 'token', mode: 'Host' }));

    const renderResult = renderWithProviders(<ProfileCompleteFeature />, {
      store: store,
      preloadedState: {
        auth: authInitialState,
      },
    });

    const form = renderResult.container.querySelector('#skip-button');
    expect(form).toBeTruthy();

    const completeProfileButton = renderResult.container.querySelector(
      '#complete-profile-button',
    );
    expect(completeProfileButton).toBeTruthy();

    // click on complete profile button

    if (!completeProfileButton) {
      throw new Error('completeProfileButton not found');
    }

    fireEvent.click(completeProfileButton);
    // wait for the few seconds
  });
});
