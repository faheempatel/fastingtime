@module external mapPinIcon: string = "./map-pin.svg"

@react.component
let make = (~title, ~subtitle, ~onClick) => {
  <NavBar title subtitle icon={mapPinIcon} onClick />
}
