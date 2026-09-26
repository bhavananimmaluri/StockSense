function Modal({
  open,
  title,
  description,
  onClose,
  children,
}) {
  if (!open) {
    return null
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={onClose}
    >
      <div
        className="modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal-header">

          <div>
            <h2>{title}</h2>

            {description && (
              <p>{description}</p>
            )}
          </div>

          <button
            className="icon-button"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        {children}
      </div>
    </div>
  )
}

export default Modal