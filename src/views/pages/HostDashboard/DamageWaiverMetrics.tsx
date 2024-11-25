import TransactionDetailCard from 'views/components/card/hostDashboard/TransactionDetailCard';
import drag_drop from '../../../assets/dashboard/drag_drop.svg';
import file_open from '../../../assets/dashboard/file-open.svg';
const DamageWaiverMetrics = () => {
  return (
    <div className="bg-white br10 p-3 my-0">
      <div className="flex">
        <img src={drag_drop as unknown as undefined} alt="drag" />
        <h1 className="pt-0 md:text-lg text-sm font-bold text-black-color">
          Damage Waiver Metrics
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 guest-dashboard-grid my-4">
        <TransactionDetailCard
          classname={'br-blue bg-white p-2 br10'}
          heading={'Total Transactions'}
          headingClasssname={'text-grey-f'}
          contentClassname={''}
          contentname={''}
          subheadingClassname="text-black-color text-lg font-medium w100 custom-text-truncate"
          subheading={'1207'}
        />
        <TransactionDetailCard
          classname={'br-blue bg-white p-2 br10'}
          heading={'Total Number of Claims'}
          headingClasssname={'text-grey-f'}
          contentClassname={''}
          contentname={''}
          subheadingClassname="text-black-color text-lg font-medium w100 custom-text-truncate"
          subheading={'109'}
        />
        <TransactionDetailCard
          classname={'br-blue bg-white p-2 br10'}
          heading={'Total Value of Claims'}
          headingClasssname={'text-grey-f'}
          contentClassname={''}
          contentname={''}
          subheadingClassname={
            'text-red text-lg font-medium w100 custom-text-truncate'
          }
          subheading={'R127,598'}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 guest-dashboard-grid my-4">
        <TransactionDetailCard
          classname={'br-blue bg-white p-2 br10'}
          heading={'Avg Claim Amount'}
          headingClasssname={'text-grey-f'}
          contentClassname={''}
          contentname={''}
          subheadingClassname="text-black-color text-lg font-medium w100 custom-text-truncate"
          subheading={'R1,171'}
        />
        <TransactionDetailCard
          classname={'br-blue bg-white p-2 br10'}
          heading={'Highest Claim Amount'}
          headingClasssname={'text-grey-f'}
          contentClassname={''}
          contentname={''}
          subheadingClassname="text-black-color text-lg font-medium w100 custom-text-truncate"
          subheading={'R2,458'}
        />
        <TransactionDetailCard
          classname={'br-blue bg-white p-2 br10'}
          heading={'Outstanding Disputes'}
          headingClasssname={'text-grey-f'}
          contentClassname={'flex justify-between'}
          contentname={''}
          subheadingClassname="text-black-color text-lg font-medium d-flex
        w100 custom-text-truncate"
          subheading={'3'}
          imgClassname={''}
          imgsrc={file_open as unknown as string}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 guest-dashboard-grid my-4">
        <TransactionDetailCard
          classname={'br-blue bg-white p-2 br10'}
          heading={'No Claim (%)'}
          headingClasssname={'text-grey-f'}
          contentClassname={''}
          contentname={''}
          subheadingClassname="text-black-color 
        text-lg font-medium w100 custom-text-truncate"
          subheading={'91%'}
        />
        <TransactionDetailCard
          classname={'br-blue bg-white p-2 br10'}
          heading={'Claim with no Excess (%)'}
          headingClasssname={'text-grey-f'}
          contentClassname={''}
          contentname={''}
          subheadingClassname="text-black-color text-lg font-medium w100 custom-text-truncate"
          subheading={'2%'}
        />
        <TransactionDetailCard
          classname={'br-blue bg-white p-2 br10'}
          heading={'Claims with no Excess (%)'}
          headingClasssname={'text-grey-f'}
          contentClassname={'flex'}
          contentname={''}
          subheadingClassname="text-black-color text-lg font-medium w100 custom-text-truncate"
          subheading={'7%'}
        />
      </div>
    </div>
  );
};
export default DamageWaiverMetrics;
