import { Avatar, List } from 'antd';
import { useState } from 'react';
import RatingIcon from '../icons/RatingIcon';

const GuestDashboardReviewCard = () => {
  const [list] = useState([
    {
      name: { last: 'Smith' },
      picture: { large: 'https://example.com/image1.jpg' },
      reviewDate: '6 Jun at 09:45AM',
    },
    {
      name: { last: 'Johnson' },
      picture: { large: 'https://example.com/image2.jpg' },
      reviewDate: '7 Jun at 10:00AM',
    },
  ]);

  return (
    <div className="dashboard-review-card">
      <p className="ms-0 md:text-sm text-sm font-bold text-black-color me-1">
        My Reviews
      </p>
      <div className="review-card-list">
        <List
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <div className="md:flex block">
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href="https://ant.design">{item.name.last}</a>}
                  description={item.reviewDate}
                />
                <div className="flex p-0 w-fit br10 h30 guest-rating-icon">
                  <RatingIcon />
                  <span className="mx-0 md:text-sm text-sm font-bold text-black-color">
                    4
                  </span>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default GuestDashboardReviewCard;
