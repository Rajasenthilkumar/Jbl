import { fireEvent, waitFor } from '@testing-library/react';
import { setupStore } from 'stores/setUpStore';
import { setAuthInfo } from 'stores/slice/authSlice';
import { renderWithProviders } from 'utilities/reduxTest';
import { describe, expect, it } from 'vitest';
import PropertiesFeature from './PropertiesFeature';

describe('PropertiesFeature Component', () => {
  it('should render ProfileCompleteFeature forms and elements', async () => {
    const store = setupStore();

    store.dispatch(setAuthInfo({ userId: 1, token: 'token', mode: 'Host' }));

    const renderResult = renderWithProviders(<PropertiesFeature />, {
      store: store,
    });

    const propFeature = renderResult.container.querySelector(
      '#properties-feature',
    );
    expect(propFeature).toBeTruthy();
    const archiveButton =
      renderResult.container.querySelector('#archive-button');
    expect(archiveButton).toBeTruthy();
    const addPropertiesButton = renderResult.container.querySelector(
      '#add-properties-button',
    );
    expect(addPropertiesButton).toBeTruthy();

    const propertiesTable =
      renderResult.container.querySelector('#properties-table');
    expect(propertiesTable).toBeTruthy();

    // click on add properties button

    if (!archiveButton) {
      throw new Error('archiveButton not found');
    }

    fireEvent.click(archiveButton);

    // wait for the few seconds
    await waitFor(() => {
      const archiveTable =
        renderResult.container.querySelector('#archive-table');
      expect(archiveTable).toBeTruthy();
    });
  });
});
