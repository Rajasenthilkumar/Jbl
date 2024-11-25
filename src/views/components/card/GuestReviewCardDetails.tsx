import { DeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import AddPlusIcon from '../../../assets/icons/addCard.svg';
import MasterCardIcon from '../icons/MasterCardIcon';
import AddNewCard from './AddNewCard';
// import GuestEditCard from './GuestEditCard';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { deleteCard, fetchCard } from 'views/features/profile/GuestCardSlice';

interface Card {
  id: string;
  type: string;
  number: string;
  name?: string;
  expiration: string;
  cvv?: string;
}
interface AuthDetails {
  authorization_code: string;
  card_type: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  bank: string;
  signature: string;
  country_code: string;
}
interface CardDetails {
  authorizations?: AuthDetails[];
}

const GuestReviewCardDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const cardDetails: CardDetails = useAppSelector(
    (state) => state.guestCardDetails.cardDetails.data?.result ?? {},
  );

  const [cards, setCards] = useState<Card[]>([]);

  const [showCard, setShowCard] = useState(false);
  const [cardAction, setCardAction] = useState<'add' | 'edit' | null>(null);
  const [, setCurrentCard] = useState<Card | null>(null);
  const [deleteTargetCard, setDeleteTargetCard] = useState<string | null>(null); // Track card to delete
  const [isConfirmVisible, setIsConfirmVisible] = useState(false); // Control popup visibility

  useEffect(() => {
    dispatch(fetchCard());
  }, [dispatch]);

  useEffect(() => {
    if (cardDetails?.authorizations) {
      const formattedCards = cardDetails?.authorizations?.map(
        (auth: AuthDetails) => ({
          id: auth.authorization_code,
          type: auth.card_type,
          number: `${auth.last4}`,
          expiration: `${auth.exp_month}/${auth.exp_year}`,
          bank: auth.bank,
          signature: auth.signature,
          country_code: auth.country_code,
        }),
      );
      setCards(formattedCards ?? []);
    }
  }, [cardDetails]);
  const handleOk = () => {
    setShowCard(false);
  };

  const showHandler = (action: 'add' | 'edit', card?: Card) => {
    setCardAction(action);
    setCurrentCard(card || null);
    setShowCard(true);
  };

  const addNewCard = (cardDetails: {
    type: string;
    number: string;
    name: string;
    expiration: string;
    cvv: string;
  }) => {
    const newCard: Card = {
      id: (cards.length + 1).toString(), // Assuming id should be a string
      type: cardDetails.type,
      number: cardDetails.number,
      name: cardDetails.name, // Optional, can be omitted if not provided
      expiration: cardDetails.expiration,
      cvv: cardDetails.cvv, // Optional, can be omitted if not provided
    };
    setCards((prev) => [...prev, newCard]);
  };

  const confirmDelete = (id: string) => {
    setDeleteTargetCard(id);
    setIsConfirmVisible(true);
  };

  const handleConfirmOk = () => {
    if (deleteTargetCard !== null) {
      dispatch(deleteCard(deleteTargetCard)).then((_res) => {
        dispatch(fetchCard());
      });
      setIsConfirmVisible(false);
    }
  };

  const handleConfirmCancel = () => {
    setDeleteTargetCard(null);
    setIsConfirmVisible(false);
  };

  return (
    <div>
      <h1 className="text-base font-medium">Payment Methods</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-[49%_49%] gap-2 mt-2 mb-4">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div key={card.id} className="flex br-gray-a br10 p-3">
              <MasterCardIcon />
              <div>
                <h1 className="md:text-sm text-sm font-medium text-black-color profile-name custom-text-truncate">
                  {card.type}
                </h1>
                <span className="md:text-xs text-xs text-grey-color font-normal">
                  Card ending with {card.number}
                </span>
              </div>
              <span className="card-icons">
                {/*  <EditOutlined
                  className="cursor-pointer"
                  onClick={() => showHandler('edit', card)}
                  style={{ fontSize: '16px', color: '#3AB4FD' }}
                /> */}
                <DeleteOutlined
                  className="cursor-pointer ms-2"
                  style={{ fontSize: '16px', color: '#FF4D4F' }}
                  onClick={() => confirmDelete(card.id)}
                />
              </span>
            </div>
          ))
        ) : (
          <p>No Cards Available</p>
        )}

        <div
          className="flex cursor-pointer br-gray-a br10 p-3"
          onClick={() => showHandler('add')}
        >
          <img src={AddPlusIcon as unknown as string} alt="plus" />
          <span className="m-2 text-sm">Add A New Card</span>
        </div>
      </div>

      {/* {cardAction === 'edit' && currentCard && (
        <GuestEditCard
          open={showCard}
          handleOk={handleOk}
          handleCancel={() => setShowCard(false)}
          currentCard={currentCard}
          // id={currentCard.id || ''}
          // cardHolderName={currentCard.name || ''}
          // cardNumber={currentCard.number || ''}
          // expirationDate={currentCard.expiration || ''}
          // cvv={currentCard.cvv || ''}
        />
      )} */}

      {cardAction === 'add' && (
        <AddNewCard
          open={showCard}
          handleOk={handleOk}
          handleCancel={() => setShowCard(false)}
          onAddCard={addNewCard}
        />
      )}

      {/* Confirmation Modal */}
      <Modal
        title="Are you sure?"
        open={isConfirmVisible}
        onOk={handleConfirmOk}
        onCancel={handleConfirmCancel}
        okText="Yes"
        cancelText="No"
      >
        <p>Do you want to delete this card?</p>
      </Modal>
    </div>
  );
};

export default GuestReviewCardDetails;
