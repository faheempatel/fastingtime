// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./eidCard.module.css"

let partyPopperEmoji = "https://dsc.cloud/3ca15e/party-popper-emoji.png"

@react.component
let make = () => {
  <Container>
    <div className={styles["container"]}>
      <h1> {React.string("Eid Mubarak!")} </h1>
      <img className={styles["emoji"]} src={partyPopperEmoji} alt="Party popper emoji" />
      <div>
        <p> {React.string("May Allah bless you with a great day!")} </p>
        <p>
          {React.string("I hope this Ramadan has been beneficial as well as healing. I pray our
          good acts have been accepted and that we see them continue.")}
        </p>
        <p>
          {React.string("I hope FastingTime has been useful, it was a lot of fun to build, so
          thank you for using it. It means a lot.")}
        </p>
        <p>
          {React.string("As always, please keep me in your duas, and see you next Ramadan
          inshaAllah!")}
        </p>
        <p>
          {React.string("JazakAllah khair,")}
          <br />
          <a href="https://github.com/faheempatel"> {React.string("Faheem")} </a>
        </p>
      </div>
    </div>
  </Container>
}
