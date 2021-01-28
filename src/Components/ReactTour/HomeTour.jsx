import React, { useState, useEffect } from "react";
import Tour from "reactour";


export const HomeTour = (props) => {

 const [isTourOpen, setIsTourOpen] = useState(false)
 const [isShowingMore, setIsShowingMore] = useState(false)

   const toggleShowMore = () => {
    setIsShowingMore(prev => !prev)
  };

   const openTour = () => {
    setIsTourOpen(true)
  };

   const accentColor = "#5cb7b7";
    return (
      <div>
        {/* <Demo
          openTour={openTour}
          toggleShowMore={toggleShowMore}
          isShowingMore={isShowingMore}
        /> */}
        <Tour
          onRequestClose={() => setIsTourOpen(false)}
          steps={HOMESTEPS}
          isOpen={isTourOpen}
          maskClassName="mask"
          className="helper"
          rounded={5}
          accentColor={accentColor}
        />
      </div>
    );
  
}

export const HOMESTEPS = [
    {
        'selector': '[data-tour = "hs1"]',
        'content': ,
        'position':,
        'action': ,
        'style': ,
        'stepInteraction': ,
        'navDotAriaLabel': ,
      },
      {
        'selector': '[data-tour = "hs2"]',
        'content': ,
        'position':,
        'action': ,
        'style': ,
        'stepInteraction': ,
        'navDotAriaLabel': ,
      },
      {
        'selector': '[data-tour = "hs3"]',
        'content': ,
        'position':,
        'action': ,
        'style': ,
        'stepInteraction': ,
        'navDotAriaLabel': ,
      },
      {
        'selector': '[data-tour = "hs4"]',
        'content': ,
        'position':,
        'action': ,
        'style': ,
        'stepInteraction': ,
        'navDotAriaLabel': ,
      },
      {
        'selector': '[data-tour = "hs5"]',
        'content': ,
        'position':,
        'action': ,
        'style': ,
        'stepInteraction': ,
        'navDotAriaLabel': ,
      },
]