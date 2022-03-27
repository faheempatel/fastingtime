// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./Rules.module.css"
@module external backIcon: string = "./back.svg"
open Cx

module Note = {
  @react.component
  let make = () => {
    <div className={cx([styles["card"], styles["note"]])}>
      <p>
        {React.string("This is a quick reference, for the full guide please read: ")}
        <a href="http://www.iccuk.org/downloads/Introduction_to_Fasting.pdf">
          {React.string("The Brief Introduction to Ramadan Fasting")}
        </a>
        {React.string(".")}
      </p>
    </div>
  }
}

let renderRules = (ruleSet: array<RuleList.rule>) => {
  React.array(
    Belt.Array.mapWithIndex(ruleSet, (i, rule) => {
      let description = switch rule.description {
      | None => React.null
      | Some(text) => React.string(text)
      }
      <li key={Belt.Int.toString(i)} className={styles["rule"]}>
        <p className={styles["title"]}> {React.string(rule.title)} </p>
        <p className={styles["description"]}> description </p>
      </li>
    }),
  )
}

@react.component
let make = () => {
  <Container variant={Container.SCROLL}>
    <NavBar title={"Fasting Rules"} icon={backIcon} onClick={_ => RescriptReactRouter.push("/")} />
    <Note />
    <div className={cx([styles["card"], styles["green"]])}>
      <h2 className={styles["heading"]}> {React.string("Things that are ok")} </h2>
      <ul> {RuleList.allowed->renderRules} </ul>
    </div>
    <div className={cx([styles["card"], styles["red"]])}>
      <h2 className={styles["heading"]}> {React.string("Things that break our fast")} </h2>
      <ul> {RuleList.disallowed->renderRules} </ul>
    </div>
  </Container>
}
