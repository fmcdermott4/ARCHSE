import React, { Component } from 'react';

class PDF extends Component {
    render(x) {

        //   let widthPixels = (window.screen.width * window.devicePixelRatio*.8)+"px";
        //   let heightPixels = (window.screen.height * window.devicePixelRatio*.8)+"px";

        return (
            
            <div>
                {console.log("X is " + x)}
                <embed title="PDF" src={"./NEWAIR_COMPACT_REFRIDGERATION_GRADING_STANDARDS.pdf"} type="application/pdf" />
            </div>
            
        );
    }
}
export default PDF;