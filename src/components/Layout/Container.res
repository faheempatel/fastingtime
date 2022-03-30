// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./Container.module.css"

type variant = HOME_SCREEN | IFTAR_SCREEN | SCROLL

@react.component
let make = (~children, ~variant: option<variant>=?) => {
  open Cx

  let appContainerVariantClassName = switch variant {
  | Some(HOME_SCREEN) => styles["homeScreen"]
  | Some(IFTAR_SCREEN) => styles["iftarScreen"]
  | Some(SCROLL) => styles["showScrollbar"]
  | None => ""
  }

  let appContainerClasses = cx([styles["appContainer"], appContainerVariantClassName])

  <div className={styles["container"]}> <div className={appContainerClasses}> children </div> </div>
}
