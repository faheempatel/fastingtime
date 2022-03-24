// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./eatStatus.module.css"

type options = {
  text: string,
  colourClass: string,
}

@react.component
let make = (~fastHasStarted: bool) => {
  let options = switch fastHasStarted {
  | true => {text: "CAN'T EAT", colourClass: styles["red"]}
  | false => {text: "CAN EAT", colourClass: styles["green"]}
  }

  let lightClasses = `${styles["light"]} ${options.colourClass}`

  <div className={styles["container"]}>
    <div className={lightClasses} /> <h3> {React.string(options.text)} </h3>
  </div>
}
