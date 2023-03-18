import { useState } from "react";
import {
  IExtendedModalConfig,
  IModalConfig,
  IUseModalReturn,
} from "./useModal.types";

const defaultConfig: IModalConfig = { open: false };

/**
 * Custom React hook for dynamic modal management
 * @param config - The initial configuration object for the modal
 * @returns An object containing functions and the current modal configuration
 */
const useModal = (config?: IModalConfig): IUseModalReturn => {
  /**
   * State variable that stores the current configuration of the modal window.
   */
  const [modalConfig, setModalConfig] = useState<IModalConfig>({
    ...defaultConfig,
    ...config,
  });

  /**
   * Toggles the modal between open and closed states
   */
  const toggleModal = () =>
    setModalConfig((prev) => ({ ...prev, open: !prev.open }));

  /**
   * Shows the modal
   */
  const showModal = () => setModalConfig((prev) => ({ ...prev, open: true }));

  /**
   * Hides the modal
   */
  const hideModal = () => setModalConfig((prev) => ({ ...prev, open: false }));

  /**
   * Updates the configuration of the modal (mergin with current state)
   * @param config - The partial configuration object to update
   */
  const updateModalConfig = (config: Partial<IModalConfig>) =>
    setModalConfig((prev) => ({ ...prev, ...config }));

  /**
   * Configuration object that extends the current modal configuration with a `handleClose` function.
   */
  const extendConfig: IExtendedModalConfig = {
    ...modalConfig,
    handleClose: hideModal,
  };

  return {
    toggleModal,
    showModal,
    hideModal,
    modalConfig: extendConfig,
    updateModalConfig,
    setModalConfig,
  };
};
export { useModal };
