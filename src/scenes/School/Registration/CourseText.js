import React from 'react';
import EditText from 'Components/Text/EditText'

let CourseText = (props) => {
    return (
        <EditText url={'/getTexts'} {...props} />
    )

}
export default CourseText;
