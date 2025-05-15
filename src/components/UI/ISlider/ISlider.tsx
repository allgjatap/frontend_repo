import { Slider, SliderProps } from '@nextui-org/react';
import './ISlider.css';

export type ISliderProps = SliderProps & { customColor?: string };

export const ISlider = ({ customColor, ...props }: ISliderProps) => {
  const otherProps: any = customColor
    ? {
        classNames: {
          filler: 'Slider-filler',
          thumb: 'Slider-thumb',
          track: 'Slider-track',
        },
        style: {
          '--slider-filler-bg': customColor,
          '--slider-thumb-bg': customColor,
        },
      }
    : {};

  return <Slider {...props} {...otherProps} />;
};
