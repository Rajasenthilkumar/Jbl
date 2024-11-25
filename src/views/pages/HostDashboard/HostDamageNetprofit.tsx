import TransactionDetailCard from 'views/components/card/hostDashboard/TransactionDetailCard';
import drag_drop from '../../../assets/dashboard/drag_drop.svg';

const HostDamageNetprofit = () => {
  return (
    <div className="bg-white br10 p-3 my-0 total-host-netprofit">
      <div className="flex">
        <img src={drag_drop as unknown as undefined} alt="drag" />
        <h1 className="pt-0 md:text-lg text-sm font-bold text-black-color">
          Total Host Damage Waiver Net Profit
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 guest-dashboard-grid my-4">
        <TransactionDetailCard
          classname={'br-blue bg-white p-2 br10'}
          heading={'Net Damage Waivers'}
          headingClasssname={'text-grey-f'}
          contentClassname={''}
          contentname={''}
          subheadingClassname="text-black-color text-lg font-medium w100 custom-text-truncate"
          subheading={'R400,000'}
        />
        <TransactionDetailCard
          classname={'br-blue bg-white p-2 br10'}
          heading={'Claims Against DW'}
          headingClasssname={'text-grey-f'}
          contentClassname={''}
          contentname={''}
          subheadingClassname="text-red text-lg font-medium w100 custom-text-truncate"
          subheading={'(R168,075)'}
        />
        <TransactionDetailCard
          classname={'br-blue bg-white p-2 br10'}
          heading={'Host Net Profit'}
          headingClasssname={'text-grey-f'}
          contentClassname={''}
          contentname={''}
          subheadingClassname="text-green text-lg font-medium w100 custom-text-truncate"
          subheading={'R131,923'}
        />
      </div>
    </div>
  );
};

export default HostDamageNetprofit;
