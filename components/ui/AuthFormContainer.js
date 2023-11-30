export default function AuthFormContainer({ title, children, onSubmit }) {
  return (
    <div className="flex items-center justify-center ">
      <form
        onSubmit={onSubmit}
        className="w-96 p-6 space-y-6 bg-white-color shadow-md rounded-md mt-2"
      >
        <h3 className="text-center font-semibold">{title}</h3>
        {children}
      </form>
    </div>
  );
}
