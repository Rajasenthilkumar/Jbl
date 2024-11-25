import AuthFromContainer from 'views/components/containers/AuthFromContainer';

const PasswordReset = () => {
  return (
    <AuthFromContainer>
      <div className="flex flex-col items-center">
        <p className="mb-4 text-base text-center text-Grey">
          Password reset is successful
        </p>
      </div>
    </AuthFromContainer>
  );
};

export default PasswordReset;
