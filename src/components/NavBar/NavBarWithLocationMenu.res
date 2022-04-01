@module("./mapPin.svg") external mapPinIcon: string = "default"

@react.component
let make = (~title, ~subtitle, ~onClick) => {
  <NavBar title subtitle icon={mapPinIcon} onClick />
}
