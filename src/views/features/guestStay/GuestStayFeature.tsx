import { Button, Col, Image, Row } from 'antd';
import { Card } from 'antd';
import { useState } from 'react';
import date from '../../../assets/icons/guest-stay/date.svg';
import person from '../../../assets/icons/guest-stay/days.svg';
import greenTick from '../../../assets/icons/guest-stay/green-tick.svg';
import night from '../../../assets/icons/guest-stay/night.svg';
import star from '../../../assets/icons/guest-stay/star-outline.svg';
import sampleImg from '../../../assets/profile/sample-img-guest.svg';
const GuestStayFeature = () => {
  const data = [
    {
      img: sampleImg,
      name: 'Modern Apartment',
      date: '2024-12-01',
      member: '2',
      moon: '2',
      star: '4',
      type: 'security deposit',
    },
    {
      img: sampleImg,
      name: 'Modern Apatmnt',
      date: '2024-12-01',
      member: '2',
      moon: '2',
      star: '4',
      type: 'damage weiver',
    },
    {
      img: sampleImg,
      name: 'oden Apartment',
      date: '2024-12-01',
      member: '2',
      moon: '2',
      star: '4',
      type: 'damage weiver',
    },
    {
      img: sampleImg,
      name: 'Moder Apartment',
      date: '2024-12-01',
      member: '2',
      moon: '2',
      star: '4',
      type: 'security deposit',
    },
  ];
  const [activeButton, setActiveButton] = useState<string>('current');

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
    // const isDataEmpty =
    //   buttonType === 'current'
    //     ? currentBookingData.length === 0
    //     : buttonType === 'past'
    //       ? pastBookingData.length === 0
    //       : upcomingBookingData.length === 0;
    // isDataEmpty && fetchBookings(1, buttonType);
  };

  return (
    <div className="booking__feature">
      <div className="booking__feature--action_part">
        <div className="booking__feature--action_part-left">
          <div className="booking__feature--action_part-left-btns">
            <Button
              type="primary"
              onClick={() => handleButtonClick('upcoming')}
              className={
                activeButton === 'upcoming'
                  ? 'rounded-l-3xl rounded-r-none booking__feature--active'
                  : 'rounded-l-3xl rounded-r-none booking__feature--notactive'
              }
            >
              Upcoming&nbsp; <span className="data_count">{1}</span>
            </Button>
            <Button
              type="primary"
              onClick={() => handleButtonClick('current')}
              className={
                activeButton === 'current'
                  ? 'rounded-none border-x-0 booking__feature--active'
                  : 'rounded-none booking__feature--notactive'
              }
            >
              Current&nbsp; <span className="data_count">{2}</span>
            </Button>
            <Button
              type="primary"
              onClick={() => handleButtonClick('past')}
              className={
                activeButton === 'past'
                  ? 'rounded-r-3xl rounded-l-none booking__feature--active'
                  : 'rounded-r-3xl rounded-l-none booking__feature--notactive'
              }
            >
              Past&nbsp; <span className="data_count">{2}</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Row gutter={[6, 6]}>
          {data.map((item) => (
            <Col key={item.name} xl={6}>
              <Card key={item.name}>
                <div style={{ width: '100%' }}>
                  {typeof item.img === 'string' ? (
                    <Image preview={false} width={'100%'} src={item.img} />
                  ) : (
                    <item.img />
                  )}
                </div>

                <p className="custom-text-truncate ">{item.name}</p>

                <div className="flex justify-between mt-1">
                  <p className="flex">
                    <img src={date as unknown as string} alt="Date Icon" />
                    <span className="ms-1">{item.date}</span>
                  </p>
                  <p className="flex">
                    <img src={person as unknown as string} alt="person Icon" />
                    <span className="ms-1">{item.member}</span>
                  </p>
                  <p className="flex">
                    <img src={night as unknown as string} alt="person Icon" />
                    <span className="ms-1">{item.moon}</span>
                  </p>
                  <p className="flex">
                    <img src={star as unknown as string} alt="person Icon" />
                    <span className="ms-1">{item.star}</span>
                  </p>
                </div>
                <div className="flex items-center review-status">
                  <span className="">Damage Waiver</span>
                  <img
                    src={greenTick as unknown as string}
                    alt="Tick Icon"
                    className="ms-2"
                  />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
export default GuestStayFeature;
