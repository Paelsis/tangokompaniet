import React from "react"

export default ({company, startYear, style}) => {
    const currentYear = new Date().getFullYear()

    return (
        <small style={style?style:{}}>
            &copy;&nbsp;{company}&nbsp;{startYear}&nbsp;-&nbsp;{currentYear}
        </small>
    )
}