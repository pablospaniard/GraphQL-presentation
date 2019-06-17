export const fetch = `query OperationName ($variable: Episode) {
  queryName(argument: $variable) {
    field_1
    field_2 {
      field_1.1
      field_1.2
    }
  }
}`
