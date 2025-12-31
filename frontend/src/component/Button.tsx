type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;
export const Button = ({ children, ...props }: Props) => (
  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md" {...props}>
    {children}
  </button>
);