// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./IftarScreen.module.css"

let make = () => {
  <Container variant={Container.IftarScreen}>
    <div className={styles["container"]}>
      <h1> {React.string("Time to break your fast")} </h1>
    </div>
  </Container>
}
