import { UserState, user } from ".";

describe("src/redux/reducers/user/index.ts", () => {
  test("update state when calling settings with action type USER_LOGIN", () => {
    const settingsState = user(undefined, {
      type: "USER_LOGIN",
      payload: {
        isLoggedIn: false,
        name: "Luke",
      },
    });
    expect(settingsState).toMatchObject<UserState>({
      isLoggedIn: false,
      name: "Luke",
    });
  });
});
