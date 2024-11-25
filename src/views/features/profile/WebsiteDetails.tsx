import { useEffect } from 'react';
import WebsiteDetailCardComponent from 'views/components/card/WebsiteDetailCard';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchCard } from 'stores/slice/customerSlice';
const WebsiteDetails = () => {
  const dispatch = useAppDispatch();
  const companyDetails = useAppSelector(
    (state) => state.auth.profileDetails?.profiles ?? [],
  );

  const profileDetails = useAppSelector((state) => state.auth.profileDetails);

  const websiteLink = companyDetails.map(
    (company: { company_website: string | null }) =>
      company.company_website ? company.company_website[0] : '',
  );

  const profileType = Array.isArray(profileDetails?.profiles)
    ? profileDetails.profiles.map((profile) => profile.profile_type)[0]
    : undefined;

  useEffect(() => {
    if (companyDetails.length > 0) {
      dispatch(fetchCard());
    }
  }, [dispatch, companyDetails.length]);

  return (
    <div>
      <WebsiteDetailCardComponent
        cardtitle={'Website URL'}
        className={'credit-card-classname'}
        textDetailsclassName={'textDetailsclassName textWebDetailsclasName'}
        titleclassName={'credit-card-headertitle'}
        subclassName={'sub-classname'}
        cardinfoclassName={'cardinfoclassName'}
        websiteValue={websiteLink[0] || ''}
        websiteIcon={'linkimage'}
        link={'icon'}
        imageiconname={'me-2'}
        emergencycardtitle={''}
        profileType={profileType ?? ''}
        inputStyleclassName={'input-style-classname'}
        webSaveclassname={'webSaveclassname'}
        websiteDetailsclassname={''}
        handleCancel={(): void => {
          throw new Error('Function not implemented.');
        }}
        handleOk={(): void => {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
};
export default WebsiteDetails;
