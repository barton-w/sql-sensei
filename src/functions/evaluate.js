import clientSideValidation from "./clientSideValidation.js"

let globalDecision = ""

export default async function evaluate(training, query) {
  checkData(training, query)
  let promise = new Promise((res, rej) => {
    setTimeout(() => res(globalDecision), 100)
  })
  let response = await promise
  console.log("promise: ", promise)
  console.log("evaluate response: ", response)
  return response
}

const checkData = (training, query) => {
  const queryCheck = clientSideValidation(query)
  if (queryCheck.syntax) {
    fetch("http://localhost:3000/query", {
      body: JSON.stringify({query_statement: queryCheck.query}),
      method: "POST",
      headers: {
        "Accept":"application/json",
        "Content-Type":"application/json"
      }
    })
    .then(response => response.json())
    .then((json) => {
      let responseCheck = checkResponse(training, json)
      console.log("response from checkResponse: ", responseCheck)
      console.log("setting globalDecision to: ", responseCheck)
      globalDecision = responseCheck
    })
    .catch(error => console.log(error))
    } else {
      return false
    }
}

const checkResponse = (training, data) => {
  if (data.syntax) {
    let answerCheck = checkAnswer(training, data)
    console.log("response from checkAnswer: ", answerCheck)
    return answerCheck
  } else {
    return false
  }
}

const checkAnswer = (training, data) => {
  switch (training) {
    case "joinTraining1":
      if (data.results.length === 1 && data.results[0].spirit_animal === "ferret") {
        return true
      } else {
        return false
      }
    case "joinTraining2":
      if (data.results.length === 1 && data.results[0].friend_name === "Sandwich Waverly") {
        return true
      } else {
        return false
      }
    case "joinTraining3":
      if (data.results.length === 3 && data.results[0].band_name) {
        const bands = []
        for (let i = 0; i < data.results.length; i++) {
          bands.push(data.results[i].band_name)
        }
        if (bands.includes("Slipknot") && bands.includes("Carlos Santana") && bands.includes("Lady Gaga")) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    case "joinTraining4":
      if (data.results.length === 14 && data.results[0].band_name) {
        console.log("TRUTH CONDITION")
        const bands = []
        for (let i = 0; i < data.results.length; i++) {
          bands.push(data.results[i].band_name)
        }
        console.log(bands)
        if (bands.includes("Limp Bizkit") && bands.includes("Waylon Jennings") && bands.includes("Guns N' Roses") && bands.includes("Phil Collins") && bands.includes("Madonna") && bands.includes("Coldplay") && bands.includes("The Who") && bands.includes("White Stripes") && bands.includes("Velvet Revolver") && bands.includes("Destiny's Child") && bands.includes("Black Flag") && bands.includes("Bee Gees") && bands.includes("Spinal Tap") && bands.includes("Tool")) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    default:
      return false
  }
}
