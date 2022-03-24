// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./eatStatus.module.css"
open Cx

type options = {
  text: string,
  colourClass: string,
}

@react.component
let make = (~fastHasStarted: bool) => {
  let variant = switch fastHasStarted {
  | true => {text: "CAN'T EAT", colourClass: styles["red"]}
  | false => {text: "CAN EAT", colourClass: styles["green"]}
  }

  let dotClasses = cx([styles["dot"], variant.colourClass])

  <div className={styles["container"]}>
    <div className={dotClasses} /> <h3> {React.string(variant.text)} </h3>
  </div>
}
