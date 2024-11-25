import CloseOutlined from '@ant-design/icons/ClearOutlined';
import { Divider, Drawer } from 'antd';
import { BsFillStarFill } from 'react-icons/bs';

interface IDrawer {
  openDrawer: boolean;
  setOpenDrawer: (setOpenDrawer: boolean) => void;
}

const DrawerComponent = ({ openDrawer, setOpenDrawer }: IDrawer) => {
  return (
    <div>
      <Drawer
        closable={false}
        destroyOnClose
        width="35vw"
        title={
          <div className="drawerComponent_top">
            <div className="drawerComponent_top-left">
              <p>Ratings</p>
            </div>
            <div className="drawerComponent_top-right">
              <div
                className="drawerComponent_top-right-close_icon"
                onClick={() => setOpenDrawer(false)}
              >
                <CloseOutlined />
              </div>
            </div>
          </div>
        }
        placement="right"
        open={openDrawer}
        // onClose={}
      >
        <div className="drawerComponent">
          <div className="drawerComponent_middle">
            <Divider className="drawerComponent_middle-line">
              <p className="drawerComponent_middle-text">54 Ratings</p>
            </Divider>
          </div>
          <div className="drawerComponent_bottom">
            <div className="drawerComponent_bottom-top">
              <div className="drawerComponent_bottom-top--left">
                <p>Overall Ratings</p>
              </div>
              <div className="drawerComponent_bottom-top--right">
                <div className="drawerComponent_bottom-top--right-rate">
                  <BsFillStarFill className="rating__star" />
                  <p className="drawerComponent_bottom-top--right-rate-point">
                    3.2
                  </p>
                </div>
              </div>
            </div>
            <div className="user_review">
              <div className="user_review-top">
                <div className="user_review-top-left">
                  <div className="user_review-top-left-dp">
                    <img
                      src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
                      alt=""
                    />
                  </div>
                  <div className="user_review-top-left-details">
                    <p className="user_review-top-left-details--name">
                      Jane doe
                    </p>
                    <p className="user_review-top-left-details--date">
                      June 6, 2024
                    </p>
                  </div>
                </div>
                <div className="user_review-top-right">
                  <div className="user_review-top-right-rate">
                    <BsFillStarFill className="rating__star" />
                    &nbsp; 5
                  </div>
                </div>
              </div>
              <div className="user_review-bottom">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente dolorum quo consequatur earum beatae nobis maiores
                  minima eum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
