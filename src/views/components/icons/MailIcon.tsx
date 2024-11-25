import Icon from '../../../assets/icons/bi_mailbox.svg';

const MailIcon = () => {
  return (
    <div>
      <img
        src={Icon as unknown as string}
        alt="mail-icon"
        className="w-4 h-4 mx-1"
      />
    </div>
  );
};

export default MailIcon;
