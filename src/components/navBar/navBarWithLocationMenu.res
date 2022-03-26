@module external mapPinIcon: string = "./map-pin.svg"

@react.component
let make = (~title, ~subtitle, ~variant, ~onClick) => {
  <NavBar title subtitle icon={mapPinIcon} variant onClick />
}
