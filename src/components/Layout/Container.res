// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./Container.module.css"

type variant = HomeScreen | IftarScreen | ShowScrollBar

@react.component
let make = (~children, ~variant: option<variant>=?) => {
  open Cx

  let appContainerVariantClassName = switch variant {
  | Some(HomeScreen) => styles["homeScreen"]
  | Some(IftarScreen) => styles["iftarScreen"]
  | Some(ShowScrollBar) => styles["showScrollbar"]
  | None => ""
  }

  let appContainerClasses = cx([styles["appContainer"], appContainerVariantClassName])

  <div className={styles["container"]}> <div className={appContainerClasses}> children </div> </div>
}
