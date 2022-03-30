// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./LocationMenu.module.css"
@module("./cross.svg") external crossIcon: string = "default"
@module("./locations") external sortedLocationIds: array<string> = "sortedLocationIds"
@module("./locations") external getDisplayText: string => string = "getDisplayText"

module LocationList = {
  @react.component
  let make = (~selectedLocation, ~onLocationSelection) => {
    open Cx

    let locations = sortedLocationIds->Belt.Array.map(id => {
      let displayText = getDisplayText(id)
      id === selectedLocation
        ? <div key={id} className={cx([styles["heading"], styles["selected"]])}>
            {displayText->React.string}
          </div>->React.cloneElement({"data-id": id})
        : <div key={id} className={styles["heading"]}>
            {displayText->React.string}
          </div>->React.cloneElement({"data-id": id})
    })

    <ul onClick={onLocationSelection}> {locations->React.array} </ul>
  }
}

@react.component
let make = (~selectedLocation, ~onLocationSelection, ~onClose) => {
  <Container>
    <NavBar
      title={"Change location"} icon={crossIcon} onClick={onClose} variant={NavBar.SMALL_ICON}
    />
    <LocationList selectedLocation onLocationSelection />
  </Container>
}
