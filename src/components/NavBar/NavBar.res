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
let make = (
  ~title: string,
  ~subtitle: option<string>=?,
  ~icon: option<string>=?,
  ~variant: option<variants>=?,
  ~onClick: option<ReactEvent.Mouse.t => unit>=?,
) => {
  open Cx

  let (hasIcon, icon) = switch icon {
  | Some(icon) => (true, icon)
  | None => (false, "")
  }

  let (hasOnClick, onClick) = switch onClick {
  | Some(onClick) => (true, onClick)
  | None => (false, _t => {()})
  }

  let iconComponent: React.element = if hasIcon && hasOnClick {
    switch variant {
    | None => <Icon className={styles["icon"]} icon onClick />
    | Some(SMALL_ICON) =>
      <Icon className={cx([styles["icon"], styles["smallIcon"]])} icon onClick />
    }
  } else {
    React.null
  }

  let subtitle = switch subtitle {
  | None => React.null
  | Some(subtitle) => <p> {React.string(subtitle)} </p>
  }

  let titleClasses = cx([styles["titles"], hasIcon ? styles["titlesWithIcon"] : ""])

  <nav className={styles["container"]}>
    iconComponent <div className={titleClasses}> <h4> {React.string(title)} </h4> subtitle </div>
  </nav>
}