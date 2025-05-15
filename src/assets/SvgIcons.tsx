import StarsIcon from './icons/stars-icon.svg?react';

export const icons = {
  StarsIcon,
};
export type Icons = keyof typeof icons;

type SvgProps = {
  name: Icons;
  color?: string;
  size?: number;
};

export const SvgIcon = ({ name, color = 'black', size = 20 }: SvgProps) => {
  const style = {
    width: size,
    height: size,
  };

  const Icon = icons[name];

  return <Icon style={style} stroke={color} />;
};
