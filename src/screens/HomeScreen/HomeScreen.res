type isAfter = (string, string) => bool

@val @scope(("window", "fathom"))
external trackGoal: (string, int) => unit = "trackGoal"

@val @scope("window")
external alert: string => unit = "alert"

@module("usehooks-ts") external useDarkMode: unit => Main.useDarkMode = "useDarkMode"
@module("date-fns") external dateFormat: (string, string) => string = "format"
@module("../../utils") external isAfter: isAfter = "isAfter"
@module("../../components/TimeRing/TimeRing") external timeRing: 'a = "default"

type featureFlags = LocationMenu | DarkMode | None

module HomeScreenNavBar = {
  @react.component
  let make = (~islamicDate, ~gregorianDate, ~openMenuFn) => {
    let {isDarkMode, enable, disable} = useDarkMode()

    let colorSchemeButton = switch isDarkMode {
    | false =>
      <IconButton.DarkModeButton
        onClick={_ => {
          enable()
          trackGoal("M6CZDVBM", 0)
        }}
      />
    | true =>
      <IconButton.LightModeButton
        onClick={_ => {
          disable()
          trackGoal("OREENAGG", 0)
        }}
      />
    }

    let navFeature = DarkMode
    switch navFeature {
    | LocationMenu =>
      <NavBar
        title={islamicDate}
        subtitle={gregorianDate}
        iconButton={<IconButton.LocationButton onClick={openMenuFn} />}
      />
    | DarkMode =>
      <NavBar title={islamicDate} subtitle={gregorianDate} iconButton={colorSchemeButton} />
    | None => <NavBar title={islamicDate} subtitle={gregorianDate} />
    }
  }
}

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

  <Container variant={Container.HomeScreen}>
    <HomeScreenNavBar islamicDate gregorianDate openMenuFn />
    <InfoRow
      leftComponent={<LocationPill
        text={locationText}
        onClick={_ => {
          alert("Sorry only available for London, UK this year")
          trackGoal("S18XZPPI", 0)
        }}
      />}
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
