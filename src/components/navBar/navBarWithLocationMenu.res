@module external mapPinIcon: string = "./map-pin.svg"

@react.component
let make = (~title, ~subtitle, ~variant: option<NavBar.variants>, ~onClick) => {
  <NavBar title subtitle icon={Some(mapPinIcon)} variant onClick={Some(onClick)} />
}
