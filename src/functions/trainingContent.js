export default function trainingContent(training) {
  const content = {
    situationHeader: "",
    situationBody: [],
    ninjaMoves: ""
  }
  switch (training) {
    case "joinTraining1":
      content.situationHeader = "2 Tables:"
      content.situationBody = ["friends", "spirit_animals"]
      content.ninjaMoves = "Find Chris Dirt Stevens' spirit animal! The correct ninja move must return only 1 row."
      break;
    case "joinTraining2":
    content.situationHeader = "2 Tables:"
    content.situationBody = ["friends", "spirit_animals"]
    content.ninjaMoves = "Find which friend doesn't have a spirit animal! The correct ninja move must return only 1 row."
      break;
    case "joinTraining3":
    content.situationHeader = "4 Tables:"
    content.situationBody = ["friends", "spirit_animals", "friends_music", "bands"]
    content.ninjaMoves = "Your friend's spirit animal is a mallard. Find their favorite bands!"
      break;
    case "joinTraining4":
    content.situationHeader = "3 Tables:"
    content.situationBody = ["friends", "friends_music", "bands"]
    content.ninjaMoves = "Find the bands that none of your friends like!"
        break;
    default:
      return null
  }
  return content
}
