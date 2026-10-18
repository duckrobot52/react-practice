const ComVeggie = ({ veggie }) => {
  const { imgUrl, title, content, price } = veggie
  return (
    <div className="col-md-4" style={{ marginBottom: '50px' }}>
      <img src={import.meta.env.BASE_URL + imgUrl} width="80%" alt={title} />
      <h5 style={{ marginTop: '10px' }}>{title}</h5>
      <span>{content}</span>
      <p>{price}</p>
    </div>
  )
}
export default ComVeggie
