import { createObserver } from "./Observer";

describe("Observer tests", () => {
  it("Should invoke the callback function on update", () => {
    const caller = jest.fn();
    const { instance: observer } = createObserver<string>(caller);

    observer.update("new value");

    expect(caller).toHaveBeenCalled();
    expect(caller).toHaveBeenCalledWith("new value");
  });

  it("Should throw if the observer is updated after marked as destroyed", () => {
    const caller = jest.fn();
    const { instance: observer } = createObserver<string>(caller);
    observer.destroy();

    const notifyDestroyedObserver = () => {
      observer.update("new value");
    };

    expect(notifyDestroyedObserver).toThrow();
  });
  it("Should throw if the observer is destroyed more than once", () => {
    const caller = jest.fn();

    const { instance: observer } = createObserver<string>(caller);
    observer.destroy();

    const destroyDestroyedObserver = () => {
      observer.destroy();
    };

    expect(destroyDestroyedObserver).toThrow();
  });
});
