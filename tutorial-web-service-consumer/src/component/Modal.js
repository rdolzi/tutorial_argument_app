export default function Modal({ confirm, title, description, confirmTitle, closeModal }) {
  return (
    <div class="modal" tabindex="-1" style={{display: "block"}}>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{title}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div class="modal-body">
            <p>{description}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              Annulla
            </button>
            <button
              type="button"
              class="btn btn-primary"
              onClick={()=>{confirm();
              closeModal()}}
            >
              {confirmTitle}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
