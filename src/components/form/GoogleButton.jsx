import googleImg from '../../assets/img/google-logo.png';

function GoogleButton({title, handleClick}) {
  return (
    <button className="google-signup-btn mb-3" onClick={handleClick}>
        <img className="google-logo" src={googleImg} alt="google logo" />
        {title}
    </button>
  )
}

export default GoogleButton
