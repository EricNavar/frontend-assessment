import React from 'react';
import { Modal } from 'antd';

interface IErrorModal {
  handleClose: () => void;
}

export const ErrorModal = (props: IErrorModal) => {
  const { handleClose } = props;

  return (
    <Modal open onCancel={handleClose}>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <button onClick={handleClose}>Close</button>
      </div>
      Pokémon does not exist.
    </Modal>
  );
};
