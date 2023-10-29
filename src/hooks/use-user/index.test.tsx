import { act, renderHook } from "@testing-library/react";
import useUser from ".";
import { Provider } from "react-redux";
import store from "@/store";
import { notification } from "antd";

jest.mock("next/router", () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

jest.mock("@services/user", () => ({
    login: jest.fn(),
}));

const spyNotification = jest.spyOn(notification, "info");

const getUseUserHook = () => {
    const { result } = renderHook(() => useUser(), {
        wrapper: ({ children }) => (
            <Provider store={store}>{children}</Provider>
        ),
    });

    return { result };
};

describe("useUser", () => {
    it("should return an object with login, signUp, signed and fetching properties", () => {
        const { result } = getUseUserHook();

        expect(result.current.login).toBeInstanceOf(Function);
        expect(result.current.signUp).toBeInstanceOf(Function);
        expect(result.current.signed).toBe(false);
        expect(result.current.fetching).toBe(false);
    });

    it("should show error notification when login function fails", async () => {
        const { result } = getUseUserHook();
        const email = "test@example.com";
        const password = "password";

        await act(async () => {
            await result.current.login(email, password);
        });
        expect(spyNotification).toHaveBeenCalledWith({
            message: "Serviço indisponível",
            placement: "top",
        });
    });
});
