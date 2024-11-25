import { Button, Popover } from 'antd';
import { type FC, useState } from 'react';
import {
  BoxArrowUpRight,
  FileEarmarkText,
  PlusLg,
} from 'react-bootstrap-icons';

type Props = {
  totalCount: number;
  onClickAddAssignDocs: () => void;
};

const FileItem = () => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2 font-bold text-PrimaryText ">
        <FileEarmarkText className="w-5 h-5 fill-PrimaryText" />
        <div> Rental T&C.pdf </div>
      </div>
      <div className="cursor-pointer">
        <BoxArrowUpRight className="fill-primary" />
      </div>
    </div>
  );
};

const PropertiesDoc: FC<Props> = ({
  totalCount,
  onClickAddAssignDocs /* record */,
}) => {
  /* console.log('-------record', record) */
  const [showPopOver, setShowPopOver] = useState(false);

  const handleClickButton = () => {
    setShowPopOver(!showPopOver);
  };

  const handleClickAddAssignDocs = () => {
    setShowPopOver(false);
    onClickAddAssignDocs();
  };

  const content = (
    <div className="w-64 p-1 rounded">
      <FileItem />
      <FileItem />
      <FileItem />

      <Button
        type="primary"
        icon={<PlusLg className="fill-primary" />}
        className="w-full text-sm font-medium border-none rounded bg-lightBlue text-primary"
        size="large"
        onClick={handleClickAddAssignDocs}
      >
        Add/Assign Docs
      </Button>
    </div>
  );

  return (
    <div>
      <Popover
        content={content}
        title={false}
        trigger="click"
        arrow={false}
        open={showPopOver}
        onOpenChange={setShowPopOver}
      >
        <Button
          disabled={true}
          icon={<FileEarmarkText />}
          size="small"
          className="font-bold bg-lightBlue"
          onClick={handleClickButton}
        >
          {totalCount}
        </Button>{' '}
      </Popover>
    </div>
  );
};

export default PropertiesDoc;
