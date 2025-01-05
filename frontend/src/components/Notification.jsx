const Notification = ({ message, isErrorMessage }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={isErrorMessage?'error':'notification'}>
      {message}
    </div>
  )
}

export default Notification