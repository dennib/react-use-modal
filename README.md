# react-use-modal

react-use-modal is a custom hook that provides a flexible and reusable way to manage modals in React applications.

## Highlights

- Great **flexibiliy** with single _jsx_ tag updated dynamically
- Small and minified **bundle size**
- Type safe with **TypeScript**

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [Properties and methods](#properties-and-methods)
  - [Hook configuration / Modal props](#hook-configuration--modal-props)
  - [Buttons](#buttons)
- [Contributors](#contributors)

---

## Installation

To install the package, you can use npm or yarn:

```bash
npm install react-use-modal
```

## Usage

1. Import the `useModal` hook

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
      <button onClick={handleOpenModal}>Open Modal</button>
      <Modal {...modalConfig} />
    </>
  );
};
```

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
| `showCloseIcon?` | `boolean`        | `undefined` | The content to display within the modal |
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

## Contributors

Although I am committing the code of this project, life is always a team effort. Here you can find a list of people who contributed to this repo.

- [dennib](https://github.com/dennib)
- [PierluigiBarocci](https://github.com/PierluigiBarocci)
