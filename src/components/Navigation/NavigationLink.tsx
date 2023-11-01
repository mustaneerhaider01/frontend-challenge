import { NavLink, To } from "react-router-dom";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  href: To;
};

function NavigationLink({ children, href }: Props) {
  return (
    <NavLink
      className={({ isActive }) =>
        twMerge(
          "text-blue-100 pb-1 border-b-2 border-transparent hover:text-white hover:border-white transition",
          isActive && "border-white text-white font-semibold"
        )
      }
      to={href}
    >
      {children}
    </NavLink>
  );
}

export default NavigationLink;
