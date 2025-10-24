import { Tag } from "./Tag";


export function PostCard({ post, onRead }) {
  return (
    <article className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col md:flex-row border border-yellow-100 hover:shadow-lg transition">
      <div className="md:w-1/3 h-44 md:h-auto">
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 md:w-2/3 flex flex-col justify-between">
        <div>
          <div className="flex gap-2 mb-3">
            {post.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600">{post.excerpt}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            <div>{post.author}</div>
            <div>{post.date}</div>
          </div>
          <button
            onClick={() => onRead(post)}
            className="px-4 py-2 bg-yellow-400 text-blue-800 rounded-full text-sm font-semibold shadow-sm hover:bg-yellow-500 transition"
          >
            Leer más
          </button>
        </div>
      </div>
    </article>
  );
}