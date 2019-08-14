export default function clientSideValidation(query) {
  //Lowercase
  //query = query.toLowerCase()
  //remove line-breaks
  query = query.replace(/\n/g, " ")
  //remove escapes
  query = query.replace(/\\/g, "")
  //check for ending with ;, if not, add one
  if (!/;$/.test(query)) {
    query = query + ";"
  }
  if (!/^select/i.test(query)) {
    return {syntax: false, error: "Make sure your query begins with SELECT"}
  }
  if (!/from/i.test(query)) {
    return {syntax: false, error: "Make sure you're selecting FROM somthing"}
  }
  if (!/friends/i.test(query) && !/spirit_animals/i.test(query) && !/friends_music/i.test(query) && !/bands/i.test(query)) {
    return {syntax: false, error: "Check your query. What table are you selecting from?"}
  }
  if (/top \d|top\d/.test(query)) {
    return {syntax: false, error: "Remember in PostgreSQL, use LIMIT rather than TOP."}
  }
  return {syntax: true, query: query}
}
