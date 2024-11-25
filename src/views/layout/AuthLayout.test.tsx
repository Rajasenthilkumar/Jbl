import { renderWithProviders } from 'utilities/reduxTest';
import { describe, expect, it } from 'vitest';
import AuthLayout from './AuthLayout';

describe('AuthLayout page', () => {
  const setup = () => {
    renderWithProviders(
      <AuthLayout>
        <div>Hello world</div>
      </AuthLayout>,
    );
  };
  it('AuthLayout snap shot', () => {
    expect(setup()).toMatchSnapshot();
  });
});
