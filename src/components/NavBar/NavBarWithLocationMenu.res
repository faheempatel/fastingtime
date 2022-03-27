@module external mapPinIcon: string = "./mapPin.svg"

@react.component
let make = (~title, ~subtitle, ~onClick) => {
  <NavBar title subtitle icon={mapPinIcon} onClick />
}
