import React, {useState} from "react";
import HexCube from "../components/cube"
import ObjectDescription from "./objectDescription";

import ldes_translations from "../data/postgres_ldes_dmg_translations_ldes_dmg.json"

function LDESViaURI(uri) {
    return ldes_translations.filter(
        function(ldes_translations) {
            return ldes_translations.URI === uri
        }
    )

}

const ColorCubes = (props) => {

    // open close object description

    const [objectDescription0, setObjectDescription0] = useState(true);
    const [objectDescription1, setObjectDescription1] = useState(true);
    const [objectDescription2, setObjectDescription2] = useState(true);


    function openDescription0() {
        setObjectDescription0(!objectDescription0);
    }
    function openDescription1() {
        setObjectDescription1(!objectDescription1);
    }
    function openDescription2() {
        setObjectDescription2(!objectDescription2);
    }


    // retrieve and parse data

        const selection = props.curation
        const object_colors = props.data
        const objCount = props.num
        //console.log(props.data);
        const color_hex = [];
        const color_names = [];
        const obj_titles_EN = [];
        const obj_desc_EN = [];
        const object_number = [];
        const LDES = [];

        for (var hexNum=0; hexNum<objCount; ++hexNum) {
            const x = selection[hexNum];
            var _hexVal = object_colors[x]["HEX_values"].replace("['","").replace("']","").replace("'","").replace("]","").split(",")
            const uri = object_colors[x]["URI"];
            const color_name = object_colors[x]["color_names"]

            const _LDES = LDESViaURI(uri)

            const title_en = _LDES[0]["title_en"];
            const desc_en = _LDES[0]["description_adlib_en"]
            const LDES_object = JSON.parse(_LDES[0][0]);

            color_hex.push(_hexVal);
            color_names.push(color_name);
            obj_titles_EN.push(title_en);
            obj_desc_EN.push(desc_en);
            object_number.push(LDES_object["Entiteit.identificator"][1]["skos:notation"]["@value"])
            LDES.push(LDES_object);

        }

        console.log(LDES);
        console.log(object_number)

        // function to copy values to clipboard

        function copyTextToClipBoard_0() {
            let copyText = color_hex[0]
            navigator.clipboard.writeText(copyText);
            alert("Copied the values: " +  copyText);
        }

        function copyTextToClipBoard_1() {
            let copyText = color_hex[1]
            navigator.clipboard.writeText(copyText);
            alert("Copied the values: " +  copyText);
        }

        function copyTextToClipBoard_2() {
            let copyText = color_hex[2]
            navigator.clipboard.writeText(copyText);
            alert("Copied the values: " +  copyText);
        }

    return(
            <div className="container">
                    <div>
                        <HexCube id="HexCube"
                            hexColors = {color_hex[0]}
                            color_names={color_names[0]}/>
                        <div className="dotLine"/>
                        <div className="title-box">
                            <div className="title-box__top">
                                <div className="pinkHeader italic" onClick={openDescription0}>[read more]</div>
                                <div className="pinkHeader italic right" onClick={copyTextToClipBoard_0}>[copy to clipboard]</div>
                            </div>
                            <p className="pinkHeader italic">{object_number[0]}</p>
                            <p className="title-box__title italic" onClick={openDescription0}>{obj_titles_EN[0]}</p>
                        </div>
                        <br/><br/>
                        {objectDescription0 &&
                            <div>
                                <div className="easeBorder__green"/>
                                <div className="rowScroll">
                                    <ObjectDescription text={obj_desc_EN[0]}/>
                                </div>
                            </div>
                        }
                    </div>
                    <div>
                        <HexCube
                            hexColors = {color_hex[1]}
                            color_names={color_names[1]}
                        />
                        <div className="dotLine"/>
                        <div className="title-box">
                            <div className="title-box__top">
                                <div className="pinkHeader italic" onClick={openDescription1}>[read more]</div>
                                <div className="pinkHeader italic right" onClick={copyTextToClipBoard_1}>[copy to clipboard]</div>
                            </div>
                            <p className="pinkHeader italic">{object_number[1]}</p>
                            <p className="title-box__title italic" onClick={openDescription1} >{obj_titles_EN[1]}</p>
                        </div>
                        <br/><br/>
                        {objectDescription1 &&
                            <div>
                                <div className="easeBorder__green"/>
                                <div className="rowScroll">
                                    <ObjectDescription text={obj_desc_EN[1]}/>
                                </div>
                            </div>
                        }
                    </div>
                    <div>

                        <HexCube
                            hexColors = {color_hex[2]}
                            color_names={color_names[2]}
                        />
                        <div className="dotLine"/>
                        <div className="title-box">
                            <div className="title-box__top">
                                <div className="pinkHeader italic" onClick={openDescription2}>[read more]</div>
                                <div className="pinkHeader italic right" onClick={copyTextToClipBoard_2}>[copy to clipboard]</div>
                            </div>
                            <p className="pinkHeader italic">{object_number[2]}</p>
                            <p className="title-box__title italic" onClick={openDescription2}>{obj_titles_EN[2]}</p>
                        </div>
                        <br/><br/>
                        {objectDescription2 &&
                            <div>
                                <div className="easeBorder__green"/>
                                <div className="rowScroll">
                                    <ObjectDescription text={obj_desc_EN[2]}/>
                                </div>
                            </div>
                        }
                    </div>

            </div>
        )

}

export default ColorCubes;