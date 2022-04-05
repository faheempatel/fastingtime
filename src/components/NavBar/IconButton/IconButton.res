// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./IconButton.module.css"

@module("./moon.svg") external moonIcon: string = "default"
@module("./sun.svg") external sunIcon: string = "default"
@module("./mapPin.svg") external mapPinIcon: string = "default"
@module("./cross.svg") external crossIcon: string = "default"
@module("./back.svg") external backIcon: string = "default"

type variant = SmallIcon

module IconButton = {
  @react.component
  let make = (~icon, ~onClick, ~variant: option<variant>=?) => {
    open Cx

    let variantClass = switch variant {
    | Some(SmallIcon) => styles["smallIcon"]
    | None => ""
    }

    <button
      className={cx([styles["icon"], variantClass])}
      style={ReactDOM.Style.make(~backgroundImage=`url(${icon})`, ())}
      onClick
    />
  }
}

module DarkModeButton = {
  @react.component
  let make = (~onClick) => {
    <IconButton icon={moonIcon} onClick />
  }
}

module LightModeButton = {
  @react.component
  let make = (~onClick) => {
    <IconButton icon={sunIcon} onClick />
  }
}

module LocationButton = {
  @react.component
  let make = (~onClick) => {
    <IconButton icon={mapPinIcon} onClick />
  }
}

module CrossButton = {
  @react.component
  let make = (~onClick) => {
    <IconButton icon={crossIcon} onClick variant={SmallIcon} />
  }
}

module BackButton = {
  @react.component
  let make = (~onClick) => {
    <IconButton icon={backIcon} onClick />
  }
}
