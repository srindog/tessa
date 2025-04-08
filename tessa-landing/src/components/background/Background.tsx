import { ReactNode } from 'react';

export type IBackgroundProps = {
  children: ReactNode;
  className: string;
};

const Background = (props: IBackgroundProps) => (
  <div className={props.className}>{props.children}</div>
);

export { Background };
