# useModal

![banner2](https://user-images.githubusercontent.com/13068594/226136792-623a7e44-d93a-4b04-b8b4-2ff7c6f40336.jpg)

react-use-modal is a custom hook that provides a flexible and reusable way to manage modals in React applications.

Use a single line of `jsx` tag to insert your `Modal component` in page and use `useModal` configuration as props. Then go from there: update the same modal with dynamic content with functions provided by the hook.

In its basic implementation `useModal` lets you manage multiple modals in page in a reusable way without the need to write complex jsx code with as many Modal components (and relative states) as the number of different modals you want.

## Highlights

- Great **flexibiliy**: use a single `jsx` tag updated dynamically for all the modals in you page...
- ...or decouple part of the logic from the hook and manage it yourself in your page/component
- **Small** and minified **bundle size**
- Type safe with **TypeScript**

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Basic](#basic)
  - [Alternative](#alternative)
    - [Partial config update](#update-current-config-partially)
    - [Decoupled logic](#decoupled-logic)
- [Modal Component](#modal-component-coming-soon)
- [API](#api)
  - [Properties and methods](#properties-and-methods)
  - [Hook configuration / Modal props](#hook-configuration--modal-props)
  - [Buttons](#buttons)
- [Technologies](#technologies)
- [Contributors](#contributors)

---

## Installation

To install the package, you can use npm or yarn:

```bash
npm install react-use-modal
```

## Usage

### Basic

1. **Import** the `useModal` hook

```jsx
import { useModal } from "react-use-modal";
```

2. **Call the hook** to get modal configuration and relative helper functions: `modalConfig` and `setModalConfig`.

```jsx
const { setModalConfig, modalConfig } = useModal();
```

3. **Spread** `modalConfig` on your Modal component (you can find an example of a custom Modal component implementation below)

```jsx
const MyPageComponent = () => {
  const { setModalConfig, modalConfig } = useModal();

  return (
    <>
      ...Some page content here...
      <Modal {...modalConfig} />
    </>
  );
};
```

4. Use the `setModalConfig` function wherever you want passing a **configuration object** to it.

```jsx
const MyPageComponent = () => {
  const { setModalConfig, modalConfig } = useModal();

  const handleOpenModal = () => {
    setModalConfig({
      open: true,
      title: "I'm the first modal",
      children:
        "Content message of the modal inside a component of your choice",
      buttons: [
        {
          text: "Confirm",
        },
      ],
    });
  };

  return (
    <>
      ...Some page content here...
      <div onClick={handleOpenModal} className="btn">
        Show modal
      </div>
      <Modal {...modalConfig} />
    </>
  );
};
```

![example1](https://user-images.githubusercontent.com/13068594/226113275-1ede9847-f6e8-4e97-87d0-d353bee5f4e0.jpg)

> _Basic example: click on "Show modal" button will execute `setModalConfig` with the config we defined_.

### Alternative

#### **Update** current config **partially**

Maybe you want to update only part of current `modalConfig`, let's say we have an open modal and we would like to change part of it's content when the user presses one of it's buttons. We can achieve this by using the functino `updateModalConfig` returned by the hook like so

```jsx
const MyPageComponent = () => {
  const { setModalConfig, modalConfig, updateModalConfig } = useModal();

  const handleOpenModal = () => {
    setModalConfig({
      open: true,
      title: "I'm the first modal",
      children:
        "Content message of the modal inside a component of your choice",
      buttons: [
        {
          text: "Cancel",
        },
        {
          text: "Confirm",
          disableClose: true,
          onClick: showSecondModal,
        },
      ],
    });

  const showSecondModal = () => {
    updateModalConfig({
      title: "I'm the second modal",
      children:
        "Are you sure you want to proceed?",
      buttons: [
        {
          text: "Yes, I am!",
        },
      ],
    });
  }


 // ... same jsx content as seen above

};
```

Here we've added a second button, the cancel button simply abort the operation closing the modal (so has no need for additional handlers, the confirm button is stopped from closing the modal, we pass it a handler which calls `updteModalConfig` from the hook and we update with it only the parts of the config that we need.

![example2](https://user-images.githubusercontent.com/13068594/226114740-d2d81e7c-ca27-4b9e-a055-0eb1de71a757.jpg)

> _Alternative usage: here you can see `updateModalConfig` in action, passing from previous config (left) to partially modified one (right)_.

#### Decoupled logic

If you have some complex, maybe verbose piece of `jsx` (eg. for `children` or `buttons`) you can decouple some props handling from the hook thus leveraging from it only part of the configuration while managing the other part manually in your page/component, let's see an example for state dependent children.

```jsx
const initialModalConfig = {
  title: "I'm a complex modal!",
};

const MyPageComponent = () => {
  const { modalConfig, showModal } = useModal();
  const [isSomethingActive, setIsSomethingActive] = useState < boolean > false;

  const currentButtons: IModalButton[] = isSomethingActive
    ? [{ text: "Button for active state" }]
    : [{ text: "Inactive btn 1" }, { text: "Inactive btn 2" }];

  return (
    <>
      <div onClick={showModal} className="btn">
        Show modal
      </div>

      <div
        onClick={() => setIsSomethingActive((prev) => !prev)}
        className="btn"
      >
        Toggle active state
      </div>

      <Modal {...modalConfig} buttons={currentButtons}>
        {isSomethingActive ? (
          <div>Some jsx here for the active state</div>
        ) : (
          <div>Some other jsx for inactive state</div>
        )}
      </Modal>
    </>
  );
};
```

Here yoy can see an example of `useModal` usage with non-empty initial configuration, showing the modal through `showModal` function and more importantly the decoupled/rewritten props `children` and `buttons`. This pattern can be used for complex, verbose or state dependent content.

![example3](https://user-images.githubusercontent.com/13068594/226135165-5812a194-bb99-4a2c-bc17-936604a7c2ef.jpg)

> _Alternative usage: config through hook inital config, modal shown with `showModal`, rewritten `buttons` and `children` Modal props_.

---

## Modal Component (coming soon)

At the moment we **don't provide** the `Modal component`. The hook provides config and functions, you are supposed to adjust your Modal component to them. Soon we will provide an official Modal too. In the meantime you can find below an example of how we implemented the Modal for the examples seen in this doc.

```tsx
// Modal.tsx

import { ModalProps } from "react-use-modal";
import styles from "./Modal.module.css";

export const Modal = ({
  open,
  title,
  children,
  handleClose,
  showCloseIcon,
  buttons,
}: ModalProps) => {
  return open ? (
    <>
      <div className={styles.modalBody}>
        {showCloseIcon && (
          <div className={styles.close} onClick={handleClose}></div>
        )}
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>{children}</div>

        <ModalActions handleClose={handleClose} buttons={buttons} />
      </div>
      <div className={styles.overlay} onClick={handleClose}></div>
    </>
  ) : null;
};
```

```tsx
// ModalActions.tsx

import { ModalProps } from "react-use-modal";
import styles from "./Modal.module.css";

export const ModalActions = ({
  buttons,
  handleClose,
}: Pick<ModalProps, "buttons" | "handleClose">) => (
  <div className={styles.actions}>
    {buttons?.map(({ text, disableClose, disabled, onClick, style }, idx) => {
      const handleClick = () => {
        !disabled && onClick?.();
        if (!disableClose) handleClose();
      };
      return (
        <div
          key={idx}
          onClick={handleClick}
          className={styles.btn}
          style={style}
        >
          {text}
        </div>
      );
    })}
  </div>
);
```

<details>
  <summary>See CSS Code</summary>

```css
/* Modal.module.css */

.overlay {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.6);
}

.modalBody {
  position: absolute;
  min-width: 300px;
  max-width: 500px;
  min-height: 100px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  z-index: 2;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.5);
  padding: 15px;
}

.title {
  font-weight: bold;
  margin-top: 20px;
  font-size: 22px;
}

.message {
  margin: 20px;
  font-size: 16px;
}

.close:after {
  position: absolute;
  right: 20px;
  top: 10px;
  line-height: 1em;
  font-size: 40px;
  display: block;
  content: "\00d7";
  cursor: pointer;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
  margin-bottom: 10px;
}

.btn {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid grey;
  text-align: center;
  min-width: 80px;
  cursor: pointer;
}
```

  </details>

---

## API

### Properties and methods

`IUseModalReturn`

| Property            | Type                                      | Default                                                                                                             | Description |
| ------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------- |
| `modalConfig`       | `IExtendedModalConfig`                    | The current configuration of the modal (usable to as Modal props), auto inject handleClose function                 |
| `setModalConfig`    | `Dispatch<SetStateAction<IModalConfig>>`  | Replace the entire configuration of the modal with the `IModalConfig object` provided as the argument               |
| `updateModalConfig` | `(config: Partial<IModalConfig>) => void` | Updates the configuration of the modal with the properties provided in the config object (merge with current state) |
| `toggleModal`       | `() => void`                              | Toggles the visibility of the modal                                                                                 |
| `showModal`         | `() => void`                              | Shows the modal                                                                                                     |
| `hideModal`         | `() => void `                             | Hides the modal                                                                                                     |

### Hook configuration / Modal props

`IModalConfig` / `IExtendedModalConfig`

The following properties can be passed as **configuration options** when calling the useModal hook, or as props to your modal component.
Your modal is supposed to have (or extend) the same shape of hook configuration interface: in particular the hook implement `IModalConfig` interface while the modal is supposed to extend the already _extended_ `IExtendedModalConfig` the automatically injects also and `handleClose` function to close the modal when clicking on backdrop or non-disabled buttons.

| Property         | Type             | Default     | Description                             |
| ---------------- | ---------------- | ----------- | --------------------------------------- |
| `open`           | `boolean`        | `false`     | Whether the modal is currently open     |
| `title?`         | `string`         | `undefined` | The title of the modal                  |
| `showCloseIcon?` | `boolean`        | `undefined` | Whether to show top right close icon    |
| `children?`      | `ReactNode`      | `undefined` | The content to display within the modal |
| `buttons?`       | `IModalButton[]` | `undefined` | Whether the modal is currently open     |

### Buttons

`IModalButton`

| Property        | Type            | Default     | Description                                                     |
| --------------- | --------------- | ----------- | --------------------------------------------------------------- |
| `text`          | `string`        | ``          | The text to display on the button                               |
| `style?`        | `CSSProperties` | `{}`        | Custom styles to apply to the button                            |
| `onClick?`      | `() => void `   | `undefined` | A function to execute when the button is clicked                |
| `disabled?`     | `boolean`       | `undefined` | Whether the button should be disabled                           |
| `disableClose?` | `boolean`       | `undefined` | Whether the modal should be kept open after clicking the button |

---

## Technologies

This is project is built with 💙 on top of:

- [React.js](https://react.dev/): _The library for web and native user interfaces_

- [Rollup](https://rollupjs.org/): _The JavaScript module bundler_

- [Terser](https://terser.org/): _JavaScript mangler and compressor toolkit for ES6+_

- [Typescript](https://www.typescriptlang.org/): _A strongly typed programming language that builds on JavaScript_

## Contributors

Although I am committing the code of this project, life is always a team effort. Here you can find a list of people who contributed to this repo.

- [dennib](https://github.com/dennib)
- [PierluigiBarocci](https://github.com/PierluigiBarocci)
