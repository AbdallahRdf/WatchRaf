
function Input({label, type, id, register, errors}) {
  return (
    <div className="w-100 mt-2 mb-3">
        <label className="form-label text-body-tertiary" htmlFor="email">{ label }</label>
        <input
            className="form-control mb-1"
            type={ type }
            id={ id }
            placeholder={type === "email" ? "example@mail.com" : ""}
            {...register(id)}
        />
        <small className="text-danger">{errors[id]?.message}</small>
    </div>
  )
}

export default Input
