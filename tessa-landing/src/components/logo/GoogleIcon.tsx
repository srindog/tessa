import GoogleLogo from '../../../public/assets/images/Google.svg';

type ILogoProps = {
  xl?: boolean;
};

const GoogleIcon = (props: ILogoProps) => {
  const size = props.xl ? '40' : '28';
  const fontStyle = props.xl
    ? 'font-semibold text-3xl'
    : 'font-semibold text-xl';

  return (
    <span
      className={`pl-1 pt-1 text-gray-900 inline-flex items-center ${fontStyle}`}
    >
      <GoogleLogo width={size} height={size} />
    </span>
  );
};

export { GoogleIcon };
