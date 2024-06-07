import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./SuccessModal.css";
import success from "../images/success.svg";

export default function SuccessModal(props) {
  return (
    <div className="succesmodal-conatiner">
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="succesmodal-body">
          <div className="flex-column-center">
            <img className="succesmodal-image" alt="succes" src={success} />
            <h1 className="succesmodal-heading m-0px">Thank You!</h1>
            <h1 className="succesmodal-heading">
              We have received your details
            </h1>
            <div className="succesmodal-sub-heading">
              You are all set, we will reach out to you!
            </div>
            <Button
              className="success-modal-close-button"
              onClick={props.onHide}
            >
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
