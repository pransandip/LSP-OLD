import React from "react";
import { Button, Modal } from "react-bootstrap";
import Moment from "react-moment";
export default function MyVerticallyCenteredModal(props) {
  var timeStart = new Date(
    props.modaldata.gross_datetime == null
      ? new Date()
      : props.modaldata.gross_datetime
  ).getTime();
  var timeEnd = new Date(props.modaldata.created_on).getTime();
  var hourDiff = timeEnd - timeStart;
  var minDiff = hourDiff / 60 / 1000;
  var hDiff = hourDiff / 3600 / 1000;
  var humanReadable = {};
  humanReadable.hours = Math.floor(Math.floor(hDiff));
  humanReadable.Hours = Math.floor(Math.floor(hDiff) % 24);
  humanReadable.day = Math.trunc(Math.floor(hDiff) / 24);
  humanReadable.minutes = minDiff - 60 * humanReadable.hours;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="closebutton">
        <Modal.Title id="contained-modal-title-vcenter">
          Bestell details liste
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="key_value">
          <tbody>
            <tr>
              <td>AVV-Nr</td>
              <td>{props.modaldata.avv_number}</td>
            </tr>
            <tr>
              <td>Auftrag</td>
              <td>{props.modaldata.order_number}</td>
            </tr>
            <tr>
              <td>EinfuhrAusfuhr</td>
              <td>{props.modaldata.import_export}</td>
            </tr>
            <tr>
              <td>Entsorgungsanlage</td>
              <td>{props.modaldata.disposal_facility}</td>
            </tr>
            <tr className="extra_field">
              <td>Kunde</td>
              <td>
                {props.modaldata.kunde_name} <p>{props.modaldata.kunde_ansp}</p>{" "}
                <p>{props.modaldata.kunde_number}</p>
              </td>
            </tr>
            <tr>
              <td>Prozesscode</td>
              <td>{props.modaldata.process_code}</td>
            </tr>
            <tr>
              <td>Sortenbezeichnung</td>
              <td>{props.modaldata.variety_denomination}</td>
            </tr>
            <tr>
              <td>Sortennummer</td>
              <td>{props.modaldata.variety_number}</td>
            </tr>
            <tr>
              <td>Yard Ticket</td>
              <td>{props.modaldata.yard_ticket}</td>
            </tr>
            <tr>
              <td>Taragewicht Datum/Uhrzeit</td>
              <td>
                {props.modaldata.tara_datetime === null ? (
                  "-"
                ) : (
                  <Moment format="YYYY/MM/DD hh:mm:ss">
                    {props.modaldata.tara_datetime}
                  </Moment>
                )}
              </td>
            </tr>
            <tr>
              <td>Taragewicht</td>
              <td>{props.modaldata.tara_to}</td>
            </tr>
            <tr>
              <td>Wiege-Nr.</td>
              <td>{props.modaldata.tara_cradel_number}</td>
            </tr>
            <tr>
              <td>Fahrer</td>
              <td>{props.modaldata.driver_name}</td>
            </tr>
            {
              <tr>
                <td>New Time</td>
                <td>{props.modaldata.driver_name}</td>
              </tr>
            }
            <tr>
              <td>Kfz-Kennzeichen</td>
              <td>{props.modaldata.license_plate}</td>
            </tr>
            <tr>
              <td>Fahrzeugart</td>
              <td>{props.modaldata.vehicle_type}</td>
            </tr>
            <tr>
              <td>Store-Nr.</td>
              <td>{props.modaldata.store_number}</td>
            </tr>
            <tr>
              <td>Dauer</td>
              <td>
                {Math.abs(humanReadable.day) === 0
                  ? ""
                  : Math.abs(humanReadable.day) + "Tage"}
                &nbsp;&nbsp;
                {Math.abs(humanReadable.Hours)}:
                {parseInt(humanReadable.minutes)}
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Beenden</Button>
      </Modal.Footer>
    </Modal>
  );
}
