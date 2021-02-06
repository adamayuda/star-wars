import { UserState, user } from ".";

describe("src/redux/reducers/user/index.ts", () => {
  test("update state when calling settings with action type UPDATE_USER_INFO", () => {
    const settingsState = user(undefined, {
      type: "UPDATE_USER_INFO",
      payload: {
        username: "Adam",
        picture: "/picture/test.jpg",
      },
    });
    expect(settingsState).toMatchObject<UserState>({
      username: "Adam",
      picture: "/picture/test.jpg",
      token: "",
    });
  });
});
