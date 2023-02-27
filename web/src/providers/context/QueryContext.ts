const QueryContext = React.createContext({
  query: "",
  setQuery: (val:string) => {},
  results: [],
  setResults: (results:any[]) => {},
  focused: [],
  setFocused: (focused:any[]) => {}
})

export default QueryContext;