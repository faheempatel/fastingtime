// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./button.module.css"

@react.component
let make = (~children, ~onClick) => {
  <button className={styles["container"]} onClick={onClick}> children </button>
}
