import React from "react";
import Videos from "./Videos";
import Tweets from "./Tweets";

function Tab() {
  return (
    <>
      <div role="tablist" className="tabs tabs-lifted pt-5 z-0">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-slate-500 lg:mx-10 lg:text-xl sm:text-lg mx-2 font-medium"
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
          className="tab text-slate-500 lg:mx-10 lg:text-xl sm:text-lg mx-2 font-medium"
          aria-label="Tweets"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <Tweets />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-slate-500 lg:mx-10 lg:text-xl sm:text-lg mx-2 font-medium"
          aria-label="Playlists"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          This page will add soon...
        </div>
      </div>
    </>
  );
}

export default Tab;
