import { ReactNode } from 'react';

type ISectionProps = {
  yPadding?: string;
  // sectionWidth?: string;
  children: ReactNode;
};

// ${
//   props.sectionWidth ? props.sectionWidth : 'lg'
// }

const Section = (props: ISectionProps) => (
  <div
    className={`max-w-screen-lg mx-auto px-3 ${
      props.yPadding ? props.yPadding : 'py-10'
    }`}
  >
    {props.children}
  </div>
);

export { Section };
