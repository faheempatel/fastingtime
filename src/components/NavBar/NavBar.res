// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./NavBar.module.css"

module Icon = {
  @react.component
  let make = (~icon, ~onClick, ~className) => {
    <button className style={ReactDOM.Style.make(~backgroundImage=`url(${icon})`, ())} onClick />
  }
}

type variants = SMALL_ICON

@react.component
let make = (~title: string, ~subtitle: option<string>=?, ~iconButton: option<React.element>=?) => {
  open Cx

  let (hasIconButton, iconButtonComp) = switch iconButton {
  | Some(iconButton) => (true, iconButton)
  | None => (false, React.null)
  }

  let subtitle = switch subtitle {
  | None => React.null
  | Some(subtitle) => <p> {React.string(subtitle)} </p>
  }

  let titleClasses = cx([styles["titles"], hasIconButton ? styles["titlesWithIcon"] : ""])

  <nav className={styles["container"]}>
    iconButtonComp <div className={titleClasses}> <h4> {React.string(title)} </h4> subtitle </div>
  </nav>
}
