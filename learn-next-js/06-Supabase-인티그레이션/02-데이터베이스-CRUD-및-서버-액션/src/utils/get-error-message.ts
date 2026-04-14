import { isErrorObject } from "./is-error-objects"

export  const getErrorMessage =(error: unknown)  => {
  return isErrorObject(error)? error.message : String(error)
}