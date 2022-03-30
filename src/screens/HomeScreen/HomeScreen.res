@module("date-fns") external dateFormat: (string, string) => string = "format"

// TODO: Better typing
@module("../../utils") external isAfter: ('a, 'b) => bool = "isAfter"
@module("../../components/TimeRing/TimeRing") external timeRing: 'a = "default"

type featureFlags = LOCATION_MENU(bool)

let renderNavBar = (islamicDate, gregorianDate, openMenuFn) => {
  let navFeature = LOCATION_MENU(false)
  switch navFeature {
  | LOCATION_MENU(false) => <NavBar title={islamicDate} subtitle={gregorianDate} />
  | LOCATION_MENU(true) =>
    <NavBarWithLocationMenu title={islamicDate} subtitle={gregorianDate} onClick={openMenuFn} />
  }
}

type currentLocation = {id: string, name: string, code: string, ramadanOffset: int}

@react.component
let make = (
  ~islamicDate,
  ~gregorianDate,
  ~locationText,
  ~currentDateAndTime,
  ~startTime,
  ~endTime,
  ~openMenuFn,
) => {
  let fastHasStarted = isAfter(currentDateAndTime, startTime)
  <Container variant={Container.HOME_SCREEN}>
    {renderNavBar(islamicDate, gregorianDate, openMenuFn)}
    <InfoRow
      leftComponent={<LocationPill text={locationText} />}
      rightComponent={<EatStatus fastHasStarted />}
    />
    {React.createElement(
      timeRing,
      {
        "fastHasStarted": fastHasStarted,
        "currentDateAndTime": currentDateAndTime,
        "startTime": startTime,
        "endTime": endTime,
      },
    )}
    <InfoRow
      leftComponent={<TimeLabel
        text={fastHasStarted ? "Fast started" : "Fast starts"}
        time={startTime->dateFormat("hh:mma")}
      />}
      rightComponent={<TimeLabel text={"Fast ends"} time={endTime->dateFormat("hh:mma")} />}
    />
    <Button ariaLabel={"Show fasting rules"} onClick={_ => RescriptReactRouter.push("/rules")}>
      <p> {React.string("Show rules for fasting")} </p>
    </Button>
    <Footer />
  </Container>
}
