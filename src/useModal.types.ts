import { ReactNode, Dispatch, SetStateAction, CSSProperties } from "react";

/**
 * The return type of the `useModal` hook
 */
export interface IUseModalReturn {
  /** Function to toggle the open state of the modal */
  toggleModal: () => void;
  /** Function to show the modal */
  showModal: () => void;
  /** Function to hide the modal */
  hideModal: () => void;
  /** The current configuration object for the modal */
  modalConfig: IExtendedModalConfig;
  /** Function to update the configuration object for the modal (merge with prev state) */
  updateModalConfig: (config: Partial<IModalConfig>) => void;
  /** Function to replace the entire configuration object for the modal */
  setModalConfig: Dispatch<SetStateAction<IModalConfig>>;
}

/**
 * Configuration object for the modal
 */
export interface IModalConfig {
  /** Determines whether the modal is open or closed */
  open?: boolean;
  /** The title of the modal */
  title?: string;
  /** Determines whether to show the close icon on the modal */
  showCloseIcon?: true;
  /** The content to display inside the modal */
  children?: ReactNode;
  /** An array of buttons to display at the bottom of the modal */
  buttons?: IModalButton[];
}

/**
 * An extended version of the `IModalConfig` that includes a `handleClose` function
 */
export interface IExtendedModalConfig extends IModalConfig {
  handleClose: () => void;
}

/**
 * The shape of any buttons you want yo use in the modal
 */
export interface IModalButton {
  /** The text to display on the button */
  text: string;
  /** Optional styling for the button */
  style?: CSSProperties;
  /** Function to call when the button is clicked */
  onClick?: () => void;
  /** Determines whether the button is disabled */
  disabled?: boolean;
  /** Determines whether to close the modal when the button is clicked */
  disableClose?: boolean;
}

/**
 * Expose a specific type for your modal compoent props, at the moment identical to `IExtendedModalConfig`
 */
export type ModalProps = IExtendedModalConfig;
