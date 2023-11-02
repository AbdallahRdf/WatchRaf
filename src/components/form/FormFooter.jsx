import { Link } from "react-router-dom";

function FormFooter({title, link, linkTitle}) {
  return (
    <div className="mt-4 w-100 text-center">
        <p className="m-0 text-dark-emphasis">{ title }</p>
        <Link to={ link } className="text-black-50 fw-semibold" >{ linkTitle }</Link>
    </div>
  )
}

export default FormFooter
