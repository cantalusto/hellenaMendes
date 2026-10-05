export function Arrow({ direction = "up", className = "" }) {
  const paths = {
    up: "M5 19 19 5M5 5h14v14",
    down: "M12 4v16M5 13l7 7 7-7",
    left: "M20 12H4m7-7-7 7 7 7",
    right: "M4 12h16m-7-7 7 7-7 7",
  };
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={paths[direction] || paths.up}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star({ className = "" }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 100 100"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="m50 0 8 31 27-16-16 27 31 8-31 8 16 27-27-16-8 31-8-31-27 16 16-27L0 50l31-8-16-27 27 16Z" />
    </svg>
  );
}

export function Close({ className = "" }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="m6 6 12 12M6 18 18 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Plus() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Hand() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 13V6a1.5 1.5 0 0 1 3 0v6-8a1.5 1.5 0 0 1 3 0v8-6a1.5 1.5 0 0 1 3 0v7-3a1.5 1.5 0 0 1 3 0v5a7 7 0 0 1-7 7c-3 0-5-2-6.5-4L3 13a1.5 1.5 0 0 1 2.5-1.5L8 14M3 5 2 3m20 2 1-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
