import { createContext, useContext } from "react";

type LayoutUiContextValue = {
    openTutorials: () => void;
    openContact: () => void;
};

const LayoutUiContext = createContext<LayoutUiContextValue | null>(null);

export function useLayoutUi() {
    return useContext(LayoutUiContext);
}

export default LayoutUiContext;
