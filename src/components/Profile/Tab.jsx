import React from "react";
import Videos from "./Videos";

function Tab() {
  return (
    <>
      <div role="tablist" className="tabs tabs-lifted bg-white pt-5">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-slate-500 mx-10 text-xl font-medium"
          aria-label="Videos"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <Videos />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-slate-500 mx-10 text-xl font-medium"
          aria-label="Tab 2 "
          
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          Tab content 2
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-slate-500 mx-10 text-xl font-medium"
          aria-label="Tab 3"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          Tab content 3
        </div>
      </div>
    </>
  );
}

export default Tab;
