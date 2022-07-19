import { createObserver } from "./Observer";

describe("Observer tests", () => {
  it("Should invoke the callback function on update", () => {
    const caller = jest.fn();
    const { instance: observer } = createObserver<string>(caller);

    observer.update("new value");

    expect(caller).toHaveBeenCalled();
    expect(caller).toHaveBeenCalledWith("new value");
  });

  it("Should not invoke the callback function after clearcallback is called", () => {
    const caller = jest.fn();
    const { instance: observer } = createObserver<string>(caller);
    observer.clearCallback();

    observer.update("new value");
    expect(caller).not.toHaveBeenCalled();
  });
});
