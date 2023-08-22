import {Provider} from "react-redux";
import {Store} from "@reduxjs/toolkit";
import {ReactNode} from "react";

function ProviderWrapper({children, store}: { children: ReactNode, store: Store }) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Provider store={store}>{children}</Provider>;
}

export default ProviderWrapper;
