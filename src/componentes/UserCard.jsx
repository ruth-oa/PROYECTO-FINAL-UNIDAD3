import { usersData } from "../assets/usuarios";

export function UserCard({ user }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <img
        src={user.imageLink}
        alt={user.name}
        className="w-24 h-24 rounded-full mx-auto mb-3"
      />
      <h3 className="text-lg font-semibold text-center">{user.name}</h3>
      <p className="text-sm text-gray-500 text-center">{user.title}</p>
    </div>
  );
}
