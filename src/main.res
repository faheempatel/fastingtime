type useDarkMode = {
  isDarkMode: bool,
  toggle: unit => unit,
  enable: unit => unit,
  disable: unit => unit,
}

type matches = {matches: bool}

%%raw("import './styles/global.css'")
@module("usehooks-ts") external useDarkMode: unit => useDarkMode = "useDarkMode"

module App = {
  @react.component @module("./routes/App.jsx")
  external make: unit => React.element = "default"
}

module Main = {
  @react.component
  let make = () => {
    let {isDarkMode} = useDarkMode()

    let url = RescriptReactRouter.useUrl()

    let comp = switch url.path {
    | list{} => <App />
    | list{"rules"} => <Rules />
    | _ => <App />
    }

    <div> comp </div>->React.cloneElement({"data-theme": isDarkMode ? "dark" : "light"})
  }
}

switch ReactDOM.querySelector("#app") {
| Some(root) => ReactDOM.render(<Main />, root)
| None => ()
}
