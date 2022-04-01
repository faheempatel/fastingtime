// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./TimeLabel.module.css"

@react.component
let make = (~text: string, ~time: string) => {
  <div>
    <p className={styles["label"]}> {React.string(text)} </p>
    <p className={styles["time"]}> {React.string(time)} </p>
  </div>
}
