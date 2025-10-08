import React from "react";

const RenderIf = ({ condition, children, renderElse = '' }) => {
    if (condition) return <React.Fragment>{children}</React.Fragment>
    return <React.Fragment>{renderElse}</React.Fragment>
}

export default RenderIf