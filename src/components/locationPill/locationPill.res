// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./locationPill.module.css"
open Cx

module ButtonVariant = {
  @react.component
  let make = (~text, ~onClick) => {
    <button className={cx([styles["container"], styles["button"]])} onClick={onClick}>
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
  | Some(onClick) => <ButtonVariant text={text} onClick={onClick} />
  | None => <DivVariant text={text} />
  }
}
