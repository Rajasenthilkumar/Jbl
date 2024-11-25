import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import type React from 'react';
import { useCallback } from 'react';
import { DotButton, useDotButton } from './EmblaCarouselDotButton';
import './embala.css';
import cx from 'classnames';
import type { TestimonialType } from 'views/layout/AuthLayout';

type PropType = {
  slides: TestimonialType[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      stopOnInteraction: false,
    }),
  ]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick,
  );

  return (
    <section className="embla bg-[#F9FDFF] px-5 py-6 rounded-lg custom-carousel">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div
              className="flex flex-col gap-4 embla__slide text-Grey"
              key={slide.firstName + slide.lastName}
            >
              <div className="text-xl">
                “<b className="text-primary ">{slide.totalPercentage}%</b>{' '}
                <span className="text-Grey"> {slide.content}</span>“
              </div>
              <div className="text-base">
                - {slide.firstName} {slide.lastName}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid items-center justify-center w-full mt-3 place-item-center">
        <div className="flex gap-1">
          {scrollSnaps.map((number, index) => (
            <DotButton
              key={number}
              onClick={() => onDotButtonClick(index)}
              className={cx(
                'h-1 w-1 rounded-[0.5rem]  bg-bg_primary cursor-pointer',
                {
                  'bg-primary w-4 transition duration-300 ease-in-out':
                    index === selectedIndex,
                  'bg-bg_primary': index !== selectedIndex,
                },
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
