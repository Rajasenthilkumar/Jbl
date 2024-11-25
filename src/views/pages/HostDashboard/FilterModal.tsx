import { Button, Drawer, Space, Tag } from 'antd';
import type { FC } from 'react';
import CustomCollapse from 'views/components/collapse/CustomCollapse';
type Props = {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const preventDefault = (e: React.MouseEvent<HTMLElement>) => {
  e.preventDefault();
};
const tagValues = ['Locations', 'Date', 'No.of bedrooms', 'Hosts', 'Clear all'];

const FilterModal: FC<Props> = ({ handleCancel, open }) => {
  return (
    <Drawer
      title="Filters"
      placement="right"
      closable={true}
      onClose={handleCancel}
      visible={open}
      width={400}
    >
      <div>
        {tagValues.map((tag) => (
          <Tag
            key={tag}
            closable
            onClose={(e) => {
              preventDefault(e);
            }}
            className={tag === 'Clear all' ? 'tag-clearbg' : 'tag-otherbg'}
          >
            {tag}
          </Tag>
        ))}
        <div className="my-2">
          <CustomCollapse />
        </div>
        <div className="absolute bottom-0 z-20 w-full py-2 bg-white footer-filter">
          <Space
            direction="horizontal"
            size={10}
            className="justify-end w-full pr-8"
          >
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="font-bold"
              loading={status === 'pending'}
            >
              Apply
            </Button>
          </Space>
        </div>
      </div>
    </Drawer>
  );
};
export default FilterModal;
