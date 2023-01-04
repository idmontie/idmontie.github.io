import { useEffect, useRef, useState } from "react";

export function useClientSideValue<T>(getValue: () => T): T | undefined {
    const getValueStable = useRef(getValue);
    const [clientSideValue, setClientSideValue] = useState<T>();
    useEffect(() => {
        setClientSideValue(getValueStable.current());
    }, []);

    return clientSideValue;
}
