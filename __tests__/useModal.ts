import { renderHook, act } from "@testing-library/react";
import { useModal } from "../src/useModal";
import { IModalConfig } from "../src/useModal.types";

const initialConfig: IModalConfig = { open: true };

describe("useModal", () => {
  test("should set the initial configuration and extend it with handleClose fn", () => {
    const { result } = renderHook(() => useModal(initialConfig));
    const currentConfig = result.current.modalConfig;

    expect(currentConfig.handleClose).toBeDefined();
    expect(currentConfig).toMatchObject(initialConfig);
  });

  test("should close the modal through handleClose", () => {
    const { result } = renderHook(() => useModal());
    const currentConfig = result.current.modalConfig;

    expect(currentConfig.handleClose).toBeDefined();
    const spiedHandleClose = jest.spyOn(currentConfig, "handleClose");
    act(() => currentConfig.handleClose());
    expect(spiedHandleClose).toHaveBeenCalled();
  });

  test('should "manually" toggle the modal', () => {
    const initialConfig = { open: Math.random() > 0.5 };
    const { result } = renderHook(() => useModal(initialConfig));
    expect(result.current.modalConfig.open).toBe(initialConfig.open);
    act(() => result.current.toggleModal());
    expect(result.current.modalConfig.open).toBe(!initialConfig.open);
  });

  test('should "manually" show the modal', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.modalConfig.open).toBe(false);
    act(() => result.current.showModal());
    expect(result.current.modalConfig.open).toBe(true);
  });

  test('should "manually" hide the modal', () => {
    const { result } = renderHook(() => useModal(initialConfig));
    expect(result.current.modalConfig.open).toBe(true);
    act(() => result.current.hideModal());
    expect(result.current.modalConfig.open).toBe(false);
  });

  test("should set (replace) the configuration", () => {
    const startingConfig = { ...initialConfig, title: "first title" };
    const { result } = renderHook(() => useModal(startingConfig));
    expect(result.current.modalConfig.title).toEqual(startingConfig.title);
    act(() => result.current.setModalConfig(initialConfig));

    expect(result.current.modalConfig.title).not.toBeDefined();
    expect(result.current.modalConfig).toMatchObject(initialConfig);
  });

  test("should update the modal configuration", () => {
    const updateTitle = "Updated title";
    const { result } = renderHook(() => useModal());
    const updatedConfigFirstChunck: IModalConfig = { title: updateTitle };
    act(() => result.current.updateModalConfig(updatedConfigFirstChunck));
    expect(result.current.modalConfig).toEqual({
      ...result.current.modalConfig,
      ...updatedConfigFirstChunck,
    });
    const updateConfigSecondChunk: IModalConfig = { showCloseIcon: true };
    act(() => result.current.updateModalConfig(updateConfigSecondChunk));
    expect(result.current.modalConfig).toEqual({
      ...result.current.modalConfig,
      ...updatedConfigFirstChunck,
      ...updateConfigSecondChunk,
    });
    expect(result.current.modalConfig.title).toEqual(updateTitle);
    expect(result.current.modalConfig.showCloseIcon).toBe(true);
  });
});
