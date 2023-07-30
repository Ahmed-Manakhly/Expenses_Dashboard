import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function WarningModal({warning,onHide,onDelete}) {

  return (
    <>
      <Modal show={warning.show} onHide={onHide} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Attention!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{warning.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            {warning.type === 'missing'?'Ok':'Close'}
          </Button>
          {warning.type === 'delete'&& <Button variant="primary" onClick={onDelete}>Delete</Button>}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default WarningModal;