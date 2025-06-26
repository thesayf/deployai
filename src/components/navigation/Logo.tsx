import Link from "next/link";

// export const Logo = () => {
//   return (
//     <img
//       src="/logo.png"
//       alt="deployAI studio"
//       width="120"
//       height="auto"
//       className="h-auto"
//     />
//   );
// };

// export const LogoSmall = () => {
//   return (
//     <img
//       src="/logo.png"
//       alt="deployAI studio"
//       width="100"
//       height="auto"
//       className="h-auto"
//     />
//   );
// };

// export const LogoLarge = () => {
//   return (
//     <img
//       src="/logo.png"
//       alt="deployAI studio"
//       width="150"
//       height="auto"
//       className="h-auto mb-3"
//     />
//   );
// };

export const Logo = () => {
  return (
    <Link href="/" aria-label="Go to homepage">
      <img
        src="/logo.png"
        alt="deployAI studio"
        width="150"
        height="auto"
        className="h-12 w-auto cursor-pointer"
      />
    </Link>
  );
};

export const LogoSmall = () => {
  return (
    <Link href="/" aria-label="Go to homepage">
      <img
        src="/logo.png"
        alt="deployAI studio"
        width="100"
        height="auto"
        className="h-auto cursor-pointer"
      />
    </Link>
  );
};

export const LogoLarge = () => {
  return (
    <Link href="/" aria-label="Go to homepage">
      <img
        src="/logo.png"
        alt="deployAI studio"
        width="150"
        height="auto"
        className="mb-3 h-auto cursor-pointer"
      />
    </Link>
  );
};
