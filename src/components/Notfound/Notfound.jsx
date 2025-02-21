import imgErr from "./../../assets/images/error.svg"
export default function Notfound() {
  return (
    <div>
      <div className="w-1/2 mx-auto py-20">
        <img src={imgErr} alt="error" className="w-full" />
      </div>
    </div>
  )
}
