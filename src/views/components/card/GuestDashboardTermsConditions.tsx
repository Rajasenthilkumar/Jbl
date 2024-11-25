import { FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const GuestDashboardTermsConditions = () => {
  return (
    <div className="bg-white br10 p-5 mt20">
      <p className="color-[#051621] font-medium text-base mb-2">
        {' '}
        Terms & Conditions
      </p>
      <div>
        <div className="mb-2 flex justify-between terms_cond_style">
          <Link
            to="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            Rental T&C.pdf
          </Link>
          <FaExternalLinkAlt
            className="text-blue-500"
            style={{ pointerEvents: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
};

export default GuestDashboardTermsConditions;
