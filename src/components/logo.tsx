import { Lusitana } from "next/font/google";

const lusitana = Lusitana({ weight: "700", subsets: ["latin"] });

export const Logo = () => {
  return (
    <span className={`${lusitana.className} text-4xl font-semibold`}>M</span>
  );
};
