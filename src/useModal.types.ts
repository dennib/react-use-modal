import { ReactNode, Dispatch, SetStateAction, CSSProperties } from "react";

export interface IUseModalReturn {
  toggleModal: () => void;
  showModal: () => void;
  hideModal: () => void;
  modalConfig: IExtendedModalConfig;
  updateModalConfig: (config: Partial<IModalConfig>) => void;
  setModalConfig: Dispatch<SetStateAction<IModalConfig>>;
}
export interface IModalConfig {
  open?: boolean;
  title?: string;
  centerContent?: boolean;
  showActionsDivider?: boolean;
  showCloseIcon?: true;
  children?: ReactNode;
  buttons?: IModalButton[];
  fullWidthButtons?: true;
  stretchButtons?: boolean;
}

export interface IExtendedModalConfig extends IModalConfig {
  handleClose: () => void;
}
export interface IModalButton {
  text: string;
  style: CSSProperties;
  onClick?: () => void;
  disabled?: boolean;
  disableClose?: boolean;
}
