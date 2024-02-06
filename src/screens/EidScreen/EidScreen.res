// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./EidScreen.module.css"
@module("../../assets/party-popper.png") external partyPopperEmoji: 'png = "default"

let paragraphs = [
  "May Allah bless you with a great day!",
  "I hope this Ramadan has been beneficial as well as healing. I pray our good acts have been accepted and that we see them continue.",
  "I hope Fasting Time has been useful, it was a lot of fun to build, so thank you for using it. It means a lot.",
  "As always, please keep me in your duas, and see you next Ramadan inshaAllah!",
]->Belt.Array.mapWithIndex((i, str) => {
  <p key={Belt.Int.toString(i)}> {React.string(str)} </p>
})

@react.component
let make = () => {
  <Container>
    <div className={styles["container"]}>
      <img
        className={styles["emoji"]}
        src={partyPopperEmoji}
        alt="Party popper emoji"
        width={"64"}
        height={"64"}
      />
      <h1>
        {React.string("Eid")}
        <br />
        {React.string("Mubarak!")}
      </h1>
      <div>
        {React.array(paragraphs)}
        <p>
          {React.string("JazakAllah khair,")}
          <br />
          {React.string("Faheem")}
        </p>
      </div>
    </div>
  </Container>
}
