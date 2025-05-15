import { Button, Link, cn } from '@nextui-org/react';
import React, { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { IconProps } from '@phosphor-icons/react';

type Base = {
  icon?: React.ElementType<IconProps>;
  title: string;
  isDisabled?: boolean;
};

type WithChildren = {
  children: React.ReactElement<WithoutChildren> | Array<React.ReactElement<WithoutChildren>>;
  path: string;
};

type WithoutChildren = {
  path: string;
  active?: string[];
  children?: never;
};

export type SidebarTabProps = Base & (WithChildren | WithoutChildren);

const hasChildren = (props: SidebarTabProps): props is Base & WithChildren => {
  return (props as Base & WithChildren).children !== undefined;
};

export const SidebarTab = (props: SidebarTabProps) => {
  const { title, icon: Icon } = props;
  const location = useLocation();

  const getAllPaths = (path: string, active?: string[]) => {
    const paths = [path];
    if (active) {
      paths.push(...active);
    }
    return paths;
  };

  const paths = useMemo(() => {
    if (hasChildren(props)) {
      const arr: string[] = [];
      React.Children.forEach(props.children, (child) => {
        const { path, active } = child.props;
        if (path) {
          arr.push(...getAllPaths(path, active));
        }
      });
      return arr;
    } else {
      return getAllPaths(props.path, props.active);
    }
  }, []);

  const selected = paths.some((path) => matchPath(path, location.pathname));

  return (
    <div className='flex flex-col gap-2'>
      <Button
        className={cn(
          'flex justify-start rounded-none rounded-l-lg bg-transparent text-[#655C68]',
          selected && 'bg-[#F2EAFA] text-[#4500A8]'
        )}
        as={Link}
        startContent={Icon && <Icon size={18} weight='fill' />}
        href={paths[0]}
        isDisabled={props.isDisabled}
      >
        {title}
      </Button>
      {hasChildren(props) && selected && <div className='ml-7 flex flex-col gap-2'>{props.children}</div>}
    </div>
  );
};
