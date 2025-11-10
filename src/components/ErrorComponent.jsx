// src/components/ErrorComponent.jsx
export default function ErrorComponent({ message }) {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow">
        ⚠️ {message || "Something went wrong. Please try again."}
      </div>
    </div>
  );
}
