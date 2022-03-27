// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./Footer.module.css"

let make = () =>
  <div className={styles["container"]}>
    <p>
      {React.string("Made by ")}
      <a href="https://github.com/faheempatel"> {React.string("Faheem")} </a>
    </p>
    <p> {React.string(`Please keep me in your duas 🤲🏼 `)} </p>
  </div>
