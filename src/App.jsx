import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom';

function App() {
  const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Dashboard", src: "Chart_fill",to: "/" },
        { title: "Projects Management", src: "Chat", to:"/projects"},
        { title: "Blogs Management", src: "User",  to: "/blogs" },
        { title: "Reviews Management ", src: "Calendar", to:"/reviews" },
    ];
    return (
        <main className='flex'>
            <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
          Project Dashboard
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <NavLink to={Menu.to}>
                <img src={`./src/assets/${Menu.src}.png`} />
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
            </div>

            <div className="h-screen flex-1 p-7">
              <Outlet/>
            </div>
            
        </main>
    );
}

export default App
