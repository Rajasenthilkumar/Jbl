// Generated by CodiumAI

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import FormModal from './FormModal';

describe('code snippet', () => {
  // Modal opens when 'open' prop is true
  it('should open the modal when "open" prop is true', () => {
    const { getByText } = render(
      <FormModal
        open={true}
        handleOk={() => {}}
        handleCancel={() => {}}
        title="Test Title"
        subTitle="Test Subtitle"
        headerIcon={<span>Icon</span>}
      >
        <div>Test Children</div>
      </FormModal>,
    );
    expect(getByText('Test Title')).toBeTruthy();
  });
});
