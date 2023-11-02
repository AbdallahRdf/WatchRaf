//* shows an alert in the top of the form if an error occurs while trying to connect
function FormAlert() {
  return (
    <div className="alert alert-danger d-flex align-items-center alert-dismissible fade show" role="alert">
        <div>
            An error occurred. Please try again later.
        </div>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}

export default FormAlert
