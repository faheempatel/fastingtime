%%raw("import './styles/global.css'")

// Bindings for React 18, not currently found in react-rescript
@module("react-dom/client")
external createRoot: Dom.element => Dom.element = "createRoot"
@send external render: (Dom.element, React.element) => unit = "render"

module App = {
  @react.component @module("./routes/App.jsx")
  external make: unit => React.element = "default"
}

module Main = {
  @react.component
  let make = () => {
    let url = RescriptReactRouter.useUrl()

    switch url.path {
    | list{} => <App />
    | list{"rules"} => <Rules />
    | _ => <App />
    }
  }
}

switch ReactDOM.querySelector("#app") {
| Some(root) => createRoot(root)->render(<Main />)
| None => ()
}
