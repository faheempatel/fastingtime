// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./LocationPill.module.css"

module ButtonVariant = {
  @react.component
  let make = (~text, ~onClick) => {
    open Cx
    <button
      ariaLabel={"Set location"} className={cx([styles["container"], styles["button"]])} onClick>
      <p> {React.string(text)} </p>
    </button>
  }
}

module DivVariant = {
  @react.component
  let make = (~text) => {
    <div className={styles["container"]}> <p> {React.string(text)} </p> </div>
  }
}

@react.component
let make = (~text, ~onClick: option<ReactEvent.Mouse.t => unit>=?) => {
  switch onClick {
  | Some(onClick) => <ButtonVariant text onClick />
  | None => <DivVariant text />
  }
}
