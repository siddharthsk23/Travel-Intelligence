export default function ChatBubble({ message }) {
    return (
        <div className="flex justify-start animate-fade-in">
            <div className="max-w-xl bg-cyan-600 text-white px-5 py-4 rounded-2xl shadow-lg">
                🤖 {message}
            </div>
        </div>
    );
}