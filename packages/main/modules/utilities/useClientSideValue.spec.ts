import { renderHook } from "@testing-library/react";
import { useClientSideValue } from "./useClientSideValue";

describe("useClientSideValue", () => {
    it("should return the value when immediately called", () => {
        const { result } = renderHook(() => useClientSideValue(() => "test"));
        expect(result.current).toBe("test");
    });

    it("should return the value from the getter function after mount", () => {
        const getValue = jest.fn(() => "test value");
        const { result } = renderHook(() => useClientSideValue(getValue));

        // After mount, the value should be set
        expect(result.current).toBe("test value");
        expect(getValue).toHaveBeenCalledTimes(1);
    });

    it("should maintain stable reference to the getter function", () => {
        const getValue = jest.fn(() => "test value");
        const { rerender } = renderHook(() => useClientSideValue(getValue));

        // Rerender with a new function reference
        const newGetValue = jest.fn(() => "new value");
        rerender(() => useClientSideValue(newGetValue));

        // The original function should still be used
        expect(getValue).toHaveBeenCalledTimes(1);
        expect(newGetValue).not.toHaveBeenCalled();
    });

    it("should work with different types of values", () => {
        const numberValue = 42;
        const { result: numberResult } = renderHook(() =>
            useClientSideValue(() => numberValue)
        );
        expect(numberResult.current).toBe(numberValue);

        const objectValue = { key: "value" };
        const { result: objectResult } = renderHook(() =>
            useClientSideValue(() => objectValue)
        );
        expect(objectResult.current).toEqual(objectValue);
    });
});
