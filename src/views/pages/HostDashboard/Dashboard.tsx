import { Button } from 'antd';
import { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  type DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import { GrFilter } from 'react-icons/gr';
import AnalyticsSummaryCard from 'views/components/card/hostDashboard/AnalyticsSummaryCard';
import BasicDonutChart from 'views/components/chart/BasicDonutChart';
import claim from '../../../assets/dashboard/claim.svg';
import dispute from '../../../assets/dashboard/dispute.svg';
import drag_drop from '../../../assets/dashboard/drag_drop.svg';
import transaction from '../../../assets/dashboard/transaction.svg';
import DamageWaiverMetrics from './DamageWaiverMetrics';
import FilterModal from './FilterModal';
import HostDamageNetprofit from './HostDamageNetprofit';
import SecurityDepositMetrics from './SecurityDepositMetrics';
const Dashboard = () => {
  const [state, setState] = useState(false);
  const [components, setComponents] = useState([
    { id: '1', component: <SecurityDepositMetrics /> },
    { id: '2', component: <DamageWaiverMetrics /> },
    { id: '3', component: <HostDamageNetprofit /> },
    {
      id: '4',
      component: (
        <div className="bg-white br10 p-3 my-0">
          <div className="flex">
            <img src={drag_drop as unknown as undefined} alt="drag" />
            <h1 className="pt-0 md:text-lg text-sm font-bold text-black-color">
              Security Deposit vs. Damage Waiver Ratio
            </h1>
          </div>
          <BasicDonutChart />
        </div>
      ),
    },
  ]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedComponents = Array.from(components);
    const [movedItem] = reorderedComponents.splice(result.source.index, 1);
    reorderedComponents.splice(result.destination.index, 0, movedItem);

    setComponents(reorderedComponents);
  };
  const viewFilter = () => {
    setState(true);
  };
  return (
    <div>
      <div className="flex justify-between mb-3">
        <h1 className="pt-0 md:text-lg text-sm font-bold text-black-color">
          Analytics summary
        </h1>
        <Button
          className="py-3 rounded bg-white text-black-color"
          type="primary"
          onClick={viewFilter}
        >
          <span className="font-medium">
            Filter <GrFilter className="m-4" />{' '}
          </span>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-cols-[32%_32%_32%] gap-5 mt-2 mb-4">
        <AnalyticsSummaryCard
          classname={''}
          heading={''}
          headingClasssname={''}
          contentClassname={'flex bg-white p-3 br10'}
          contentname={''}
          subheadingClassname={''}
          subheading={'Total Transactions'}
          imgClassname={''}
          imgsrc={transaction as unknown as string}
          analyticHeading={
            'text-black-color text-lg font-medium w100 custom-text-truncate'
          }
          analyticValue={2657}
          analyticClassname={'mx-2'}
        />
        <AnalyticsSummaryCard
          classname={''}
          heading={''}
          headingClasssname={''}
          contentClassname={'flex bg-white p-3 br10'}
          contentname={''}
          subheadingClassname={''}
          subheading={'Total Claims'}
          imgClassname={''}
          imgsrc={claim as unknown as string}
          analyticHeading={
            'text-black-color text-lg font-medium w100 custom-text-truncate'
          }
          analyticValue={203}
          analyticClassname={'mx-2'}
        />
        <AnalyticsSummaryCard
          classname={''}
          heading={''}
          headingClasssname={''}
          contentClassname={'flex bg-white p-3 br10'}
          contentname={''}
          subheadingClassname={''}
          subheading={'Total disputes / Dispute %'}
          imgClassname={''}
          imgsrc={dispute as unknown as string}
          analyticHeading={
            'text-black-color text-lg font-medium w100 custom-text-truncate'
          }
          analyticValue={20 / 10}
          analyticClassname={'mx-2'}
        />
      </div>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" direction="vertical">
            {(provided) => (
              <div
                className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-[50%_50%] gap-2 mt-2 mb-4 profile-grid dashboard-profile-grid mb-0"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {components.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="draggable-item"
                      >
                        {item.component}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {state && (
        <FilterModal
          open={true}
          handleOk={(): void => {}}
          handleCancel={() => setState(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
