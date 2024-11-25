import { renderWithProviders } from 'utilities/reduxTest';
import { describe, expect, it } from 'vitest';
import UpdatePasswordFeature from './UpdatePasswordFeature';

describe('UpdatePasswordFeature page', () => {
  const setup = () => {
    renderWithProviders(
      <UpdatePasswordFeature token={'sample'} mode={'Host'} />,
    );
  };
  it('UpdatePasswordFeature snap shot', () => {
    expect(setup()).toMatchSnapshot();
  });
});
