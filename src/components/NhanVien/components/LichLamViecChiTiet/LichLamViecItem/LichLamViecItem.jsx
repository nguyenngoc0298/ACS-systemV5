import React from "react";

export const LichLamViecItem = ({ca,time,arrName = ""}) => {
    return (
        <>  
        <div className="fb">
            {ca}
        </div>
        
        <div className="fb">
        {time}
        </div>
        <div className="content">
            <ul>
                {arrName.map((item)=>
                <li>{item}</li>
                )}
            </ul>
          
        </div>


        </>
    )

}