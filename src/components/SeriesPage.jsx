import { useContext, useState } from "react"
import { useLocation } from "react-router-dom"
import { SeriesContext } from "../Contexts"

function SeriesPage() {
const location = useLocation();
const { series } = useContext(SeriesContext);

// const currentSeries 

    return (
        <div className="pageDisplay">
            <h1></h1>

        </div>
    )
}