type AuthButtonProps = {
  text: string;
};

export default function AuthButton({
  text,
}: AuthButtonProps) {

  return (

    <button
      className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400"
    >
      {text}
    </button>

  );
}