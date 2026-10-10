export default function MessengerIcon({ messenger }: { messenger: "telegram" | "max" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      {messenger === "telegram" ? (
        <path d="M21.4 3.4 18 20.1c-.26 1.18-.95 1.47-1.92.92l-5.18-3.82-2.5 2.41c-.28.28-.52.52-1.06.52l.38-5.27 9.6-8.67c.42-.37-.1-.58-.65-.21L4.8 13.45l-5.1-1.6c-1.1-.35-1.13-1.1.23-1.63L19.85 2.5c.93-.34 1.74.22 1.55.9Z" transform="translate(1 0) scale(.94)" />
      ) : (
        /* Monochrome MAX chat-bubble mark with its open lower-left tail. */
        <path fillRule="evenodd" d="M12 1.5C6.2 1.5 1.5 5.9 1.5 11.4c0 2.1.7 4.1 1.9 5.7l-.7 4.8 4.8-1.4c1.4.6 2.9 1 4.5 1 5.8 0 10.5-4.4 10.5-10.1C22.5 5.9 17.8 1.5 12 1.5Zm0 4.1c3.5 0 6.3 2.6 6.3 5.8s-2.8 6-6.3 6c-1.2 0-2.4-.3-3.4-.9l-2 .6.3-2c-.8-1-1.2-2.3-1.2-3.7 0-3.2 2.8-5.8 6.3-5.8Z" clipRule="evenodd" />
      )}
    </svg>
  );
}
