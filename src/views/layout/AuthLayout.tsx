import type { EmblaOptionsType } from 'embla-carousel';
import type { FC } from 'react';
import EmblaCarousel from 'views/components/emblaCarousel/EmblaCarousel';

type AuthLayoutProps = {
  children: React.ReactNode;
};

const OPTIONS: EmblaOptionsType = { align: 'start' };
export type TestimonialType = {
  totalPercentage: number;
  content: string;
  firstName: string;
  lastName: string;
};

const TESTIMONIALS: TestimonialType[] = [
  {
    totalPercentage: 68,
    content: 'more claims have been settled since I have started using JBL',
    firstName: 'Pam',
    lastName: 'Amanzimtoti',
  },
  {
    totalPercentage: 78,
    content: 'more claims have been settled since I have started using JBL',
    firstName: 'Alain',
    lastName: 'Cook',
  },
  {
    totalPercentage: 80,
    content: 'more claims have been settled since I have started using JBL',
    firstName: 'Sam',
    lastName: 'Mthatha',
  },
  {
    totalPercentage: 85,
    content: 'more claims have been settled since I have started using JBL',
    firstName: 'Jacopo',
    lastName: 'Durban',
  },
];

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="py-2 bg-[#EBF8FF]">
      <div className="px-4 sm:px-24 grid h-full max-h-full min-h-screen grid-cols-1 sm:grid-cols-2 gap-[4.5rem] mx-auto place-content-center place-items-center">
        <div className="md-text-center">
          <img
            src="/images/icons/jbl.png"
            alt="jbl_logo"
            className="w-[5.33rem] h-[5.33rem] mb-4 sm:mb-11 mx-auto sm:mx-0"
          />
          <p className="mb-6 text-3xl font-book text-PrimaryText md-text-center">
            Welcome to
          </p>
          <h1 className="text-6xl mb-[4.31rem] sm:text-3xl font-medium text-primary md-welcome-text">
            Just Be Lekker
          </h1>
          <EmblaCarousel slides={TESTIMONIALS} options={OPTIONS} />
        </div>
        <div className="min-w-full">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
