type Props = React.InputHTMLAttributes<HTMLInputElement> & { label: string };
export const Input = ({ label, ...props }: Props) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium">{label}</label>
    <input className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" {...props} />
  </div>
);