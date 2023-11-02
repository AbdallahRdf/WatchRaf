import { Link } from "react-router-dom"

function FormHeader({title}) {
  return (
    <div>
        <Link to="/" className="logo" >Pomoraf</Link>
        <p className="grey-signup-text mt-2">{ title }</p>
    </div>
  )
}

export default FormHeader
