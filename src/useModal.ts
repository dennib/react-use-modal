import { useState } from "react";
import { IExtendedModalConfig, IModalConfig, IUseModalReturn } from "./useModal.types";

const defaultConfig: IModalConfig = { open: false };

const useModal = (config?: IModalConfig): IUseModalReturn => {
  const [modalConfig, setModalConfig] = useState<IModalConfig>({
    ...defaultConfig,
    ...config,
  });

  const toggleModal = () => {
    setModalConfig((prev) => ({ ...prev, open: !prev.open }));
  };

  const showModal = () => setModalConfig((prev) => ({ ...prev, open: true }));

  const hideModal = () => setModalConfig((prev) => ({ ...prev, open: false }));

  const updateModalConfig = (config: Partial<IModalConfig>) =>
    setModalConfig((prev) => ({ ...prev, ...config }));

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
