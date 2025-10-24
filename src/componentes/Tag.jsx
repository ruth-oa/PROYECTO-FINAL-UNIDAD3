export function Tag({ children, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-2 py-1 rounded-full border transition ${
        active
          ? "bg-yellow-400 text-blue-800 border-yellow-500"
          : "bg-blue-50 text-blue-700 border-blue-200 hover:bg-yellow-50"
      }`}
    >
      {children}
    </button>
  );
}