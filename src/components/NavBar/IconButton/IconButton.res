// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./IconButton.module.css"

module IconButton = {
  @react.component
  let make = (~icon, ~onClick) => {
    <button className={styles["icon"]} onClick> icon </button>
  }
}

module DarkModeButton = {
  @react.component
  let make = (~onClick) => {
    <IconButton icon={<MoonSvg />} onClick />
  }
}

module LightModeButton = {
  @react.component
  let make = (~onClick) => {
    <IconButton icon={<SunSvg />} onClick />
  }
}

module LocationButton = {
  @react.component
  let make = (~onClick) => {
    <IconButton icon={<MapPinSvg />} onClick />
  }
}

module CrossButton = {
  @react.component
  let make = (~onClick) => {
    <IconButton icon={<CrossSvg />} onClick />
  }
}

module BackButton = {
  @react.component
  let make = (~onClick) => {
    <IconButton icon={<BackSvg />} onClick />
  }
}
