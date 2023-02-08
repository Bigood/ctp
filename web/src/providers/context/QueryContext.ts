const QueryContext = React.createContext({
  query: "",
  setQuery: (val:string) => {}
})

export default QueryContext;