import React from 'react';
import TextShow from 'Components/Text/TextShow'

let CourseText = (props) => {
    return (
        <TextShow url={'/getTexts'} {...props} />
    )

}
export default CourseText;
