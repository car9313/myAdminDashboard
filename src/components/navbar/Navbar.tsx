import { NavUser } from "../mySidebar/nav-user";
import ThemeSwitch from "../theme-switch";
import { Input } from "../ui/input";
import { UserNav } from "../user-nav";

const Navbar = () => {
  return (
    <>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
      />
      <div className="ml-auto flex items-center space-x-4">
        <UserNav />
        <ThemeSwitch />
        {/* <NavUser /> */}
        {/* Mobile Sidebar (Sheet) */}
      </div>
    </>
  );
};
export default Navbar;
