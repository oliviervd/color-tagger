import React, {Suspense} from "react";
import {Link} from "react-router-dom";
const  SketchLanding = React.lazy(() => import("../sketches/sketchLanding"));

const Landing = () => {

    return(
        <>
            <Link to="model1">
                <h1 style={{
                    "position": "absolute",
                    "left": "45vw",
                    "top": "80vh"
                }}> ENTER </h1>
            </Link>

            <Suspense fallback={<img src="../sketches/49.png"/>}>
                <SketchLanding style={{"z-index": -30000}}/>
            </Suspense>
        </>
    )
}

export default Landing;