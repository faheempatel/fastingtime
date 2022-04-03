%%raw("import './styles/global.css'")

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
| Some(root) =>
  ReactDOM.render(<div> <Main /> </div>->React.cloneElement({"data-theme": "dark"}), root)
| None => ()
}
