import { Button } from 'antd';
import { Switch } from 'antd';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import type { FC } from 'react';
import { Archive, ArrowRepeat, Plus } from 'react-bootstrap-icons';
import {
  closeCreatePropertyModal,
  closeCreatePropertySuccessModal,
  openCreatePropertyModal,
  setActiveTable,
} from 'stores/slice/propertiesSlice';
import SuccessModal from 'views/components/modals/SuccessModal';
import PropertiesArchiveTable from './PropertiesArchiveTable';
import PropertiesPublishTable from './PropertiesTable';
import AddPropertiesFormModal from './addProperties/AddPropertiesFormModal';

type HeaderProps = {
  onChangeSyncAll: (value: boolean) => void;
  onAddProperties: () => void;
  isArchive: boolean;
  onClickArchive: () => void;
};

const Header: FC<HeaderProps> = ({
  onChangeSyncAll,
  onAddProperties,
  isArchive,
  onClickArchive,
}) => {
  return (
    <div className="md:flex block items-center justify-between">
      <div>
        <Button
          id="archive-button"
          onClick={onClickArchive}
          size="large"
          className={classNames('text-sm font-bold border-0 rounded ', {
            'text-primary bg-lightBlue': !isArchive,
            'text-white': isArchive,
          })}
          icon={<Archive className="font-bold" />}
          type={isArchive ? 'primary' : 'default'}
        >
          Archived Property
        </Button>
      </div>
      {!isArchive && (
        <div
          className="flex items-center gap-3 md-property-feature"
          id="sync-all-button"
        >
          <div className="flex items-center gap-2 mb-4 mt-4 md:mb-0 md:mt-0">
            <div>Sync all</div>
            <Switch onChange={onChangeSyncAll} />
          </div>
          <div className="flex items-center md:justify-center gap-2 text-Grey justify-content-left mb-4 md:mb-0 mt-4 md:mt-0">
            <p className=""> Refresh all</p>
            <Button
              icon={<ArrowRepeat className="fill-primary" />}
              size="small"
              shape="circle"
            />
          </div>
          <Button
            id="add-properties-button"
            type="primary"
            size="large"
            icon={<Plus className="w-5 h-5 fill-white" />}
            className="py-5 text-sm font-bold rounded"
            onClick={onAddProperties}
          >
            Add properties
          </Button>
        </div>
      )}
    </div>
  );
};

const PropertiesFeature = () => {
  const dispatch = useAppDispatch();
  const showAddPropertiesModal = useAppSelector(
    (state) => state.properties.createProperty.openModal,
  );

  const showSuccessModal = useAppSelector(
    (state) => state.properties.createProperty.openSuccessModal,
  );

  const activeTable = useAppSelector((state) => state.properties.activeTable);

  const isArchive = activeTable === 'archive';

  const handleClickArchive = () => {
    dispatch(
      setActiveTable(activeTable === 'archive' ? 'published' : 'archive'),
    );
  };

  const onChangeSyncAll = (_: boolean) => {};

  const handleClickAddProperties = () => {
    dispatch(openCreatePropertyModal());
  };

  const handleCloseAddPropertiesModal = () => {
    dispatch(closeCreatePropertyModal());
  };

  const handleCloseSuccessModal = () => {
    dispatch(closeCreatePropertySuccessModal());
  };

  return (
    <div id="properties-feature">
      <Header
        onChangeSyncAll={onChangeSyncAll}
        onAddProperties={handleClickAddProperties}
        isArchive={isArchive}
        onClickArchive={handleClickArchive}
      />
      <div className="py-3" />

      {isArchive ? <PropertiesArchiveTable /> : <PropertiesPublishTable />}

      {showAddPropertiesModal && (
        <AddPropertiesFormModal
          open={showAddPropertiesModal}
          handleCancel={handleCloseAddPropertiesModal}
          handleOk={handleCloseAddPropertiesModal}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          open={showSuccessModal}
          handleCancel={handleCloseSuccessModal}
          handleOk={handleCloseSuccessModal}
          handleContinue={handleCloseSuccessModal}
          title="Your property has been added successfully"
        />
      )}
    </div>
  );
};

export default PropertiesFeature;
