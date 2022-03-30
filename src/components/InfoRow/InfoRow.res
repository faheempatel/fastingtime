// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./InfoRow.module.css"

@react.component
let make = (~leftComponent, ~rightComponent) => {
  <div className={styles["container"]}>
    leftComponent <div className={styles["separator"]} /> rightComponent
  </div>
}
