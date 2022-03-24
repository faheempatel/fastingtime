// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./container.module.css"

type variant = HOME_SCREEN | IFTAR_SCREEN | SCROLL

@react.component
let make = (~children, ~variant: option<variant>=?) => {
  let appContainerVariantClassName = switch variant {
  | Some(HOME_SCREEN) => styles["homeScreen"]
  | Some(IFTAR_SCREEN) => styles["iftarScreen"]
  | Some(SCROLL) => styles["showScrollbar"]
  | None => ""
  }

  let appContainerClasses = Js.Array2.joinWith(
    [styles["appContainer"], appContainerVariantClassName],
    " ",
  )

  <div className={styles["container"]}> <div className={appContainerClasses}> children </div> </div>
}
