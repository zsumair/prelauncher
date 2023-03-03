import React from "react";

function Navicheck() {
  return (
    <div className="navbar bg-base-300 sticky z-10 top-0 mb-2 border-base-800 shadow-sm rounded-box">
      <div className="flex-1 px-2 lg:flex-none">
        <a className="text-lg font-bold">daisyUI</a>
      </div>
      <div className="flex justify-end flex-1 px-2">
        <div className="flex gap-4 items-stretch">
          <a className="btn btn-ghost rounded-btn">Submit an app</a>
          <div className="dropdown dropdown-end cursor-pointer">
            <div tabIndex={0} className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fA%3D%3D&w=1000&q=80" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navicheck;
